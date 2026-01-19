"use client";

import {
  Box,
  Avatar,
  Card,
  Chip,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import BlockIcon from "@mui/icons-material/Block";
import StarIcon from "@mui/icons-material/Star";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatIcon from "@mui/icons-material/Chat";
import { CustomerData } from "@/components/lib/customer";

interface CustomerTableProps {
  customers: CustomerData[];
  onViewCustomer: (customer: CustomerData) => void;
}

export function CustomerTable({ customers, onViewCustomer }: CustomerTableProps) {
  const theme = useTheme();

  const getCancellationRate = (customer: CustomerData) => {
    if (customer.totalBookings === 0) return 0;
    return (customer.cancelledBookings / customer.totalBookings) * 100;
  };

  return (
    <Card sx={{ borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
              <TableCell>ลูกค้า</TableCell>
              <TableCell>ติดต่อ</TableCell>
              <TableCell align="center">Booking</TableCell>
              <TableCell align="center">No-show</TableCell>
              <TableCell align="center">อัตรายกเลิก</TableCell>
              <TableCell align="center">สถานะ</TableCell>
              <TableCell align="center">จัดการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow
                key={customer.id}
                hover
                sx={{
                  bgcolor: customer.isBlacklisted
                    ? alpha(theme.palette.error.main, 0.05)
                    : "inherit",
                  "&:hover": {
                    bgcolor: customer.isBlacklisted
                      ? alpha(theme.palette.error.main, 0.1)
                      : undefined,
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={customer.avatar}
                      sx={{
                        bgcolor: customer.isBlacklisted
                          ? theme.palette.error.main
                          : theme.palette.primary.main,
                      }}
                    >
                      {customer.firstName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {customer.firstName} {customer.lastName}
                        {customer.nickname && (
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {" "}
                            ({customer.nickname})
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ลูกค้าตั้งแต่{" "}
                        {customer.createdAt.toLocaleDateString("th-TH", {
                          month: "short",
                          year: "2-digit",
                        })}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{customer.phone}</Typography>
                    {customer.lineId && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <ChatIcon sx={{ fontSize: 14, color: "#00B900" }} />
                        <Typography variant="caption" color="text.secondary">
                          {customer.lineId}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    size="small"
                    label={customer.totalBookings}
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    size="small"
                    label={customer.noShowCount}
                    color={customer.noShowCount > 0 ? "error" : "default"}
                    variant={customer.noShowCount > 0 ? "filled" : "outlined"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={getCancellationRate(customer)}
                      sx={{
                        width: 60,
                        height: 6,
                        borderRadius: 3,
                        bgcolor: theme.palette.grey[200],
                        "& .MuiLinearProgress-bar": {
                          bgcolor:
                            getCancellationRate(customer) > 30
                              ? theme.palette.error.main
                              : getCancellationRate(customer) > 15
                                ? theme.palette.warning.main
                                : theme.palette.success.main,
                        },
                      }}
                    />
                    <Typography variant="caption">
                      {getCancellationRate(customer).toFixed(0)}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}
                  >
                    {customer.isBlacklisted && (
                      <Tooltip title="Blacklisted">
                        <Chip
                          size="small"
                          icon={<BlockIcon />}
                          label="Blacklist"
                          color="error"
                        />
                      </Tooltip>
                    )}
                    {customer.isRegular && !customer.isBlacklisted && (
                      <Tooltip title="ลูกค้าประจำ">
                        <Chip
                          size="small"
                          icon={<StarIcon />}
                          label="ประจำ"
                          sx={{
                            bgcolor: alpha("#FFD700", 0.2),
                            color: "#B8860B",
                            "& .MuiChip-icon": { color: "#FFD700" },
                          }}
                        />
                      </Tooltip>
                    )}
                    {!customer.isRegular &&
                      customer.totalBookings <= 2 &&
                      !customer.isBlacklisted && (
                        <Tooltip title="ลูกค้าใหม่">
                          <Chip
                            size="small"
                            icon={<FiberNewIcon />}
                            label="ใหม่"
                            color="success"
                            variant="outlined"
                          />
                        </Tooltip>
                      )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="ดูรายละเอียด">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onViewCustomer(customer)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    ไม่พบข้อมูลลูกค้าที่ค้นหา
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
