import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUploaderForm from './FileUploaderForm';

const FolderFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDrop = (e) => {
    // e.preventDefault();
    // const items = e.dataTransfer.items;
    const items = e;
  
    let folderContents = [];
  
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item) {
        folderContents.push(item.path)
      }
    }
    setFiles(folderContents);
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
  
  const handleUpload = (e) => {
    e.preventDefault();
    // Simulate file upload progress
    setProgress(0);
    const totalFiles = files.length;
    let uploadedFiles = 0;
  
    const interval = setInterval(() => {
      uploadedFiles++;
      const currentProgress = Math.floor((uploadedFiles / totalFiles) * 100); // Convert to integer
      setProgress(currentProgress);
  
      if (currentProgress === 100) {
        clearInterval(interval);
        setUploadedFiles([...files]); // Mark all files as uploaded

        // Print every file and folder name on the console
        files.forEach((file) => {
          console.log(file)
          if (file.type === "file") {
            console.log(file.file.name);
          } else if (file.type === "folder") {
            console.log(file.name + "/");
            printFilesInFolder(file.children, file.name + "/");
          }
        });
      }
    }, 200);
  };  

  const printFilesInFolder = (folder, path = '') => {
    folder.forEach((file) => {
      if (file.type === "file") {
        console.log(path + file.name);
      } else if (file.type === "folder") {
        console.log(path + file.name + "/");
        printFilesInFolder(file.children, path + file.name + "/");
      }
    });
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
