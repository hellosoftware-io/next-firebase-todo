import React from "react";
import { Container, Typography } from "@material-ui/core";
import Head from "next/head";
import { ProtectRoute } from "context/userContext";

type Props = {
  requiresAuth?: boolean;
  title?: string;
  seoTitle?: string;
  children?: React.ReactNode;
  maxWidth?: false | "md" | "xs" | "sm" | "lg" | "xl" | undefined;
};

export default function Page({
  children,
  title,
  seoTitle,
  maxWidth = "md",
  requiresAuth = true,
}: Props): JSX.Element {
  if (requiresAuth === false) {
    return (
      <PageWrapper title={seoTitle ?? title} maxWidth={maxWidth}>
        {title ? (
          <Typography variant="h1" sx={{ mb: 2 }}>
            {title}
          </Typography>
        ) : null}
        {children}
      </PageWrapper>
    );
  } else {
    return (
      <PageWrapper title={seoTitle ?? title} maxWidth={maxWidth}>
        <ProtectRoute>
          {title ? (
            <Typography variant="h1" sx={{ mb: 2 }}>
              {title}
            </Typography>
          ) : null}
          {children}
        </ProtectRoute>
      </PageWrapper>
    );
  }
}

function PageWrapper({ children, title, maxWidth = "md" }: Props): JSX.Element {
  let titleString = "Todo";
  if (title) {
    titleString = "Todo | " + title;
  }
  return (
    <Container maxWidth={maxWidth} sx={{ pt: 2 }}>
      <Head>
        <title>{titleString}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Stay on top of your to-do list." />
      </Head>
      {children}
    </Container>
  );
}
