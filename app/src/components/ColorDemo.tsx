// import { ThemeProvider } from "@emotion/react";
import { Add, Home, Share, VolumeDown, VolumeUp } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Fab,
  Grid,
  IconButton,
  Paper,
  Slider,
  Stack,
  ThemeOptions,
  ThemeProvider,
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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <AppBar position="relative" elevation={0}>
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
        <Grid container spacing={2} sx={{ mt: 0, p: 1 }}>
          <Grid item sm={6}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Button> Button </Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined"> Outlined </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper
              elevation={6}
              sx={{
                p: 2,
              }}
            >
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
        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown color="primary" />
          <Slider aria-label="Volume" defaultValue={30} color="secondary" />
          <VolumeUp color="primary" />
        </Stack>
        <Stack direction="row" sx={{ p: 1 }}>
          <Card elevation={3} sx={{ width: 300 }}>
            <CardActionArea
              sx={{
                height: 28,
                display: "flex",
                justifyContent: "center",
                alignItems: "top",
              }}
            >
              <CardContent sx={{ posiiton: "relative" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {title || "Projekt"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: "right" }}>
              <IconButton size="small">
                <Share />
              </IconButton>
              <Button size="small" color="primary" variant="contained">
                Button
              </Button>
            </CardActions>
          </Card>
          <Box sx={{ flexGrow: "1" }} />
          <Fab color="secondary" aria-label="add">
            <Add />
          </Fab>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
