import React from 'react';
import './FileUploaderForm.css';

const FileUploaderForm = ({ files, progress, uploadInProgress, handleFileChange, handleUpload }) => {
    return (
        <div className={`panel-body ${files.length > 0 ? 'visible' : ''}`}>
            {/* Standard Form */}
            <h4>Total Upload Progress</h4>
            <h5 style={{ color: "white" }}>
                {files.length === 0 ? 'No files selected' : `${files.length} file(s) selected`}
            </h5>
            <form onSubmit={handleUpload} encType="multipart/form-data" id="js-upload-form">
                <div className="form-inline">
                    <div className="form-group">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            name="files[]"
                            id="js-upload-files"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // Hide the default input
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn dark-blue btn-primary rounded"
                        id="js-upload-submit"
                    >
                        Upload files
                    </button>
                </div>
            </form>

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
        </div>
    );
};

export default FileUploaderForm;
