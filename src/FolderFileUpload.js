import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploaderForm from './FileUploaderForm';
import axios from 'axios'; // Import axios
import vars from './vars.json'

const FolderFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [topLevelFolders, setTopLevelFolders] = useState([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  useEffect(() => {
    setProgress(0); // Reset progress to 0 when new files are selected
  }, [files]);
  
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
  
  const traverseFileTree = (item, folderContents) => {
    if (item.isFile) {
      item.file((file) => {
        folderContents.push({ type: "file", file });
      });
    } else if (item.isDirectory) {
      const reader = item.createReader();
      reader.readEntries((entries) => {
        entries.forEach((entry) => {
          traverseFileTree(entry, folderContents);
        });
      });
      folderContents.push({ type: "folder", name: item.name, children: [] });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
      formData.append('folderName', file.path);
    });

    try {
      setUploadInProgress(true); // Set upload status to true
      const response = await axios.post(vars['upload_endpoint'], formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const currentProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(currentProgress);
        }
      });
      console.log(response.data); // Log the response from the backend
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
    />
  );
};

export default FolderFileUploader;