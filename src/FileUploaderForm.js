import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';
import FileProgressBox from './FileProgressBox';

const FileUploaderForm = ({ progress, uploadedFiles, uploadInProgress, handleFileChange, handleUpload, topLevelFolders, folderProgress }) => {

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                {/* Standard Form */}
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
            </div>
            {/* Upload Finished */}
            <FileProgressBox
                topLevelFolders={topLevelFolders}
                uploadedFiles={uploadedFiles}
                folderProgress={folderProgress}
            />
        </div>
    );
};

export default FileUploaderForm;
