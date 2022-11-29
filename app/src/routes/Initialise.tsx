import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Fade,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  ThemeOptions,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorDemo, ErrorBoundary } from "@/components";
import JSONParse from "@/utils/jsonParse";
import { useEffect, useState } from "react";

const InitialiseSchema = Yup.object().shape({
  projektName: Yup.string().min(2, "is too short").max(50, "is too long").required("is required"),
  projektLogo: Yup.string().url("must be a valid url"),
  projektDarkTheme: Yup.string().test("isJson", "is not valid JSON", (value) => {
    return value && JSONParse(value) ? true : false;
  }),
  projektLightTheme: Yup.string().test("isJson", "is not valid JSON", (value) => {
    return value && JSONParse(value) ? true : false;
  }),
  name: Yup.string().min(2, "is too short").max(50, "is too long").required("is required"),
  email: Yup.string().email("is invalid").required("is required"),
});

const Initialise = () => {
  const offline = false;
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeOptions>(createTheme({}));
  const [error, setError] = useState<string | null>();

  const formik = useFormik({
    initialValues: {
      projektName: "",
      projektLogo: "",
      projektLightTheme: `{
  "palette": {
    "mode":"light",
    "primary": { 
      "main": "#6d4c41"
    },
    "secondary": {
      "main": "#bcaaa4"
    }
  }
}`,
      projektDarkTheme: `{
  "palette": {
    "mode":"dark",
    "primary": { 
      "main": "#6d4c41"
    },
    "secondary": {
      "main": "#bcaaa4"
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

  useEffect(() => {
    try {
      const newTheme = createTheme(
        JSONParse(darkMode ? formik.values.projektDarkTheme : formik.values.projektLightTheme)
      );
      setTheme(newTheme);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }, [darkMode, formik.values.projektDarkTheme, formik.values.projektLightTheme, setTheme, setError]);

  const handleChange = () => {
    setDarkMode((darkMode) => !darkMode);
    formik.dirty = true;
  };

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
              id="projektLogo"
              helperText="Ideal logo size is 150px by 54px"
              label={`Projekt Logo ${formik.errors.projektLogo ? formik.errors.projektLogo : ""}`}
              placeholder="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={offline}
              error={formik.touched.projektLogo && formik.errors.projektLogo ? true : false}
            />
            <Grid container>
              <Grid item md={6} sm={12}>
                <Toolbar variant="dense" disableGutters>
                  <Box sx={{ flexGrow: 1 }} />
                  <FormControlLabel
                    control={<Switch checked={darkMode} onChange={handleChange} name="darkMode" />}
                    label={darkMode ? "Dark" : "Light"}
                  />
                </Toolbar>
                {!darkMode ? (
                  <TextField
                    fullWidth
                    rows={14}
                    id="projektLightTheme"
                    label={`Light Theme`}
                    value={formik.values.projektLightTheme || ""}
                    multiline
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={offline}
                    spellCheck={false}
                    inputProps={{
                      sx: { fontFamily: "Courier", fontWeight: 800 },
                    }}
                    error={formik.touched.projektLightTheme && formik.errors.projektLightTheme ? true : false}
                  />
                ) : (
                  <TextField
                    fullWidth
                    rows={14}
                    id="projektDarkTheme"
                    label={`Dark Theme`}
                    value={formik.values.projektDarkTheme || ""}
                    multiline
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={offline}
                    spellCheck={false}
                    inputProps={{
                      sx: { fontFamily: "Courier", fontWeight: 800 },
                    }}
                    error={formik.touched.projektDarkTheme && formik.errors.projektDarkTheme ? true : false}
                  />
                )}
              </Grid>
              <Grid item md={6} sm={12}>
                <Box sx={{ ml: 2, height: 398 }}>
                  <ErrorBoundary>
                    {error ? (
                      <Box
                        sx={{
                          height: "100%",
                          width: "100%",
                          color: "red",
                          fontFamily: "courier",
                        }}
                      >
                        {error}
                      </Box>
                    ) : (
                      <ColorDemo theme={theme} title={formik.values.projektName} logo={formik.values.projektLogo} />
                    )}
                  </ErrorBoundary>
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
