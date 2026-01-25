"use client"

import type React from "react"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Switch,
  Chip,
  Stack,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
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
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        opacity: employee.isActive ? 1 : 0.7,
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 12px 24px ${theme.palette.primary.main}15`,
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {/* Employee Image Section */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={employee.imageUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} // เปลี่ยนเป็นรูปพนักงาน
          alt={employee.name}
          sx={{
            objectFit: "cover",
            filter: employee.isActive ? "none" : "grayscale(100%)",
          }}
        />
        
        {/* Position Badge */}
        {employee.position && (
          <Chip
            label={employee.position}
            size="small"
            color="primary"
            sx={{
              position: "absolute",
              bottom: 12,
              left: 12,
              fontWeight: 600,
              backdropFilter: "blur(4px)",
              backgroundColor: `${theme.palette.primary.main}e6`,
            }}
          />
        )}
      </Box>

      {/* Card Content */}
      <CardContent sx={{ flexGrow: 1, p: 2.5, display: "flex", flexDirection: "column" }}>
        {/* Name and Status Toggle */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {employee.name} {employee.surname}
            </Typography>
            {employee.nickname && (
              <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                ({employee.nickname})
              </Typography>
            )}
          </Box>
          
          <Box sx={{ textAlign: "center" }}>
            <Switch
              checked={employee.isActive}
              onChange={handleToggleChange}
              size="small"
              color="success"
            />
            <Typography
              variant="caption"
              display="block"
              sx={{ fontWeight: 600, color: employee.isActive ? "success.main" : "text.secondary" }}
            >
              {employee.isActive ? "พร้อมงาน" : "ไม่พร้อม"}
            </Typography>
          </Box>
        </Box>

        {/* Contact Info (Quick View) */}
        <Stack direction="row" spacing={2} sx={{ mb: 2, color: "text.secondary" }}>
          {employee.email && (
            <Tooltip title={employee.email}>
              <EmailIcon sx={{ fontSize: 18 }} />
            </Tooltip>
          )}
          {employee.phone && (
            <Tooltip title={employee.phone}>
              <PhoneIcon sx={{ fontSize: 18 }} />
            </Tooltip>
          )}
        </Stack>

        {/* Note / Description */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            minHeight: 40,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {employee.note || "ไม่มีบันทึกเพิ่มเติม"}
        </Typography>

        {/* Responsible Services */}
        {employee.services && employee.services.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, mb: 1, display: "block" }}>
              บริการที่รับผิดชอบ:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {employee.services.slice(0, 3).map((service) => (
                <Chip
                  key={service.id}
                  label={service.name}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.7rem", height: 20 }}
                />
              ))}
              {employee.services.length > 3 && (
                <Typography variant="caption" sx={{ alignSelf: "center", ml: 0.5 }}>
                  +{employee.services.length - 3}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Footer Actions */}
        <Box
          sx={{
            mt: "auto",
            pt: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Tooltip title="แก้ไขข้อมูลพนักงาน">
            <IconButton
              size="small"
              onClick={() => onEdit(employee.id)}
              sx={{ 
                color: theme.palette.primary.main,
                bgcolor: `${theme.palette.primary.main}10`,
                "&:hover": { bgcolor: theme.palette.primary.main, color: "#fff" }
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="ลบพนักงาน">
            <IconButton
              size="small"
              onClick={() => onDelete(employee.id)}
              sx={{ 
                color: theme.palette.error.main,
                bgcolor: `${theme.palette.error.main}10`,
                "&:hover": { bgcolor: theme.palette.error.main, color: "#fff" }
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