import React from 'react';

const FolderUpload = () => {
  const handleFileUpload = (event) => {
    const files = event.target.files;
    // Process the selected files here (e.g., send them to the server)
    console.log(files);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Folder Upload</h2>
      <div style={{ border: '2px dashed #cccccc', padding: '20px', cursor: 'pointer' }}>
        <input type="file" webkitdirectory="" directory="" multiple onChange={handleFileUpload} />
        <p>Drag 'n' drop a folder here, or click to select a folder</p>
      </div>
    </div>
  );
};

export default FolderUpload;
