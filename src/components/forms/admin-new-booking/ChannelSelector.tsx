"use client";

import React from "react"

import { Box, Typography, Paper, useTheme } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { BOOKING_CHANNELS, BookingChannel } from "@/components/lib/admin-booking";
// import { type BookingChannel, BOOKING_CHANNELS } from "@/components/lib/bookings-data";

interface ChannelSelectorProps {
  value: BookingChannel;
  onChange: (channel: BookingChannel) => void;
  error?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  DirectionsWalk: <DirectionsWalkIcon />,
  Phone: <PhoneIcon />,
  Chat: <ChatIcon />,
  Facebook: <FacebookIcon />,
  Language: <LanguageIcon />,
  MoreHoriz: <MoreHorizIcon />,
};

export function ChannelSelector({ value, onChange, error }: ChannelSelectorProps) {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
        ช่องทางการจอง *
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(6, 1fr)" },
          gap: 1.5,
        }}
      >
        {BOOKING_CHANNELS.map((channel) => (
          <Paper
            key={channel.value}
            onClick={() => onChange(channel.value)}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              border: 2,
              borderColor: value === channel.value ? theme.palette.primary.main : "transparent",
              bgcolor: value === channel.value ? theme.palette.primary.main + "10" : theme.palette.background.paper,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <Box
              sx={{
                color: value === channel.value ? theme.palette.primary.main : theme.palette.grey[500],
                "& svg": { fontSize: 28 },
              }}
            >
              {iconMap[channel.icon]}
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: value === channel.value ? 600 : 400,
                color: value === channel.value ? theme.palette.primary.main : theme.palette.text.secondary,
                textAlign: "center",
              }}
            >
              {channel.label}
            </Typography>
          </Paper>
        ))}
      </Box>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
