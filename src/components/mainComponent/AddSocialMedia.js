import React, { useState } from "react";
import { Button, Grid, Typography, Box, Card, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import DevIcon from "@mui/icons-material/Code";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddProjectIcon from "@mui/icons-material/AddBox";
import {
  AddCircleOutline,
  GitHub,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import AddProject from "./AddProject";

const ShowcaseButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "white",
  padding: "8px",
  border: "1px solid #240079",
  borderRadius: "8px",
  margin: "5px",
  width: "100%",
  textTransform: "none",
  color: "#240079",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
}));

const ShowcaseIcon = styled("span")(({ theme }) => ({
  marginRight: "10px",
  color: "#240079",
}));

const ShowcaseContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const AddSocialMedia = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card sx={{ borderRadius: 0 }}>
      <ShowcaseContainer>
        <Grid
          sx={{
            display: "flex",
            p: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: 400 }}>
            Showcase your work from
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <ShowcaseButton>
              <ShowcaseIcon sx={{ color: "#0A0A0A" }}>
                <DevIcon />
              </ShowcaseIcon>
              <Typography variant="body2">DEV</Typography>
              <Typography variant="body2" sx={{ color: "#0A0A0A" }}>
                +
              </Typography>
            </ShowcaseButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ShowcaseButton>
              <ShowcaseIcon sx={{ color: "#0077B5" }}>
                <LinkedIn />
              </ShowcaseIcon>
              <Typography variant="body2">LinkedIn</Typography>
              <Typography variant="body2" sx={{ color: "#0077B5" }}>
                +
              </Typography>
            </ShowcaseButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ShowcaseButton>
              <ShowcaseIcon sx={{ color: "#1DA1F2" }}>
                <Twitter />
              </ShowcaseIcon>
              <Typography variant="body2">Twitter</Typography>
              <Typography variant="body2" sx={{ color: "#1DA1F2" }}>
                +
              </Typography>
            </ShowcaseButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ShowcaseButton>
              <ShowcaseIcon sx={{ color: "#181717" }}>
                <GitHub />
              </ShowcaseIcon>
              <Typography variant="body2">GitHub</Typography>
              <Typography variant="body2" sx={{ color: "#181717" }}>
                +
              </Typography>
            </ShowcaseButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ShowcaseButton>
              <ShowcaseIcon sx={{ color: "#FF0000" }}>
                <YouTubeIcon />
              </ShowcaseIcon>
              <Typography variant="body2">YouTube</Typography>
              <Typography variant="body2" sx={{ color: "#FF0000" }}>
                +
              </Typography>
            </ShowcaseButton>
          </Grid>
        </Grid>
      </ShowcaseContainer>
      <AddProject open={openDialog} handleClose={handleCloseDialog} />
    </Card>
  );
};

export default AddSocialMedia;
