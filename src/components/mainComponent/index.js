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
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Webcam from "react-webcam";
import UploadFileOutlined from "@mui/icons-material/UploadFileOutlined";
import CameraEnhanceOutlined from "@mui/icons-material/CameraEnhanceOutlined";
import axios from "axios";
import Skillset from "./Skill";
import AddSocialMedia from "./AddSocialMedia";
import ProjectCards from "./ProjectCards";
import { AddCircleOutline } from "@mui/icons-material";
import AddProject from "./AddProject";

export default function MediaControlCard() {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const [openProfileUpdate, setOpenProfileUpdate] = useState(false);
  const [picture, setPicture] = useState(null);
  const [isCapture, setIsCapture] = useState(false);
  const [isUploadFromDevice, setIsUploadFromDevice] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [projectdetails, setProjectDetails] = useState([]);

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
    try {
      const response = await axios.get("users/me", {
        headers: {
          "auth-token": `${window.localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
      });

      setUserdata(response?.data);
      setProjectDetails(response?.data?.projects);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Grid container justifyContent="center" style={{ background: "#111111" }}>
        <Grid item md={8} lg={8} xs={12}>
          <Card
            sx={{
              border: "1px solid #e4e7ea",
              background: "#ffffff",
              borderRadius: 0,
              padding: 0,
            }}
          >
            <CardContent sx={{ p: 1, borderBottom: "1px solid #e4e7ea" }}>
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

          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderRadius: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                width: "100px",
                height: "100px",
                marginRight: 2,
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Avatar
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg"
                alt={userdata?.name}
                sx={{ width: "100%", height: "100%" }}
              />
              {hover && (
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                  size="large"
                  onClick={handleOpenUpdateProfile}
                >
                  <CloudUploadOutlinedIcon />
                </IconButton>
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {userdata?.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {userdata?.email}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  Retention, Product, Jar
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  Bengaluru, India
                </Typography>
              </CardContent>
            </Box>
          </Card>

          <Skillset userdata={userdata} />

          <AddSocialMedia />

          <Card
            sx={{
              border: "1px solid #e4e7ea",
              background: "#ffffff",
              borderRadius: 0,
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                p: 2,
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">My Projects</Typography>
              <IconButton onClick={handleOpenDialog}>
                <AddCircleOutline />
              </IconButton>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                p: 2,
                justifyContent:
                  projectdetails?.length === 0 ? "center" : "flex-start",
              }}
            >
              {projectdetails?.length === 0 ? (
                <Grid
                  item
                  md={12}
                  xs={12}
                  sx={{ display: "flex", p: 4, justifyContent: "center" }}
                >
                  <Typography>There is no any data !</Typography>
                </Grid>
              ) : (
                projectdetails
                  ?.filter((data) => data !== null)
                  .map((data) => <ProjectCards data={data} key={data.id} />)
              )}
            </Grid>
          </Card>
        </Grid>
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
