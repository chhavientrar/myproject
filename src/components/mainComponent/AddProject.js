import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  List,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  // cover_image: Yup.string().url("Invalid URL"),
  tools_n_tech: Yup.array().of(Yup.string()),
});

const initialValues = {
  title: "",
  description: "",
  url: "",
  cover_image: "",
  tools_n_tech: [],
};

const AddProject = ({ open, handleClose }) => {
  const handleSubmit = async (values) => {
    const payload = {
      project: values,
    };
    try {
      const response = await axios.post("/users/projects", payload, {
        headers: {
          "auth-token": window.localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to update skills");
      }
      handleClose(); // Close the dialog on successful submission
    } catch (error) {
      console.error("Error updating skills:", error);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative", background: "#240079" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add Projects
          </Typography>
          <Button
            autoFocus
            color="inherit"
            type="submit"
            form="add-project-form" // Bind the button to the form
          >
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <Formik
          initialValues={initialValues}
          // validationSchema={ProjectSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values, handleChange }) => (
            <Form id="add-project-form">
              {" "}
              {/* Add form id */}
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
                mt={2}
              >
                <Grid container md={10} xs={10} p={1}>
                  <Grid
                    item
                    md={3}
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "16px", p: 2, fontWeight: 500 }}
                    >
                      Title :
                    </Typography>
                  </Grid>
                  <Grid container md={9} xs={9} spacing={1}>
                    <Grid item md={10.4} xs={10.4}>
                      <TextField
                        fullWidth
                        type="text"
                        id="title"
                        label="Title *"
                        name="title"
                        value={values?.title}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container md={10} xs={10} p={1}>
                  <Grid
                    item
                    md={3}
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "16px", p: 2, fontWeight: 500 }}
                    >
                      Description :
                    </Typography>
                  </Grid>
                  <Grid container md={9} xs={9} spacing={1}>
                    <Grid item md={10.4} xs={10.4}>
                      <TextField
                        fullWidth
                        type="text"
                        id="description"
                        label="Description *"
                        name="description"
                        value={values?.description}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container md={10} xs={10} p={1}>
                  <Grid
                    item
                    md={3}
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "16px", p: 2, fontWeight: 500 }}
                    >
                      URL :
                    </Typography>
                  </Grid>
                  <Grid container md={9} xs={9} spacing={1}>
                    <Grid item md={10.4} xs={10.4}>
                      <TextField
                        fullWidth
                        type="text"
                        id="url"
                        label="Url *"
                        name="url"
                        value={values?.url}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container md={10} xs={10} p={1}>
                  <Grid
                    item
                    md={3}
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "16px", p: 2, fontWeight: 500 }}
                    >
                      Cover Image :
                    </Typography>
                  </Grid>
                  <Grid container md={9} xs={9} spacing={1}>
                    <Grid item md={10.4} xs={10.4}>
                      <TextField
                        fullWidth
                        type="text"
                        id="cover_image"
                        label="URL*"
                        name="cover_image"
                        value={values?.cover_image}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container md={10} xs={10} p={1}>
                  <Grid
                    item
                    md={3}
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "16px", p: 2, fontWeight: 500 }}
                    >
                      Tools and Tech :
                    </Typography>
                  </Grid>
                  <Grid container md={9} xs={9} spacing={1}>
                    <Grid item md={10.4} xs={10.4}>
                      <TextField
                        fullWidth
                        type="text"
                        id="tools_n_tech"
                        label="Tools And Tech *"
                        name="tools_n_tech"
                        value={values?.tools_n_tech}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </List>
    </Dialog>
  );
};

export default AddProject;
