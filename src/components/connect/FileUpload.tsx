import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useFile } from './FileContext.tsx';

const FileUpload = () => {
    const {setFileId } = useFile();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    // const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setFile(e.target.files[0]);
    //     }
    // };

    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'text/csv') {
                const formData = new FormData();
                formData.append('file', selectedFile);

                try {
                    const response = await axios.post('http://localhost:5000/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    if (response.data.fileId) {
                        setFileId(response.data.fileId); // Set fileId in the context and localStorage
                        setMessage('File uploaded successfully.');
                    } else {
                        setMessage('Failed to upload file: No fileId returned.');
                    }
                    
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        setMessage('Error uploading file: ' + (error.response?.data?.error || error.message));
                    } else {
                        setMessage('An unexpected error occurred: ' + (error as Error).message);
                    }
                }
            } else {
                setMessage('Please upload a CSV file.');
            }
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
            setFileId(response.data.fileId);
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
            {/* <h2>Upload Dataset</h2> */}
            <input className='' type="file" onChange={onFileChange} />
            {/* <button onClick={onFileUpload}>Upload</button> */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
