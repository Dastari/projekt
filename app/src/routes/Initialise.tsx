import { Alert, AlertTitle, Button, Container, CssBaseline, Fade, TextField, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";

const InitialiseSchema = Yup.object().shape({
  projektName: Yup.string().min(2, "is too short").max(50, "is too long").required("is required"),
  projektLogo: Yup.string().url("must be a valid url"),
  name: Yup.string().min(2, "is too short").max(50, "is too long").required("is required"),
  email: Yup.string().email("is invalid").required("is required"),
});

const Initialise = () => {
  const offline = false;

  const formik = useFormik({
    initialValues: {
      projektName: "",
      projektLogo: "",
      name: "",
      email: "",
    },
    validationSchema: InitialiseSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Fade in>
      <Container maxWidth="md" sx={{ pt: 2 }}>
        <CssBaseline/>
        {offline && (
          <Alert variant="filled" severity="error">
            <AlertTitle>Connection Error</AlertTitle>
            The connection to the server is offline.
          </Alert>
        )}
        <Toolbar disableGutters>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Initialise Projekt
          </Typography>
        </Toolbar>
        <Typography variant="body1" gutterBottom>
          Are you ready to begin one of your amazing projeckts? Just fill out the form below and we'll get right on
          creating everthing for you.
        </Typography>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Stack spacing={2} sx={{ p: 1, mt: 2 }}>
            <TextField
              required
              id="projektName"
              label={`Projekt Name ${formik.errors.projektName ? formik.errors.projektName : ""}`}
              placeholder="Projekt"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={offline}
              error={formik.touched.projektName && formik.errors.projektName ? true : false}
            />
            <Typography sx={{ fontWeight: "bold" }}>Site Administrator</Typography>
            <TextField
              required
              id="name"
              label={`Name ${formik.errors.name ? formik.errors.name : ""}`}
              placeholder="Toby Martin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={offline}
              error={formik.touched.name && formik.errors.name ? true : false}
            />
            <TextField
              required
              id="email"
              label={`Email Address ${formik.errors.email ? formik.errors.email : ""}`}
              placeholder="toby.martin@me.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={offline}
              error={formik.touched.email && formik.errors.email ? true : false}
            />
            <Alert variant="filled" severity="info">
              A password will be randomly generated for the Site Administrator account when you click Initialise.
            </Alert>
            <Typography sx={{ fontWeight: "bold" }}>Projekt Settings</Typography>
            <TextField
              required
              id="projektLogo"
              label={`Projekt Logo ${formik.errors.projektLogo ? formik.errors.projektLogo : ""}`}
              placeholder="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={offline}
              error={formik.touched.projektLogo && formik.errors.projektLogo ? true : false}
            />
            <Button type="submit" variant="contained" disabled={offline}>
              Initialise
            </Button>
          </Stack>
        </form>
      </Container>
    </Fade>
  );
};

export default Initialise;
