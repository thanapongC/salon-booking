"use client"

import type React from "react"

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Avatar,
  AvatarGroup,
  Tooltip,
  Switch,
  Chip,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  LocalOffer as OfferIcon,
} from "@mui/icons-material"

import { Employee } from "@/interfaces/Store"

interface EmployeeCardProps {
  employee: Employee
  onEdit: (employeeId: string) => void
  onDelete: (employeeId: string) => void
  onToggleStatus?: (employeeId: string, isActive: boolean) => void
}

export function EmployeeCard({ employee, onEdit, onDelete, onToggleStatus }: EmployeeCardProps) {
  const theme = useTheme()

  // const hasDiscount = employee.discount > 0 && employee.discount < employee.price
  // const finalPrice = hasDiscount ? employee.discount : employee.price
  // const discountPercent = hasDiscount ? Math.round(((employee.price - employee.discount) / employee.price) * 100) : 0

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleStatus) {
      onToggleStatus(employee.id, event.target.checked)
    }
  }

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease",
        position: "relative",
        opacity: employee.isActive ? 1 : 0.65,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {/* Employee Image */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={employee.imageUrl || "/customer-employee-interaction.png"}
          alt={employee.name}
          sx={{
            objectFit: "cover",
            backgroundColor: theme.palette.grey[100],
          }}
        />

        {/* {employee.displayNumber > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            {employee.displayNumber}
          </Box>
        )} */}

        {/* {hasDiscount && (
          <Chip
            label={`-${discountPercent}%`}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
              fontWeight: 700,
              fontSize: "0.875rem",
              height: 28,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          />
        )} */}

        {/* {employee.colorOfEmployee && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              backgroundColor: employee.colorOfEmployee,
              boxShadow: `0 -2px 8px ${employee.colorOfEmployee}40`,
            }}
          />
        )} */}
      </Box>

      {/* Card Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              flexGrow: 1,
            }}
          >
            {employee.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              flexShrink: 0,
            }}
          >
            <Switch
              checked={typeof employee.isActive === 'string' ? Boolean(employee.isActive) : employee.isActive}
              onChange={handleToggleChange}
              size="small"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: theme.palette.success.main,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: theme.palette.success.main,
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: "0.65rem",
                color: employee.isActive ? theme.palette.success.main : theme.palette.text.secondary,
              }}
            >
              {employee.isActive ? "เปิด" : "ปิด"}
            </Typography>
          </Box>
        </Box>

        {/* {employee.colorOfEmployee && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: employee.colorOfEmployee,
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: `0 0 0 1px ${theme.palette.divider}`,
              }}
            />
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              สีประจำบริการ
            </Typography>
          </Box>
        )} */}

        {/* Employee Description */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: 40,
            flexGrow: 1,
          }}
        >
          {employee.note || "ไม่มีคำอธิบาย"}
        </Typography>

        {/* Employee Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
          {/* Duration */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ScheduleIcon sx={{ fontSize: 18, color: theme.palette.secondary.main }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {/* {employee.durationMinutes} นาที
              {employee.bufferTime > 0 && (
                <Typography component="span" variant="caption" sx={{ ml: 0.5, color: theme.palette.text.secondary }}>
                  (+ {employee.bufferTime} นาที บัฟเฟอร์)
                </Typography>
              )} */}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* {hasDiscount ? (
              <>
                <OfferIcon sx={{ fontSize: 18, color: theme.palette.error.main }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.error.main,
                        fontWeight: 700,
                      }}
                    >
                      ฿{finalPrice.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: theme.palette.text.disabled,
                      }}
                    >
                      ฿{employee.price.toLocaleString()}
                    </Typography>
                  </Box>
                  <Chip
                    label={`ลด ${discountPercent}%`}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: "0.7rem",
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.error.contrastText,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                <MoneyIcon sx={{ fontSize: 18, color: theme.palette.success.main }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                  }}
                >
                  ฿{employee.price.toLocaleString()}
                </Typography>
              </>
            )} */}
          </Box>
        </Box>

        {/* Staff Members */}
        {employee.services && employee.services.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: "block", mb: 1 }}>
              พนักงาน:
            </Typography>
            <AvatarGroup
              max={4}
              sx={{
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  fontSize: "0.875rem",
                  borderColor: theme.palette.background.paper,
                },
              }}
            >
              {employee.services.map((services) => (
                <Tooltip key={services.id} title={services.colorOfService} arrow>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                    }}
                  >
                    {services.name[0]}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
          </Box>
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            pt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            mt: "auto",
          }}
        >
          <Tooltip title="แก้ไข" arrow>
            <IconButton
              size="small"
              onClick={() => onEdit(employee.id)}
              sx={{
                color: theme.palette.primary.main,
                backgroundColor: `${theme.palette.primary.main}10`,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="ลบ" arrow>
            <IconButton
              size="small"
              onClick={() => onDelete(employee.id)}
              sx={{
                color: theme.palette.error.main,
                backgroundColor: `${theme.palette.error.main}10`,
                "&:hover": {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  )
}
