import React, { useState, useEffect } from 'react';

const ImageDisplay = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:3000/memories/getMemory/d755e5b337a2fe210f52cb2eeba82733`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
            } catch (error) {
                setError(error);
            }
        };

        fetchImage();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt="Memory" />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ImageDisplay;
