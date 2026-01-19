"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  useTheme,
  Divider,
} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import { StaffAvailability } from "@/components/lib/dashboard"
import { getStaffStatusColor, getStaffStatusLabel } from "@/components/lib/dashboard-data"

interface StaffAvailabilityListProps {
  staffList: StaffAvailability[]
}

export default function StaffAvailabilityList({ staffList }: StaffAvailabilityListProps) {
  const theme = useTheme()

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 3,
            pb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            สถานะพนักงาน
          </Typography>
          <PersonIcon sx={{ color: theme.palette.secondary.main }} />
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {staffList.map((staff, index) => (
            <Box key={staff.id}>
              <ListItem
                sx={{
                  px: 3,
                  py: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemAvatar>
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.primary.main,
                        width: 44,
                        height: 44,
                      }}
                    >
                      {staff.name.charAt(0)}
                    </Avatar>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        backgroundColor: getStaffStatusColor(staff.status),
                        border: "2px solid #fff",
                      }}
                    />
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {staff.name}
                      </Typography>
                      <Chip
                        label={getStaffStatusLabel(staff.status)}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          backgroundColor: `${getStaffStatusColor(staff.status)}20`,
                          color: getStaffStatusColor(staff.status),
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    staff.status === "busy" ? (
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {staff.currentService} - ว่างเวลา {staff.nextAvailable}
                      </Typography>
                    ) : staff.status === "break" ? (
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        กลับมาเวลา {staff.nextAvailable}
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: "#4CAF50" }}>
                        พร้อมให้บริการ
                      </Typography>
                    )
                  }
                />
              </ListItem>
              {index < staffList.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
