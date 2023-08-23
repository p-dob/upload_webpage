import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

const FileUploaderForm = ({ progress, uploadedFiles, uploadInProgress, handleFileChange, handleUpload, topLevelFolders, folderProgress }) => {

    return (
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
                    <h3>Processed files and folders</h3>
                    <div className="list-group">
                        {topLevelFolders.map((folderName, index) => (
                            <div key={index} className={`list-group-item ${uploadedFiles.includes(folderName) ? 'list-group-item-success' : ''}`}>
                                {folderProgress[folderName]?.uploadPercent === 100 && ( // Check if progress is complete
                                    <span className="badge alert-success pull-right circle-badge">
                                        <FontAwesomeIcon icon={faCircle} className="circle-background" />
                                        <FontAwesomeIcon icon={faCheck} className="tick-icon" />
                                    </span>
                                )}
                                <span className="folder-name">
                                    {folderName}
                                </span>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={folderProgress[folderName]?.uploadPercent || 0}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: `${folderProgress[folderName]?.uploadPercent || 0}%` }}
                                    >
                                        {folderProgress[folderName]?.uploadPercent?.toFixed(2) || 0}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploaderForm; 