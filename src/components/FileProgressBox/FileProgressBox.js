import React, { useState, useEffect } from 'react';
import './FileProgressBox.css';

const FileProgressBox = ({ topLevelFolders, folderProgress, progress }) => {
    const [previewsVisible, setPreviewsVisible] = useState(false);

    useEffect(() => {
        setPreviewsVisible(topLevelFolders.length > 0);
    }, [topLevelFolders]);

    const togglePreviews = () => {
        setPreviewsVisible(!previewsVisible);
    };

    return (
        <div className="file-progress-box">
            <div className={`preview-container ${topLevelFolders.length > 0 ? 'visible' : ''}`}>
                <div className="header" onClick={togglePreviews}>
                    <span>{progress >= 100 ? 'Uploaded Files' : (progress < 0.01 ? 'Selected Files' : 'Uploading Files')}</span>
                    <i className={`material-icons ${previewsVisible ? 'up' : 'down'}`}>keyboard_arrow_down</i>
                </div>
                <div className={`collection card ${previewsVisible ? 'slide-up' : 'slide-down'}`}>
                    {topLevelFolders.map((folderName, index) => (
                            <div
                            key={index}
                            className={`collection-item clearhack valign-wrapper item-template`}
                        >
                            <div className="left pv zdrop-info">
                                <div>
                                    <span className="folder-name">{folderName}</span>
                                </div>
                                <div className="progress-container">
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${folderProgress[folderName]?.uploadPercent || 0
                                                }%`,
                                            color: "white"
                                        }}
                                    >
                                        {folderProgress[folderName]?.uploadPercent?.toFixed(2) || 0}%
                                    </div>
                                </div>
                            </div>
                            <div className="secondary-content actions">
                                {folderProgress[folderName]?.uploadPercent === 100 && (
                                    <i className="material-icons green circle white-text">check</i>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileProgressBox;
