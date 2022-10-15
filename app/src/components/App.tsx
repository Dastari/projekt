import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../routes/Home";
import Initialise from "../routes/Initialise";
import Error from "./Error";
import Header from "./header/Header";
import Loading from "./Loading";

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

  // client.on("message", (message) => {
  //   if (message.type === "next") {
  //     (message as NextMessage)?.payload?.errors?.map((error) => {
  //       if (error.extensions.code === "UNINITIALISED") {
  //         setInitialised(false);
  //       }
  //     });
  //   }
  // });

  if (!initialised) return <Initialise />;
  if (error) return <Error error={error} />;
  if (loading || !data) return <Loading />;

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
