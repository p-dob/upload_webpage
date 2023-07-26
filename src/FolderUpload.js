import React from 'react';
import { FileDrop } from 'react-file-drop';
import axios from 'axios';

const FolderUpload = () => {
  const handleFileDrop = (files) => {
    const formData = new FormData();
    formData.append('file', files[0]);

    // Append the folder name as a separate field (optional).
    formData.append('folderName', files[0].webkitRelativePath);

    axios.post('http://localhost:5001/upload', formData)
      .then((response) => {
        console.log(response.data);
        // Handle success if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Append the folder name as a separate field (optional).
      formData.append('folderName', selectedFile.webkitRelativePath);

      axios.post('http://localhost:5001/upload', formData)
        .then((response) => {
          console.log(response.data);
          // Handle success if needed
        })
        .catch((error) => {
          console.error(error);
          // Handle error if needed
        });
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Folder Upload</h2>
      <FileDrop onDrop={handleFileDrop}>
        <div style={{ border: '2px dashed #cccccc', padding: '20px', cursor: 'pointer' }}>
          <p>Drag 'n' drop a file or folder here</p>
          <button onClick={() => document.getElementById('fileInput').click()} style={{ marginTop: '10px' }}>
            Select File or Folder
          </button>
          <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileSelect} webkitdirectory="true" />
        </div>
      </FileDrop>
    </div>
  );
};

export default FolderUpload;
