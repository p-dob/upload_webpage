import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const FolderUpload = () => {
  const handleFileDrop = (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

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
      <Dropzone onDrop={handleFileDrop} multiple={false} noClick noKeyboard>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop a file here, or click to select a file</p>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default FolderUpload;
