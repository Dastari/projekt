import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Typography variant="h5">Projekt</Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};
