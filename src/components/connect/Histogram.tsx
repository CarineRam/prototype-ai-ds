import React, { useEffect, useState } from 'react';

const Histogram = () => {
    const [imageSrc, setImageSrc] = useState('');

    // useEffect(() => {
    //     fetch('http://localhost:5000/histogram')
    //         .then(response => response.blob())
    //         .then(blob => {
    //             const url = URL.createObjectURL(blob);
    //             setImageSrc(url);
    //         })
    //         .catch(error => console.error('Erreur:', error));
    // }, []);

    useEffect(() => {
        fetch('http://localhost:5000/generate_histogram')
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
            })
            .catch(error => console.error('Error generating histogram:', error));
    }, []);

    return (
        <div>
            <div>
                {imageSrc && <img src={imageSrc} alt="Histogramme" />}
            </div>
        </div>
    );
};

export default Histogram;
