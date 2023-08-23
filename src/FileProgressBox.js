import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';
import './FileProgressBox.css';

const FileProgressBox = ({ topLevelFolders, uploadedFiles, folderProgress }) => {
    return (
        <div>
            {(topLevelFolders.length > 0) && (
                <div className={`js-upload-finished ${topLevelFolders.length > 0 ? 'uploaded-visible-files' : ''}`}>
                    <h3>Selected files and folders</h3>
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
            )}
        </div>
    )
};

export default FileProgressBox;
