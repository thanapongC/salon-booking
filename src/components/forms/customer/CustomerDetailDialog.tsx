"use client";

import { useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Typography,
  Alert,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HistoryIcon from "@mui/icons-material/History";
import BlockIcon from "@mui/icons-material/Block";
import StarIcon from "@mui/icons-material/Star";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import EventIcon from "@mui/icons-material/Event";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ChatIcon from "@mui/icons-material/Chat";
import { CustomerData, ServiceHistory } from "@/components/lib/customer";
import { TabPanel } from "@/components/shared/TabPanel";
import { StatCard } from "@/components/shared/StatCard";

interface CustomerDetailDialogProps {
  customer: CustomerData | null;
  open: boolean;
  onClose: () => void;
}

export function CustomerDetailDialog({
  customer,
  open,
  onClose,
}: CustomerDetailDialogProps) {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  if (!customer) return null;

  const cancellationRate =
    customer.totalBookings > 0
      ? ((customer.cancelledBookings / customer.totalBookings) * 100).toFixed(1)
      : "0";

  const noShowRate =
    customer.totalBookings > 0
      ? ((customer.noShowCount / customer.totalBookings) * 100).toFixed(1)
      : "0";

  const getStatusChip = (status: ServiceHistory["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Chip
            size="small"
            icon={<CheckCircleIcon />}
            label="เสร็จสิ้น"
            color="success"
          />
        );
      case "cancelled":
        return (
          <Chip
            size="small"
            icon={<CancelIcon />}
            label="ยกเลิก"
            color="warning"
          />
        );
      case "no-show":
        return (
          <Chip
            size="small"
            icon={<WarningIcon />}
            label="No-show"
            color="error"
          />
        );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: theme.palette.primary.main,
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={customer.avatar}
            sx={{
              width: 56,
              height: 56,
              bgcolor: "white",
              color: theme.palette.primary.main,
            }}
          >
            {customer.firstName[0]}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {customer.firstName} {customer.lastName}
              {customer.nickname && ` (${customer.nickname})`}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
              {customer.isRegular && (
                <Chip
                  size="small"
                  icon={<StarIcon />}
                  label="ลูกค้าประจำ"
                  sx={{ bgcolor: alpha("#FFD700", 0.9), color: "#000" }}
                />
              )}
              {!customer.isRegular && customer.totalBookings <= 2 && (
                <Chip
                  size="small"
                  icon={<FiberNewIcon />}
                  label="ลูกค้าใหม่"
                  sx={{ bgcolor: alpha("#4CAF50", 0.9), color: "white" }}
                />
              )}
              {customer.isBlacklisted && (
                <Chip
                  size="small"
                  icon={<BlockIcon />}
                  label="Blacklisted"
                  sx={{ bgcolor: alpha("#f44336", 0.9), color: "white" }}
                />
              )}
            </Box>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {customer.isBlacklisted && customer.blacklistReason && (
          <Alert severity="error" sx={{ m: 2, mb: 0 }}>
            <Typography variant="subtitle2">เหตุผล Blacklist:</Typography>
            {customer.blacklistReason}
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            <Tab icon={<PersonIcon />} label="ข้อมูลลูกค้า" iconPosition="start" />
            <Tab icon={<HistoryIcon />} label="ประวัติการใช้บริการ" iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3, pb: 2 }}>
            {/* Contact Info */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
              <PhoneIcon color="primary" /> ข้อมูลติดต่อ
            </Typography>
            <Grid2 container spacing={2} sx={{ mb: 3 }}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    เบอร์โทร
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {customer.phone}
                  </Typography>
                </Paper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ChatIcon sx={{ fontSize: 18, color: "#00B900" }} />
                    <Typography variant="body2" color="text.secondary">
                      LINE ID
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="medium">
                    {customer.lineId || "-"}
                  </Typography>
                </Paper>
              </Grid2>
              {customer.email && (
                <Grid2 size={{ xs: 12 }}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                      <Typography variant="body2" color="text.secondary">
                        อีเมล
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="medium">
                      {customer.email}
                    </Typography>
                  </Paper>
                </Grid2>
              )}
            </Grid2>

            <Divider sx={{ my: 3 }} />

            {/* Statistics */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
              <TrendingUpIcon color="primary" /> สถิติ
            </Typography>
            <Grid2 container spacing={2} sx={{ mb: 3 }}>
              <Grid2 size={{ xs: 6, sm: 3 }}>
                <StatCard
                  title="จอง"
                  value={customer.totalBookings}
                  icon={<EventIcon />}
                  color={theme.palette.primary.main}
                  subtitle="ครั้ง"
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 3 }}>
                <StatCard
                  title="No-show"
                  value={customer.noShowCount}
                  icon={<WarningIcon />}
                  color={theme.palette.error.main}
                  subtitle={`${noShowRate}%`}
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 3 }}>
                <StatCard
                  title="ยกเลิก"
                  value={customer.cancelledBookings}
                  icon={<CancelIcon />}
                  color={theme.palette.warning.main}
                  subtitle={`${cancellationRate}%`}
                />
              </Grid2>
              <Grid2 size={{ xs: 6, sm: 3 }}>
                <StatCard
                  title="ใช้จ่าย"
                  value={customer.totalSpent.toLocaleString()}
                  icon={<AttachMoneyIcon />}
                  color={theme.palette.success.main}
                  subtitle="บาท"
                />
              </Grid2>
            </Grid2>

            {/* Dates */}
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    ลูกค้าตั้งแต่
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {customer.createdAt.toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </Paper>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    เข้าใช้บริการล่าสุด
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {customer.lastVisit
                      ? customer.lastVisit.toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "ยังไม่เคยใช้บริการ"}
                  </Typography>
                </Paper>
              </Grid2>
            </Grid2>

            {customer.notes && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  หมายเหตุ
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{ p: 2, bgcolor: alpha(theme.palette.warning.main, 0.05) }}
                >
                  <Typography variant="body2">{customer.notes}</Typography>
                </Paper>
              </>
            )}
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3, pb: 2 }}>
            {customer.serviceHistory.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  color: "text.secondary",
                }}
              >
                <HistoryIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                <Typography>ยังไม่มีประวัติการใช้บริการ</Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>วันที่</TableCell>
                      <TableCell>บริการ</TableCell>
                      <TableCell>พนักงาน</TableCell>
                      <TableCell align="right">ราคา</TableCell>
                      <TableCell align="center">สถานะ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customer.serviceHistory.map((history) => (
                      <TableRow key={history.id} hover>
                        <TableCell>
                          {history.date.toLocaleDateString("th-TH", {
                            day: "numeric",
                            month: "short",
                            year: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>{history.serviceName}</TableCell>
                        <TableCell>{history.staffName}</TableCell>
                        <TableCell align="right">
                          {history.price.toLocaleString()} ฿
                        </TableCell>
                        <TableCell align="center">
                          {getStatusChip(history.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Button startIcon={<EditIcon />} variant="outlined">
          แก้ไขข้อมูล
        </Button>
        {!customer.isBlacklisted ? (
          <Button startIcon={<BlockIcon />} color="error" variant="outlined">
            เพิ่มใน Blacklist
          </Button>
        ) : (
          <Button startIcon={<CheckCircleIcon />} color="success" variant="outlined">
            นำออกจาก Blacklist
          </Button>
        )}
        <Button onClick={onClose}>ปิด</Button>
      </DialogActions>
    </Dialog>
  );
}
