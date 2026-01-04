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
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  AttachMoney as MoneyIcon,
  LocalOffer as OfferIcon,
} from "@mui/icons-material"
import { Service } from "@/interfaces/Store"

interface ServiceCardProps {
  service: Service
  onEdit: (service: Service) => void
  onDelete: (serviceId: string) => void
  onToggleStatus?: (serviceId: string, active: boolean) => void
}

export function ServiceCard({ service, onEdit, onDelete, onToggleStatus }: ServiceCardProps) {
  const theme = useTheme()

  const hasDiscount = service.discount > 0 && service.discount < service.price
  const finalPrice = hasDiscount ? service.discount : service.price

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleStatus) {
      onToggleStatus(service.id, event.target.checked)
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
        opacity: service.active ? 1 : 0.6,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {/* Service Image */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={service.imageId || "/customer-service-interaction.png"}
          alt={service.name}
          sx={{
            objectFit: "cover",
            backgroundColor: theme.palette.grey[100],
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 10,
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: service.active ? theme.palette.success.main : theme.palette.text.secondary,
            }}
          >
            {service.active ? "เปิด" : "ปิด"}
          </Typography>
          <Switch
            checked={typeof service.active === 'string' && Boolean(service.active)}
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
        </Box>

        {/* Display Number Badge */}
        {/* {service.displayNumber > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
          >
            {service.displayNumber}
          </Box>
        )} */}

        {/* Service Color Indicator */}
        {service.colorOfService && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 6,
              backgroundColor: service.colorOfService || theme.palette.primary.main,
            }}
          />
        )}
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
        {/* Service Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: 56,
          }}
        >
          {service.name}
        </Typography>

        {/* Service Description */}
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
          {service.detail || "ไม่มีคำอธิบาย"}
        </Typography>

        {/* Service Details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
          {/* Duration */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ScheduleIcon sx={{ fontSize: 18, color: theme.palette.secondary.main }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {service.durationMinutes} นาที
              {service.bufferTime > 0 && (
                <Typography component="span" variant="caption" sx={{ ml: 0.5, color: theme.palette.text.secondary }}>
                  (+ {service.bufferTime} นาที บัฟเฟอร์)
                </Typography>
              )}
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {hasDiscount ? (
              <>
                <OfferIcon sx={{ fontSize: 18, color: theme.palette.error.main }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    ฿{service.price.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.error.main,
                      fontWeight: 700,
                    }}
                  >
                    ฿{finalPrice.toLocaleString()}
                  </Typography>
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
                  ฿{service.price.toLocaleString()}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {/* Staff Members */}
        {service.employees && service.employees.length > 0 && (
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
              {service.employees.map((employee, index) => (
                <Tooltip key={employee.userId} title={employee.name} arrow>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                    }}
                  >
                    {employee.name[0]}
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
              onClick={() => onEdit(service)}
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
              onClick={() => onDelete(service.id)}
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
