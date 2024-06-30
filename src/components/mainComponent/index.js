import * as React from "react";
import { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
  TextField,
  Chip,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Webcam from "react-webcam";
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined";
import CameraEnhanceOutlined from "@mui/icons-material/CameraEnhanceOutlined";
import axios from "axios";
import Skillset from "./Skill";
import AddSocialMedia from "./AddSocialMedia";
import ProjectCards from "./ProjectCards";
import AddIcon from "@mui/icons-material/Add";
import AddProject from "./AddProject";
import Home from "../Home";
import AnimatedLoader from "../loader/AnimatedLoader";

export default function MediaControlCard() {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [openProfileUpdate, setOpenProfileUpdate] = useState(false);
  const [picture, setPicture] = useState(null);
  const [isCapture, setIsCapture] = useState(false);
  const [isUploadFromDevice, setIsUploadFromDevice] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [projectdetails, setProjectDetails] = useState([]);

  const [loadingData, setLoadingdata] = useState(false);

  const webcamRef = useRef(null);
  const [imgsrc, setImgsrc] = useState("" ?? userdata?.profileImageUrl);

  const [openDialog, setOpenDialog] = useState(false);

  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const handleExpandClick = (projectId) => {
    setExpandedProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenUpdateProfile = () => {
    setOpenProfileUpdate(true);
  };

  const handleCloseUpdateProfile = () => {
    setOpenProfileUpdate(false);
    setIsCapture(false);
    setIsUploadFromDevice(false);
  };

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
    setIsCapture(false);
  };

  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleImageUpload = async () => {
    const formData = new FormData();

    if (typeof picture === "string") {
      const file = base64ToFile(picture, "profile.jpg");
      formData.append("profileImage", file);
    } else {
      formData.append("profileImage", picture);
    }

    try {
      const response = await axios.put("/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImgsrc(response?.data?.profileImageUrl);
      handleCloseUpdateProfile();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getUserDetails = async () => {
    setLoadingdata(true);
    try {
      const response = await axios.get("users/me", {
        headers: {
          "auth-token": `${window.localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
      });

      setUserdata(response?.data);
      setProjectDetails(response?.data?.projects);
      setLoadingdata(false);
    } catch (error) {
      setLoadingdata(false);
      console.error("Error uploading image:", error);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{ background: "#111111", height: loadingData ? "100vh" : "" }}
      >
        {loadingData ? (
          <AnimatedLoader />
        ) : (
          <Grid item md={6} lg={6} xs={12}>
            <Card
              sx={{
                background: "#ffffff",
                borderRadius: 0,
                padding: 0,
              }}
            >
              <CardContent sx={{ p: 1 }}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar
                      src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg"
                      alt={userdata?.name}
                    />
                  </Grid>
                  <Grid item sx={{ ml: 1 }}>
                    <Typography variant="h6">{userdata?.name}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Home
              hover={hover}
              setHover={setHover}
              handleOpenUpdateProfile={handleOpenUpdateProfile}
              userdata={userdata}
            />

            <AddSocialMedia />

            <Card
              sx={{
                background: "#ffffff",
                borderRadius: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 400,
                  }}
                >
                  My Projects
                </Typography>
                <Chip
                  onClick={handleOpenDialog}
                  icon={<AddIcon style={{ color: "#ffffff" }} />}
                  label="Add Project"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#6F6E71",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#333333",
                    },
                    padding: "0 8px",
                  }}
                />
              </Box>
              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent: "flex-start", // Align items to the start of the container
                  p: 2, // Padding around the grid container
                }}
              >
                {projectdetails?.length === 0 ? (
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center", p: 4 }}
                  >
                    <Typography variant="body1">
                      There is no data available.
                    </Typography>
                  </Grid>
                ) : (
                  projectdetails
                    ?.filter((data) => data !== null)
                    .map((data) => (
                      <Grid item xs={12} sm={6} md={6} key={data.id}>
                        <ProjectCards data={data} />
                      </Grid>
                    ))
                )}
              </Grid>
            </Card>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={openProfileUpdate}
        onClose={handleCloseUpdateProfile}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Grid container>
            <Grid item md={12} xs={12}>
              <Typography sx={{ padding: 2, fontSize: 16 }}>
                A picture helps people recognize you📷
              </Typography>
            </Grid>
          </Grid>

          {isCapture ? (
            <>
              <Webcam
                audio={false}
                height={200}
                ref={webcamRef}
                width={360}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
              <Grid
                container
                justifyContent="center"
                spacing={1}
                sx={{ mt: 1 }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={capture}
                  >
                    Capture
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setIsCapture(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="center"
              p={2}
              spacing={2}
            >
              {!isUploadFromDevice ? (
                <Grid item>
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: 16,
                    }}
                    onClick={() => setIsUploadFromDevice(true)}
                  >
                    <UploadFileOutlined sx={{ marginRight: 1 }} /> Upload From
                    Device
                  </Typography>
                </Grid>
              ) : (
                <Grid item>
                  <TextField
                    inputProps={{ accept: "images/jpeg/png" }}
                    onChange={(event) => setPicture(event.target.files[0])}
                    type="file"
                  />
                </Grid>
              )}

              <Grid item>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: 16,
                  }}
                  onClick={() => setIsCapture(true)}
                >
                  <CameraEnhanceOutlined sx={{ marginRight: 1 }} /> Capture
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateProfile}>Close</Button>
          <Button
            disabled={picture === null}
            onClick={handleImageUpload}
            autoFocus
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      <AddProject
        open={openDialog}
        handleClose={handleCloseDialog}
        // handleCloseDialog={handleCloseDialog}
      />
    </>
  );
}
