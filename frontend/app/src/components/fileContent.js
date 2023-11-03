import React, { useState, createContext } from 'react';

export const FileContentContext = createContext();

export const FileContentProvider = ({ children }) => {
    const [fileContent, setFileContent] = useState("");

    return (
        <FileContentContext.Provider value={{ fileContent, setFileContent }}>
            {children}
        </FileContentContext.Provider>
    );
};
