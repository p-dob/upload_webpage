import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

const FileUploaderForm = ({ files, progress, uploadedFiles, handleFileChange, handleDrop, handleUpload }) => {  
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
        <h4>Or drag and drop files below</h4>
        {files.length === 0
          ? 'Just drag and drop files here'
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
                                    className={`list-group-item ${uploadedFiles.includes(file) ? 'list-group-item-success' : ''
                                        }`}
                                >
                                    {uploadedFiles.includes(file) && (
                                        <span className="badge alert-success pull-right">Success</span>
                                    )}
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

export default FileUploaderForm;
