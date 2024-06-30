import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
// import { IconEye } from "@tabler/icons";
import clsx from "clsx";
import { BsEyeFill } from "react-icons/bs";

const EventCover = ({
  hoverLabel = "Click or drag to upload file.",
  dropLabel = "Drop file here.",
  width = "820px",
  height = "100px",
  backgroundColor = "#fff",
  onChange,
  setValue,
  setImageArray,
  imageArray = [],
}) => {
  const [labelText, setLabelText] = useState(hoverLabel);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadingFileIndex, setUploadingFileIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const Uuid = localStorage.getItem("uuid");

  const handleDrop = (event) => {
    stopDefaults(event);
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const stopDefaults = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragEvents = {
    onDragEnter: (e) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      handleDrop(e);
    },
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file) {
      const fileObj = {
        file,
        previewUrl: URL.createObjectURL(file),
        uploading: false,
        uploaded: false,
      };
      setImageArray([fileObj]);
      setValue("coverIcon", fileObj?.file);
      setLabelText(`${file.name} selected`);
    }
  };

  const deleteImage = (index) => {
    const updatedArray = [...imageArray];
    updatedArray.splice(index, 1);
    setImageArray(updatedArray);
    setLabelText(hoverLabel);
  };

  const handleClickOpenDialog = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      border={`2px dashed ${isDragOver ? "blue" : "#aaa"}`}
      borderRadius="8px"
      padding="16px"
      textAlign="center"
      width={width}
      height={height}
      bgcolor={backgroundColor}
      {...dragEvents}
      className={clsx("file-upload", isDragOver && "file-upload--drag-over")}
    >
      {imageArray.length === 0 ? (
        <>
          <input
            onChange={handleChange}
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
          />
          <label htmlFor="file-upload">
            <CloudUploadIcon fontSize="large" />
            <Typography>{labelText}</Typography>
          </label>
        </>
      ) : (
        imageArray.map((fileObj, index) => (
          <div key={index} style={{ marginTop: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <div>{fileObj.file.name}</div>
              <div>
                <IconButton
                  onClick={() => handleClickOpenDialog(fileObj.previewUrl)}
                >
                  <BsEyeFill sx={{ color: "blue" }} />
                </IconButton>
                <IconButton onClick={() => deleteImage(index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        ))
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogActions>
          <IconButton onClick={() => handleCloseDialog()}>
            <ClearIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <img src={selectedImage} alt="Preview" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EventCover;
