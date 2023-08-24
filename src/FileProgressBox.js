import React, { useState, useEffect } from 'react';
import './FileProgressBox.css';

const FileProgressBox = ({ topLevelFolders, folderProgress }) => {
    // function Test(topLevelFolders) {
    const [previewsVisible, setPreviewsVisible] = useState(false);

    const togglePreviews = () => {
        setPreviewsVisible(!previewsVisible);
    };

    useEffect(() => {
        if (topLevelFolders.length > 0) {
            setPreviewsVisible(true);
        }
        else { setPreviewsVisible(false) };
    }, [topLevelFolders]);

    return (
        <div className="row">
            <div className="col s12">
                <div className={`preview-container ${topLevelFolders.length > 0 ? 'visible' : ''}`}>
                    <div className="header" onClick={togglePreviews}>
                        <span>Uploaded Files</span>
                        <i
                            id="controller"
                            className={`material-icons ${previewsVisible ? 'up' : 'down'
                                }`}
                        >
                            keyboard_arrow_down
                        </i>
                    </div>
                    <div
                        className={`collection card ${previewsVisible ? 'slide-up' : 'slide-down'
                            }`}
                        id="previews"
                    >
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
        </div>
    );
}

export default FileProgressBox;
