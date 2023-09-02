import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploaderForm from './FileUploaderForm/FileUploaderForm';
import FileProgressBox from './FileProgressBox/FileProgressBox';
import axios from 'axios';
import vars from '../vars.json';
import { useDropzone } from 'react-dropzone';
import './Modal.css';

const FolderFileUploader = () => {
  // State variables
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [topLevelFolders, setTopLevelFolders] = useState([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [fileProgress, setFileProgress] = useState({});
  const [folderProgress, setFolderProgress] = useState({});
  const [foldersToUpload, setFoldersToUpload] = useState({});

  // Handle file change event
  const handleFileChange = (e) => {
    const folders = {};
    const items = [...e.target.files];
    const toplevelFolders = [];

    items.forEach((item) => {
      if (item.name) {
        toplevelFolders.push(item.name);
        const folderName = item.name;
        folders[folderName] = (folders[folderName] || 0) + parseInt(item.size, 10);
      }
    });

    setFiles(items);
    setTopLevelFolders(toplevelFolders);
    setFoldersToUpload(folders);
  };

  // Reset progress when new files are selected
  useEffect(() => {
    setProgress(0);
    setFileProgress({});
  }, [files]);

  // Update folderProgress when fileProgress changes
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
            totalSize: 0,
          };
        }

        updatedFolderProgress[folderName][filename] = {
          uploadedSize: innerProgress.uploadedSize,
          totalSize: innerProgress.totalSize,
        };

        // Calculate total progress and total size for the folder
        updatedFolderProgress[folderName].uploadedSize += innerProgress.uploadedSize;
        updatedFolderProgress[folderName].totalSize += innerProgress.totalSize;

        const percent =
          (updatedFolderProgress[folderName].uploadedSize / foldersToUpload[folderName]) * 100;
        updatedFolderProgress[folderName].uploadPercent = Math.min(percent, 100);
      } else {
        updatedFolderProgress[filename] = progressArray[progressArray.length - 1];
        const percent = (updatedFolderProgress[filename].uploadedSize / foldersToUpload[filename]) * 100;
        updatedFolderProgress[filename].uploadPercent = Math.min(percent, 100);
      }
    });

    totalTotalSize = files.reduce((total, file) => total + file.size, 0);
    // Calculate the total uploaded size and total size based on each file's progress
    Object.entries(updatedFolderProgress).forEach(([filename, progressData]) => {
      totalUploadedSize += progressData.uploadedSize;
    });

    if (totalTotalSize === 0) {
      setProgress(0); // Avoid division by zero
    } else {
      const totalProgress = Math.min((totalUploadedSize / totalTotalSize) * 100, 100).toFixed(2);
      setProgress(totalProgress);
    }

    setFolderProgress(updatedFolderProgress);
  }, [fileProgress]);

  // Handle file drop event
  const handleDrop = (e) => {
    const items = e;
    const folderContents = [];
    const toplevelFolders = new Set();
    const folders = {};
    // this might seem unnecessary at first, as folder's names and progress
    // are captured in handleUpload but it is needed otherwise no name will
    // appear unless we click on upload button
    items.forEach((item) => {
      if (item.path) {
        folderContents.push(item);
        const fullPathParts = item.path.split('/');
        if (fullPathParts[0] === '') {
          // Remove the first element if it is empty (due to leading '/')
          fullPathParts.shift();
        }
        const folderName = fullPathParts[0];
        folders[folderName] = (folders[folderName] || 0) + parseInt(item.size, 10);
        toplevelFolders.add(fullPathParts[0]);
      }
    });

    setFiles(folderContents);
    // Update the state with top-level folder names
    setTopLevelFolders(Array.from(toplevelFolders));
    setFoldersToUpload(folders);
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();

    // If upload is already in progress, return early
    if (uploadInProgress) {
      return;
    }

    try {
      // Open a modal for user input
      const userInput = await getUserInputModal();

      // If the modal was closed or input wasn't provided, return early
      if (!userInput) {
        return;
      }

      setUploadInProgress(true);

      // Create an array to store promises for each upload
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        if (!file.path) {
          file.path = file.name;
        }
        formData.append('file', file);
        formData.append('folderName', file.path);
        formData.append('userName', userInput.name);
        formData.append('userNumber', userInput.number);

        return axios.post(vars['upload_endpoint'], formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            setFileProgress((prevProgress) => {
              const newProgress = { ...prevProgress };
              newProgress[file.path] = [
                ...(newProgress[file.path] || []),
                {
                  uploadedSize: progressEvent.loaded,
                  totalSize: progressEvent.total,
                },
              ];
              return newProgress;
            });
          },
        });
      });

      // Use Promise.all to execute all upload promises concurrently
      await Promise.all(uploadPromises);
      setUploadInProgress(false);
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadInProgress(false);
    } finally {
      setTimeout(() => {
        setUploadInProgress(false);
      }, 3000);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    noClick: true, // Prevent file dialog from opening on click
  });

  // Get user input via modal
  const getUserInputModal = () => {
    return new Promise((resolve) => {
      const modal = document.getElementById('user-input-modal');
      const nameInput = document.getElementById('name-input');
      const numberInput = document.getElementById('number-input');
      const submitButton = document.getElementById('submit-button');

      nameInput.value = '';
      numberInput.value = '';

      modal.classList.add('open');

      submitButton.addEventListener('click', () => {
        const name = nameInput.value;
        const number = numberInput.value;
        modal.classList.remove('open');
        resolve({ name, number });
      });
    });
  };

  // Custom button click handler
  const handleCustomButtonClick = () => {
    document.getElementById('js-upload-files').click();
  };

  return (
    <div className={`dropzone ${isDragActive ? 'active' : ''}`} id="dropzone" {...getRootProps()}>
      <h4 style={{ textAlign: 'center' }}>Drag Your Files Anywhere On The Screen</h4>
      <h4 style={{ textAlign: 'center' }}>Or Click On The Button Below</h4>

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

      {/* Custom button that triggers file input */}
      <div className="form-group2">
        <button
          type="button"
          className="btn blue btn-primary"
          id="js-custom-upload-button"
          onClick={handleCustomButtonClick}
        >
          Browse to select individual files
        </button>
      </div>

      <div id="user-input-modal" className="modal">
        <div className="modal-content">
          <h2>Enter User Information</h2>
          <input type="text" id="name-input" placeholder="Name" />
          <input type="number" id="number-input" placeholder="Number" />
          <button id="submit-button">Submit</button>
        </div>
      </div>

      <img
        src="drop.png"
        alt="Sliding Image"
        className={`sliding-image ${isDragActive ? 'active' : ''}`}
      />
    </div>
  );
};

export default FolderFileUploader;
