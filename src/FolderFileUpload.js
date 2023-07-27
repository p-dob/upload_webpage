import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FolderFileUploader = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles([...e.dataTransfer.files]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // Simulate file upload progress
    setProgress(0);
    const totalFiles = files.length;
    let uploadedFiles = 0;

    const interval = setInterval(() => {
      uploadedFiles++;
      const currentProgress = (uploadedFiles / totalFiles) * 100;
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-body">
          {/* Standar Form */}
          <h4>Select files from your computer</h4>
          <form
            onSubmit={handleUpload}
            encType="multipart/form-data"
            id="js-upload-form"
          >
            <div className="form-inline">
              <div className="form-group">
                <input
                  type="file"
                  name="files[]"
                  id="js-upload-files"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                id="js-upload-submit"
              >
                Upload files
              </button>
            </div>
          </form>

          {/* Drop Zone */}
          <h4>Or drag and drop files below</h4>
          <div
            className="upload-drop-zone"
            id="drop-zone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
          >
            {files.length === 0
              ? 'Just drag and drop files here'
              : `${files.length} file(s) selected`}
          </div>

          {/* Progress Bar */}
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${progress}%` }}
            >
              <span className="sr-only">{`${progress}% Complete`}</span>
            </div>
          </div>

          {/* Upload Finished */}
          <div className="js-upload-finished">
            <h3>Processed files</h3>
            <div className="list-group">
              {files.map((file, index) => (
                <a
                  key={index}
                  href="#"
                  className="list-group-item list-group-item-success"
                >
                  <span className="badge alert-success pull-right">
                    Success
                  </span>
                  {file.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FolderFileUploader;
