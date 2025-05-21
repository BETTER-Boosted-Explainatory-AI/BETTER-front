import React from "react";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const FileUpload = ({
  inputName,
  fileType,
  handleFileChange,
  files,
  allowMultiple = false,
}) => {

  return (
    <div>
      <input
        id={inputName} 
        type="file"
        accept={fileType}
        multiple={allowMultiple}
        style={{ display: "none" }}
        onChange={handleFileChange}
        name={inputName}
      />
      <label htmlFor={inputName}>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<UploadIcon />}
          component="span"
          sx={{
            backgroundColor: "white",
            color: "primary.main",
            padding: "10px 20px",
            textTransform: "none",
            border: "1px solid",
            borderColor: "rgba(25, 118, 210, 0.3)",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
        {
          Array.isArray(files)
            ? (files && files.length > 0 ? files.map(f => f.name).join(', ') : 'Upload')
            : files && files.name
              ? files.name
              : files && files.filenames
                ? files.filenames
                : 'Upload'
        }
        </Button>
      </label>
    </div>
  );
};
export default FileUpload;
