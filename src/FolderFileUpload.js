import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploaderForm from './FileUploaderForm';
import axios from 'axios'; // Import axios

const FolderFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [topLevelFolders, setTopLevelFolders] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDrop = (e) => {
    const items = e;

    let folderContents = [];
    let topLevelFolders = new Set(); // Using Set to store unique top-level folder names

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
          topLevelFolders.add(fullPathParts[0]);
        }
      }
    }
    setFiles(folderContents);
    setTopLevelFolders(Array.from(topLevelFolders)); // Update the state with top-level folder names
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
      const response = await axios.post('http://49.207.56.148:8082/upload', formData, {
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
      setProgress(0);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <FileUploaderForm
      files={files}
      progress={progress}
      uploadedFiles={uploadedFiles}
      handleFileChange={handleFileChange}
      handleDrop={handleDrop}
      handleUpload={handleUpload}
    />
  );
};

export default FolderFileUploader;
