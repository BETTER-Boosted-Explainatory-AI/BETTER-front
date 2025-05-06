import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const FileUpload = ({inputName, fileType, allowMultiple = false }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={fileType}
        multiple={allowMultiple}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        name={inputName}
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
        {files.length > 0 ? files.map(f => f.name).join(', ') : 'Upload'}
      </Button>
    </div>
  );
};
export default FileUpload;
