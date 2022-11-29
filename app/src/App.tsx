import { useEffect, useState, lazy } from "react";

import { gql, useQuery } from "@apollo/client";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Error, Header, Loading } from "@/components";

const Home = lazy(() => import("./routes/Home"));
const Initialise = lazy(() => import("./routes/Initialise"));

const SETTINGS = gql`
  query settings {
    settings
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(SETTINGS, { errorPolicy: "all" });
  const [initialised, setInitialised] = useState(true);

  useEffect(() => {
    const uninitialised = error?.graphQLErrors.find((error) => error?.extensions?.code === "UNINITIALISED");
    if (uninitialised) {
      setInitialised(false);
    }
  }, [error]);

  if (!initialised) return <Initialise />;
  if (error) return <Error error={error} />;
  if (loading || !data) return <Loading />;

  return (
    <BrowserRouter>
      {/* <ThemeProvider theme={{}}> */}
      <CssBaseline />
      <Header />
      <Box
        sx={{
          height: (theme) => [`calc(100% - ${theme.spacing(7)})`, `calc(100% - ${theme.spacing(8)})`],
          overflow: "auto",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  );
};

export default App;
