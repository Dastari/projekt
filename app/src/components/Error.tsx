import { ApolloError } from "@apollo/client";
import { Alert, AlertTitle, Box, CssBaseline, Fade, Stack } from "@mui/material";

interface ErrorProps {
  error: ApolloError;
}

export const Error = ({ error }: ErrorProps) => {
  return (
    <Fade in>
      <Box sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CssBaseline />
        <Stack padding={2}>
          {error.graphQLErrors.map((error, index) => (
            <Alert severity={error.message ? "error" : "info"} key={index} variant="filled">
              <AlertTitle>{error.message ? "API Error" : "Connection Error"} </AlertTitle>
              {error.message ||
                " The Database is offline or the site is currently down for maintenance. Please try again later."}
            </Alert>
          ))}
          {error.networkError && (
            <Alert severity={"error"}>
              <AlertTitle>Network Error</AlertTitle>
              {error.message}
            </Alert>
          )}
        </Stack>
      </Box>
    </Fade>
  );
};
