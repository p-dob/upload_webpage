import React from 'react';
import { FileDrop } from 'react-file-drop';
import axios from 'axios';

const FolderUpload = () => {
  const handleFileDrop = (files) => {
    const formData = new FormData();
    formData.append('file', files[0]);

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

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Folder Upload</h2>
      <FileDrop onDrop={handleFileDrop}>
        <div style={{ border: '2px dashed #cccccc', padding: '20px', cursor: 'pointer' }}>
          <p>Drag 'n' drop a file here, or click to select a file</p>
        </div>
      </FileDrop>
    </div>
  );
};

export default FolderUpload;
