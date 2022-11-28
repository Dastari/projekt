import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const link = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4040/graphql",
  })
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
