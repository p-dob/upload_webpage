import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploaderForm from './FileUploaderForm';
import axios from 'axios';
import vars from './vars.json'

const FolderFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [topLevelFolders, setTopLevelFolders] = useState([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [fileProgress, setFileProgress] = useState({});
  const [folderProgress, setFolderProgress] = useState({});

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  useEffect(() => {
    setProgress(0); // Reset progress to 0 when new files are selected
  }, [files]);

  // useEffect to update folderProgress when fileProgress changes
  useEffect(() => {
    const updatedFolderProgress = {};

    Object.entries(fileProgress).forEach(([filename, progressArray]) => {
      if (filename.startsWith('/')) {
        const folderName = filename.split('/')[1]; // Extract the folder name
        const innerProgress = progressArray[progressArray.length - 1]; // Get the latest progress and total size

        if (!updatedFolderProgress[folderName]) {
          updatedFolderProgress[folderName] = {
            uploadedSize: 0,
            totalSize: 0
          };
        }

        updatedFolderProgress[folderName][filename] = {
          uploadedSize: innerProgress.uploadedSize,
          totalSize: innerProgress.totalSize
        };

        // Calculate total progress and total size for the folder
        updatedFolderProgress[folderName].uploadedSize += innerProgress.uploadedSize;
        updatedFolderProgress[folderName].totalSize += innerProgress.totalSize;
        updatedFolderProgress[folderName].uploadPercent = (updatedFolderProgress[folderName].uploadedSize / updatedFolderProgress[folderName].totalSize) * 100;
      } else {
        updatedFolderProgress[filename] = progressArray[progressArray.length - 1];
        updatedFolderProgress[filename].uploadPercent = (updatedFolderProgress[filename].uploadedSize / updatedFolderProgress[filename].totalSize) * 100;
      }
    });

    // Update the folderProgress state variable
    setFolderProgress(updatedFolderProgress);
  }, [fileProgress]);

  const handleDrop = (e) => {
    const items = e;
    let folderContents = [];
    let toplevelFolders = new Set(); // Using Set to store unique top-level folder names
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item) {
        if (item.path) {
          // folderContents.push(item.path);
          folderContents.push(item);
          const fullPathParts = item.path.split("/");
          if (fullPathParts[0] === "") {
            fullPathParts.shift(); // Remove the first element if it is empty (due to leading '/')
          }
          toplevelFolders.add(fullPathParts[0]);
        }
      }
    }
    setFiles(folderContents);
    setTopLevelFolders(Array.from(toplevelFolders)); // Update the state with top-level folder names
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      setUploadInProgress(true); // Set upload status to true

      const totalBytes = files.reduce((total, file) => total + file.size, 0); // Calculate total bytes to be uploaded

      // Create an array to store promises for each upload
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderName', file.path);

        return axios.post(vars['upload_endpoint'], formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            setFileProgress(prevProgress => {
              let newProgress = { ...prevProgress };
              newProgress[file.path] = [
                ...(newProgress[file.path] || []),
                {
                  uploadedSize: progressEvent.loaded,
                  totalSize: progressEvent.total
                }
              ];
              return newProgress;
            });
          }
        });
      });

      // Use Promise.all to execute all upload promises concurrently
      await Promise.all(uploadPromises);

      // Clear the uploaded files and progress
      setUploadedFiles([...files]);
      setUploadInProgress(false); // Reset upload status after successful upload
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadInProgress(false); // Reset upload status on error
    }
  };

  return (
    <FileUploaderForm
      files={files}
      progress={progress}
      uploadedFiles={uploadedFiles}
      uploadInProgress={uploadInProgress}
      handleFileChange={handleFileChange}
      handleDrop={handleDrop}
      handleUpload={handleUpload}
      topLevelFolders={topLevelFolders}
      folderProgress={folderProgress}
    />
  );
};

export default FolderFileUploader;