// src/components/ImageViewer.tsx
import React, { useState } from 'react';
import '../App.css';

interface ImageViewerProps {
    totalImages: string[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ totalImages }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handleNextPage = () => {
        if (currentPage < totalImages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={{ position: 'relative', cursor: 'pointer' }}>
            <img
                src={totalImages[currentPage]}
                alt={`Page ${currentPage + 1}`}

                onClick={handleNextPage}
            />
            <div
                onClick={handlePrevPage}
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '50%',
                    height: '100%',
                    cursor: 'pointer',
                }}
            />
            <div
                onClick={handleNextPage}
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '50%',
                    height: '100%',
                    cursor: 'pointer',
                }}
            />
        </div>
    );
};

export default ImageViewer;
