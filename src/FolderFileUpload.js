import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploaderForm from './FileUploaderForm';
import FileProgressBox from './FileProgressBox';
import axios from 'axios';
import vars from './vars.json'
import { useDropzone } from 'react-dropzone';

const FolderFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [topLevelFolders, setTopLevelFolders] = useState([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [fileProgress, setFileProgress] = useState({});
  const [folderProgress, setFolderProgress] = useState({});
  const [foldersToUpload, setFoldersToUpload] = useState({});

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
    setFileProgress({});
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
        let percent = (updatedFolderProgress[folderName].uploadedSize / foldersToUpload[folderName]) * 100;
        updatedFolderProgress[folderName].uploadPercent = Math.min(percent, 100);
      } else {
        updatedFolderProgress[filename] = progressArray[progressArray.length - 1];
        let percent = (updatedFolderProgress[filename].uploadedSize / foldersToUpload[filename]) * 100;
        updatedFolderProgress[filename].uploadPercent = Math.min(percent, 100);
      }
    });

    totalTotalSize = files.reduce((total, file) => total + file.size, 0);
    // Calculate the total uploaded size and total size based on each file's progress
    Object.entries(updatedFolderProgress).forEach(([filename, progressData]) => {
      totalUploadedSize += progressData.uploadedSize;
      // totalTotalSize += progressData.totalSize;
    });

    if (totalTotalSize === 0) {
      setProgress(0); // Avoid division by zero
    } else {
      let total_progress = (totalUploadedSize / totalTotalSize) * 100;
      total_progress = Math.min(total_progress, 100).toFixed(2);
      setProgress(total_progress);
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
    const folders = {}
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
          let folderName = fullPathParts[0];
          if (folders[folderName] === undefined) {
            folders[folderName] = 0;
          }
          folders[folderName] += parseInt(item.size, 10);
          toplevelFolders.add(fullPathParts[0]);
        }
      }
    }
    setFiles(folderContents);
    // Update the state with top-level folder names
    setTopLevelFolders(Array.from(toplevelFolders));
    setFoldersToUpload(folders);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    // If upload is already in progress, return early
    if (uploadInProgress) {
      return;
    }
    
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
      // setUploadedFiles([...files]);
      // Reset upload status after successful upload
      setUploadInProgress(false);
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadInProgress(false); // Reset upload status on error
    } finally {
      // Use setTimeout to delay resetting uploadInProgress flag
      setTimeout(() => {
        setUploadInProgress(false); // Reset upload status after a brief delay
      }, 3000); // Adjust the delay time as needed
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    noClick: true, // Prevent file dialog from opening on click
  });

  const handleCustomButtonClick = () => {
    // Trigger the hidden file input when the custom button is clicked
    document.getElementById('js-upload-files').click();
    console.log(progress)
  };

  return (
    <div
      className={`dropzone ${isDragActive ? 'active' : ''}`}
      id="dropzone"
      {...getRootProps()}
    >
      <h4 style={{ textAlign: "center" }}>
        Drag Your Files Anywhere On The Screen
      </h4>
      <h4 style={{ textAlign: "center" }}>
        Or Click On The Button Below
      </h4>
      <div className="panel panel-default">
        <FileUploaderForm
          files={files}
          progress={progress}
          uploadInProgress={uploadInProgress}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />
        <input {...getInputProps()} />
        <FileProgressBox
          topLevelFolders={topLevelFolders}
          folderProgress={folderProgress}
          progress={progress}
        />
      </div>
      <div className="form-group2">
        {/* Custom button that triggers file input */}
        <button
          type="button"
          className="btn blue btn-primary"
          id="js-custom-upload-button"
          onClick={handleCustomButtonClick}
        >
          Browse to select individual files
        </button>
      </div>
    </div>
  );
};

export default FolderFileUploader;