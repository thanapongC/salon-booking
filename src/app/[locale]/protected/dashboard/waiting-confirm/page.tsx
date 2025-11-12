"use client";
import { Grid, Box, Grid2 } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components

const WaitingConfirm = () => {
  return (
    <PageContainer title="WaitingConfirm" description="">
      <Box mt={3}>
        <Grid2 container spacing={3}>
          Waiting-Confirm
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default WaitingConfirm;
