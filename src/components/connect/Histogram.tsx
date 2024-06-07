import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Histogram = () => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        axios.post('http://localhost:5000/generate_histogram', {}, {
            responseType: 'blob'
        })
            .then(response => {
                const url = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
                setImageSrc(url);
            })
            .catch(error => {
                console.error('Error generating histogram:', error.response ? error.response.data : error.message);
            });
    }, []);

    return (
        <div>
            <div>
                {imageSrc && <img src={imageSrc} alt="Histogram" />}
            </div>
        </div>
    );
};

export default Histogram;
