import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react'

interface FileContextType {
    fileId : string | null;
    setFileId :  (id: string | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fileId, setFileIdState] = useState<string | null>(null);

    useEffect(() => {
        const savedFileId = localStorage.getItem('fileId');
        if (savedFileId) {
            setFileIdState(savedFileId);
        }
    }, []);

    const setFileId = (id: string | null) => {
        if (id === null) {
            localStorage.removeItem('fileId');
        } else {
            localStorage.setItem('fileId', id);
        }
        setFileIdState(id);
    };


    return (
        <FileContext.Provider value={{fileId, setFileId}}>
            {children}
        </FileContext.Provider>
    );
};

export const useFile = () => {
    const context = useContext(FileContext);
    if(!context) {
        throw new Error('useFile must be used within a FileProvider');
    }
    return context;
}