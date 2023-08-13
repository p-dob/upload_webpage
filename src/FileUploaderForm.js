import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

const FileUploaderForm = ({ files, progress, uploadedFiles, uploadInProgress, handleFileChange, handleDrop, handleUpload, topLevelFolders }) => {  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    noClick: true, // To prevent the default file selection behavior when clicking inside the drop zone
    noKeyboard: true, // To prevent the default file selection behavior when pressing keyboard keys
  });
  
  const MyDropZone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleDrop,
      noClick: true, // Prevent file dialog from opening on click
    });
  
    return (
        <div
          className={`upload-drop-zone ${isDragActive ? 'active' : ''}`}
          id="drop-zone"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <h4>{isDragActive ? 'Drop files here' : 'Drag and drop files here, or click to select'}</h4>
          {files.length === 0
            ? 'No files selected'
            : `${files.length} file(s) selected`}
        </div>
      );
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
                    <MyDropZone />

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
                            {uploadInProgress ? `${progress}%` : `${progress}% Complete`}
                        </div>
                    </div>

                    {/* Upload Finished */}
                    <div className="js-upload-finished">
                        <h3>Processed files</h3>
                        <div className="list-group">
                            {topLevelFolders.map((file, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`list-group-item ${uploadedFiles.includes(file) ? 'list-group-item-success' : ''}`}
                                >
                                    {uploadedFiles.includes(file) && (
                                        <span className="badge alert-success pull-right circle-badge">
                                            <FontAwesomeIcon icon={faCircle} className="circle-background" />
                                            <FontAwesomeIcon icon={faCheck} className="tick-icon" />
                                        </span>
                                    )}
                                    {/* Display folder name */}
                                    <span className="file-name">
                                        {file}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploaderForm;