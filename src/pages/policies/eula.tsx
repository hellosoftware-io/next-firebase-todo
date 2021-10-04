import React from "react";
import { Typography } from "@mui/material";
import Page from "components/layout/Page";

export default function EulaPage(): JSX.Element {
  return (
    <Page title="EULA" requiresAuth={false}>
      <Typography variant="body1">Put your eula here.</Typography>
    </Page>
  );
}
