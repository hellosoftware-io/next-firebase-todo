import React from "react";
import { Box } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </Box>
  );
}
