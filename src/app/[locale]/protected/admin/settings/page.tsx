"use client";

import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid2,
  Tabs,
  Tab,
} from "@mui/material";
import PageContainer from "@/components/container/PageContainer";
import { useTranslations } from "next-intl";
import BaseCard from "@/components/shared/BaseCard";
import { useEffect, useState } from "react";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import { a11yProps, CustomTabPanel } from "@/components/shared/TabSetting";
import ResetPasswordForm from "@/components/forms/settings/ResetPasswordForm";
import LineSettings from "@/components/forms/settings/LineSettings";
import TimeSettings from "@/components/forms/settings/TimeSettings";
import ShopSettings from "@/components/forms/settings/ShopSettings";
import React from "react";

import {
  EventBusy as EventBusyIcon,
  Block as BlockIcon,
  Rule as RuleIcon,
  Store as StoreIcon,
  Link as LinkIcon,
  People as PeopleIcon,
  Shop,
  Password,
} from "@mui/icons-material";
import { Store } from "lucide-react";

const Services = () => {
  const [value, setValue] = React.useState(0);

  const [issueDate, setIssueDate] = useState("");
  const [repairLocation, setRepairLocation] = useState<string>("");
  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepairLocation(event.target.value);
  };

  const { setBreadcrumbs } = useBreadcrumbContext();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: "/dashboard" },
      { name: "ตั้งค่าร้านค้า", href: "" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer title="" description="">
      <Typography variant="h1" mt={2}>
        ตั้งค่าร้านค้า
      </Typography>
      <BaseCard title="">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="">
              <Tab
                icon={<Store />}
                label="ข้อมูลร้าน"
                {...a11yProps(0)}
              />
              <Tab
                icon={<Password />}
                label="เปลี่ยนรหัสผ่าน"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Grid2 container justifyContent="center">
              <ShopSettings />
            </Grid2>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Grid2 container justifyContent="center">
              <ResetPasswordForm />
            </Grid2>
          </CustomTabPanel>
        </Box>
      </BaseCard>
    </PageContainer>
  );
};

export default Services;
