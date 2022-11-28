import { Box, CircularProgress, CssBaseline } from "@mui/material";

export const Loading = () => {
  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CssBaseline />
      <CircularProgress />
    </Box>
  );
};
