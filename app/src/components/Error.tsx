import { ApolloError } from "@apollo/client";
import { Alert, AlertTitle, Box, CssBaseline, Fade, Stack } from "@mui/material";

interface ErrorProps {
  error: ApolloError;
}

const Error = ({ error }: ErrorProps) => {
  console.log(error);
  return (
    <Fade in>
      <Box sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CssBaseline />
        <Stack padding={2}>
          {error.graphQLErrors.map((error, index) => (
            <Alert severity="error" key={index} variant="filled">
              <AlertTitle>API Error</AlertTitle>
              {error.message}
            </Alert>
          ))}
          {error.networkError && (
            <Alert severity="error">
              <AlertTitle>Network Error</AlertTitle>
              {error.message}
            </Alert>
          )}
        </Stack>
      </Box>
    </Fade>
  );
};

export default Error;
