import * as React from "react";
import { Tabs, Box, Tab, Grid2 } from "@mui/material";
// import ReportSettingForm from "../shared/ReportSettingForm";
// import { ReportType } from "@/contexts/ReportContext";
import { a11yProps, CustomTabPanel } from "../../shared/TabSetting";
import { CalendarMonth, LocalOffer, PriceCheck } from "@mui/icons-material";
import NewBooking from "./NewBooking";
import BookingTable from "./BookingTable";

export default function BookingTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label=""
        >
          <Tab label="รายการจองทั้งหมด" {...a11yProps(0)} />
          <Tab label="เพิ่มรายการจองใหม่" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid2 container justifyContent="center">
          <BookingTable/>
        </Grid2>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid2 container justifyContent="center">
          <NewBooking/>
        </Grid2>
      </CustomTabPanel>
    </Box>
  );
}
