"use client";
import { Grid, Box, Grid2 } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
// components

const Bookings = () => {
  return (
    <PageContainer title="Bookings" description="">
      <Box mt={3}>
        <Grid2 container spacing={3}>
          Bookings
        </Grid2>
      </Box>
    </PageContainer>
  );
};

export default Bookings;
