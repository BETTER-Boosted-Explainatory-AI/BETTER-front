import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // Create a ref to access the file input

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    // Trigger file input click to open file dialog
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef} 
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button
        variant="outlined" 
        color="primary" 
        endIcon={<UploadIcon />}  
        sx={{
          backgroundColor: 'white',  
          color: 'primary.main',
          padding: '10px 20px',  
          textTransform: 'none',  
          border: '1px solid', 
          borderColor: 'rgba(25, 118, 210, 0.3)', 
          boxSizing: 'border-box',  
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={handleUploadClick}
      >
        {file ? file.name : 'Upload '}
      </Button>
    </div>
  );
};

export default FileUpload;
