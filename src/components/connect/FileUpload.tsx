import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const onFileUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage('Error uploading file: ' + (error.response?.data?.error || error.message));
              } else {
                setMessage('An unexpected error occurred: ' + (error as Error).message);
              }
        }
    };

    return (
        <div>
            <h2>Upload Dataset</h2>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
