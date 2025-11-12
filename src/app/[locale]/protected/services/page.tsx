"use client";
import { Grid, Box, Grid2 } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components

const Services = () => {
  return (
    <PageContainer title="Services" description="">
      <Box mt={3}>
        <Grid2 container spacing={3}>
          Services
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default Services;
