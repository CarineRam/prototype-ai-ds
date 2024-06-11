import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResidualPlot = () => {
    const [imageRPSrc, setImageRPSrc] = useState('');

    // useEffect(() => {
        axios.post('http://localhost:5000/generate_residual_plot', {}, {
            responseType: 'blob'
        })
            .then(response => {
                const urlRP = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
                setImageRPSrc(urlRP);
            })
            .catch(error => {
                console.error('Error generating residual plot:', error.response ? error.response.data : error.message);
            });
    // }, []);

    return (
        <div>
            <div>
                {imageRPSrc && <img src={imageRPSrc} alt="Residual Plot" />}
            </div>
        </div>
    );
};

export default ResidualPlot;
