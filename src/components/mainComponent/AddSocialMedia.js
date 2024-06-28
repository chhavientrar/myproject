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
  padding: "10px",
  border: "1px solid #240079",
  borderRadius: "8px",
  margin: "5px",
  width: "100%",
  textTransform: "none",
  color: "#240079",
}));

const ShowcaseIcon = styled("span")(({ theme }) => ({
  marginRight: "10px",
  color: "#240079",
}));

const ShowcaseContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
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
          <Typography variant="h6">Showcase your work from</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ShowcaseButton>
              <ShowcaseIcon>
                <DevIcon />
              </ShowcaseIcon>
              <Typography variant="body2">DEV</Typography>
              <Typography variant="body2">+</Typography>
            </ShowcaseButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowcaseButton>
              <ShowcaseIcon>
                <LinkedIn />
              </ShowcaseIcon>
              <Typography variant="body2">Linkedin</Typography>
              <Typography variant="body2">+</Typography>
            </ShowcaseButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowcaseButton>
              <ShowcaseIcon>
                <Twitter />
              </ShowcaseIcon>
              <Typography variant="body2">Twitter</Typography>
              <Typography variant="body2">+</Typography>
            </ShowcaseButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowcaseButton>
              <ShowcaseIcon>
                <GitHub />
              </ShowcaseIcon>
              <Typography variant="body2">Github</Typography>
              <Typography variant="body2">+</Typography>
            </ShowcaseButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowcaseButton>
              <ShowcaseIcon>
                <YouTubeIcon />
              </ShowcaseIcon>
              <Typography variant="body2">YouTube</Typography>
              <Typography variant="body2">+</Typography>
            </ShowcaseButton>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <ShowcaseButton onClick={handleOpenDialog}>
              <ShowcaseIcon>
                <AddProjectIcon />
              </ShowcaseIcon>
              <Typography variant="body2">Add Project</Typography>
              <Typography variant="body2">+</Typography>
            </ShowcaseButton>
          </Grid> */}
        </Grid>
      </ShowcaseContainer>
      <AddProject
        open={openDialog}
        handleClose={handleCloseDialog}
        // handleCloseDialog={handleCloseDialog}
      />
    </Card>
  );
};

export default AddSocialMedia;
