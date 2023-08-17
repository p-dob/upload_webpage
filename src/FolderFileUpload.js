import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploaderForm from './FileUploaderForm';
import axios from 'axios';
import vars from './vars.json'
import { useDropzone } from 'react-dropzone';

const FolderFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [topLevelFolders, setTopLevelFolders] = useState([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [fileProgress, setFileProgress] = useState({});
  const [folderProgress, setFolderProgress] = useState({});

  const handleFileChange = (e) => {
    const items = [...e.target.files]
    let toplevelFolders = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item) {
        if (item.name) {
          toplevelFolders.push(item.name);
        }
      }
    }
    setFiles(items);
    setTopLevelFolders(toplevelFolders);
  };

  useEffect(() => {
    setProgress(0); // Reset progress to 0 when new files are selected
  }, [files]);

  // useEffect to update folderProgress when fileProgress changes
  useEffect(() => {
    const updatedFolderProgress = {};
    let totalUploadedSize = 0;
    let totalTotalSize = 0;

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

    // Calculate the total uploaded size and total size based on each file's progress
    Object.entries(updatedFolderProgress).forEach(([filename, progressData]) => {
      totalUploadedSize += progressData.uploadedSize;
      totalTotalSize += progressData.totalSize;
    });

    if (totalTotalSize === 0) {
      setProgress(0); // Avoid division by zero
    } else {
      const total_progress = (totalUploadedSize / totalTotalSize) * 100;
      setProgress(total_progress.toFixed(2));
    }

    setFolderProgress(updatedFolderProgress);
  }, [fileProgress]);

  const handleDrop = (e) => {
    const items = e;
    let folderContents = [];
    // Using Set to store unique top-level folder names
    let toplevelFolders = new Set();

    // this might seem unnecessary at first, as folder's names and progress
    // are captured in handleUpload but it is needed otherwise no name will
    // appear unless we click on upload button
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item) {
        if (item.path) {
          folderContents.push(item);
          const fullPathParts = item.path.split("/");
          if (fullPathParts[0] === "") {
            // Remove the first element if it is empty (due to leading '/')
            fullPathParts.shift();
          }
          toplevelFolders.add(fullPathParts[0]);
        }
      }
    }
    setFiles(folderContents);
    // Update the state with top-level folder names
    setTopLevelFolders(Array.from(toplevelFolders));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      setUploadInProgress(true); // Set upload status to true

      // Create an array to store promises for each upload
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        if (!file.path) {
          file.path = file.name
        }
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
      // Reset upload status after successful upload
      setUploadInProgress(false);
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadInProgress(false); // Reset upload status on error
    }
  };

  const MyDropZone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleDrop,
      noClick: true, // Prevent file dialog from opening on click
    });

    return (
      <div
        className={`upload-drop-zone ${isDragActive ? 'active' : ''}`}
        id="drop-zone"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <h4>{isDragActive ? 'Drop files here' : 'Drag and drop files here, or click to select'}</h4>
        {files.length === 0
          ? 'No files selected'
          : `${files.length} file(s) selected`}
      </div>
    );
  };

  return (
    <FileUploaderForm
      files={files}
      progress={progress}
      uploadedFiles={uploadedFiles}
      uploadInProgress={uploadInProgress}
      handleFileChange={handleFileChange}
      handleUpload={handleUpload}
      topLevelFolders={topLevelFolders}
      folderProgress={folderProgress}
      MyDropZone={MyDropZone}
    />
  );
};

export default FolderFileUploader;