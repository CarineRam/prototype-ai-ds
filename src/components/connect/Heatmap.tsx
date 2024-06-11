import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Heatmap = () => {
    const [imageHmSrc, setImageHmSrc] = useState('');

    // useEffect(() => {
        axios.post('http://localhost:5000/generate_heatmap', {}, {
            responseType: 'blob'
        })
            .then(response => {
                const urlHm = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
                setImageHmSrc(urlHm);
            })
            .catch(error => {
                console.error('Error generating heatmap:', error.response ? error.response.data : error.message);
            });
    // }, []);

    return (
        <div>
            <div>
                {imageHmSrc && <img src={imageHmSrc} alt="Heatmap" />}
            </div>
        </div>
    );
};

export default Heatmap;
