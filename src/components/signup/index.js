import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { openSnackbar } from "../store/slice/snackbar";

const defaultTheme = createTheme();

const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  phoneNo: Yup.string().required("Phone Number is required"),
  studentId: Yup.string().required("Student Id is reqiured"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function SignUp() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNo: "",
      studentId: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(`/auth/register`, values)
        .then((value) => {
          setIsAuthenticated(true);
          navigate("/dashboard");

          dispatch(
            // openSnackbar({
            //   open: true,
            //   message: value.data.Msg,
            //   variant: "alert",
            //   alert: {
            //     color: "success",
            //   },
            //   close: false,
            // })
          );
        })
        .catch((error) => {
          //   if (error.response.status === 404) {
          //     setIsSubmitting(false);
          //     generateTimeStamp();
          //     dispatch(
          //       openSnackbar({
          //         open: true,
          //         message: error.response.data.Msg,
          //         variant: "alert",
          //         alert: {
          //           color: "error",
          //         },
          //         close: false,
          //       })
          //     );
          //   } else {
          //     setIsSubmitting(false);
          //     dispatch(
          //       openSnackbar({
          //         open: true,
          //         message: "Something went wrong",
          //         variant: "alert",
          //         alert: {
          //           color: "error",
          //         },
          //         close: false,
          //       })
          //     );
          //   }
        });
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            PropelX
          </Typography>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNo"
                  label="Phone No"
                  name="phoneNo"
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNo && Boolean(formik.errors.phoneNo)
                  }
                  helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="studentId"
                  required
                  fullWidth
                  id="studentId"
                  label="Student Id"
                  value={formik.values.studentId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.studentId && Boolean(formik.errors.studentId)
                  }
                  helperText={
                    formik.touched.studentId && formik.errors.studentId
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
