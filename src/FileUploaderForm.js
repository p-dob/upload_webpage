import React from 'react';
import './FileUploaderForm.css'

const FileUploaderForm = ({ files, progress, uploadedFiles, uploadInProgress, handleFileChange, handleUpload, topLevelFolders, folderProgress }) => {
    const handleCustomButtonClick = () => {
        // Trigger the hidden file input when the custom button is clicked
        document.getElementById('js-upload-files').click();
    };
    return (
        <div className="panel-body">
            {/* Standard Form */}
            <h4>Drag Your Files Anywhere On The Screen</h4>
            <h4>Or Choose From Below</h4>
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
                        {/* Custom button that triggers file input */}
                        <button
                            type="button"
                            className="btn blue btn-primary"
                            id="js-custom-upload-button"
                            onClick={handleCustomButtonClick}
                        >
                            Select files
                        </button>
                        <a style={{ color: "white", marginLeft: "5%" }}>{files.length === 0
                            ? 'No files selected'
                            : `${files.length} file(s) selected`}
                        </a>
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
