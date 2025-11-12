"use client";
import { Grid, Box, Grid2 } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components

const Settings = () => {
  return (
    <PageContainer title="Settings" description="">
      <Box mt={3}>
        <Grid2 container spacing={3}>
          Settings
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default Settings;
