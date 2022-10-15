import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar elevation={0} position="relative">
      <Toolbar>
        <Typography variant="h5">Projekt</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* <IconButton color="inherit" LinkComponent={Link} href="/home">
          <Settings />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
