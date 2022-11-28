import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Fade,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorDemo } from "@/components";
import JSONParse from "@/utils/jsonParse";

const InitialiseSchema = Yup.object().shape({
  projektName: Yup.string().min(2, "is too short").max(50, "is too long").required("is required"),
  projektLogo: Yup.string().url("must be a valid url"),
  projektTheme: Yup.string().test("isJson", "is not valid JSON", (value) => {
    return value && JSONParse(value) ? true : false;
  }),
  name: Yup.string().min(2, "is too short").max(50, "is too long").required("is required"),
  email: Yup.string().email("is invalid").required("is required"),
});

const Initialise = () => {
  const offline = false;

  const formik = useFormik({
    initialValues: {
      projektName: "",
      projektLogo: "https://d1myhw8pp24x4f.cloudfront.net/software_logo/1513077366_Avalara-logo_mid.png",
      projektTheme: `{
  "palette": {
    "primary": {
      "light": "#9c786c",
      "main": "#6d4c41",
      "dark": "#40241a",
      "contrastText": "#fff"
    },
    "secondary": {
      "light": "#efdcd5",
      "main": "#bcaaa4",
      "dark": "#8c7b75",
      "contrastText": "#000"
    }
  }
}`,
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
        <CssBaseline />
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
              placeholder="Bob Dobalina"
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
            <Typography sx={{ fontWeight: "bold" }}> Customisation</Typography>
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
            <Grid container>
              <Grid item md={6} sm={12}>
                <TextField
                  fullWidth
                  rows={16}
                  id="projektTheme"
                  label={`Projekt Theme ${formik.errors.projektTheme ? formik.errors.projektTheme : ""}`}
                  defaultValue={formik.values.projektTheme}
                  multiline
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={offline}
                  spellCheck={false}
                  inputProps={{
                    sx: { fontFamily: "Courier", fontWeight: 800 },
                  }}
                  error={formik.touched.projektTheme && formik.errors.projektTheme ? true : false}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Box sx={{ ml: 2, height: 398 }}>
                  <ColorDemo
                    theme={createTheme(JSONParse(formik.values.projektTheme) || {})}
                    title={formik.values.projektName}
                    logo={formik.values.projektLogo}
                  />
                </Box>
              </Grid>
            </Grid>
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
