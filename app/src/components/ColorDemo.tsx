import { ThemeProvider } from "@emotion/react";
import { Add, Home, VolumeDown, VolumeUp } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  createTheme,
  Fab,
  Grid,
  IconButton,
  Paper,
  Slider,
  Stack,
  ThemeOptions,
  Toolbar,
  Typography,
} from "@mui/material";

interface ColorDemoProps {
  theme: ThemeOptions;
  title?: string;
  logo?: string;
}

export const ColorDemo = ({ theme, title, logo }: ColorDemoProps) => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <AppBar position="relative" elevation={0} sx={{ backgroundColor: (theme) => theme.palette.primary.dark }}>
        <Toolbar>
          {logo && <Box component="img" alt={title} src={logo} width={150} height={54} sx={{ mr: 2 }} />}
          <Typography variant="h5" overflow={"hidden"}>
            {title || "Projekt"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <Home />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item sm={6}>
          <Paper sx={{ backgroundColor: (theme) => theme.palette.secondary.light, p: 2 }}>
            <Stack spacing={2}>
              <Button> Button </Button>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined"> Outlined </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <Paper sx={{ backgroundColor: (theme) => theme.palette.secondary.dark, p: 2 }}>
            <Stack spacing={2}>
              <Button color="secondary"> Button </Button>
              <Button color="secondary" variant="contained">
                Contained
              </Button>
              <Button color="secondary" variant="outlined">
                Outlined
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown color="primary" />
        <Slider aria-label="Volume" defaultValue={30} color="secondary" />
        <VolumeUp color="primary" />
      </Stack>
      {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
      <Card
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
          color: (theme) => theme.palette.primary.contrastText,
        }}
      >
        <CardActionArea
          sx={{
            backgroundColor: (theme) => theme.palette.primary.dark,
            height: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
          }}
        >
          <Fab color="secondary" aria-label="add" sx={{ mt: 4 }}>
            <Add />
          </Fab>
        </CardActionArea>
        <CardContent sx={{ posiiton: "relative" }}>{title || "Projekt"}</CardContent>
      </Card>
    </ThemeProvider>
  );
};
