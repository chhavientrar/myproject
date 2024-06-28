import { Grid, Box } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "../navbar/index.";
import MainComponent from "../mainComponent";

const Dashboard = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <Grid container sx={{ mt: 8 }}>
        <MainComponent />
      </Grid>
    </Box>
  );
};

export default Dashboard;
