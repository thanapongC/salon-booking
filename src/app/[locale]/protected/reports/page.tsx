"use client";
import { Grid, Box, Grid2 } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components

const Report = () => {
  return (
    <PageContainer title="Report" description="">
      <Box mt={3}>
        <Grid2 container spacing={3}>
          Report Page
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default Report;
