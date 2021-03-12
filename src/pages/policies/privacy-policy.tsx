import React from "react";
import { Typography } from "@material-ui/core";
import Page from "components/layout/Page";

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <Page title="Privacy Policy" requiresAuth={false}>
      <Typography variant="body1">Put your privacy policy here.</Typography>
    </Page>
  );
}
