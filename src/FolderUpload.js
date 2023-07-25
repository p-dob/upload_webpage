import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const FolderUpload = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFileDrop = (acceptedFiles) => {
    // Process the uploaded files here (e.g., send them to the server)
    console.log(acceptedFiles);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Folder Upload</h2>
      <Dropzone onDrop={handleFileDrop} multiple={true} noClick noKeyboard>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', cursor: 'pointer' }}>
            <input {...getInputProps()} directory="" webkitdirectory="" mozdirectory="" />
            {selectedFolder ? (
              <p>Selected Folder: {selectedFolder}</p>
            ) : (
              <p>Drag 'n' drop a folder here, or click to select a folder</p>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default FolderUpload;
