"use client";

import { Box, Typography, Paper, useTheme, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useMemo } from "react";
import { TimeSlot } from "@/components/lib/admin-booking";

interface DateTimePickerProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
  timeSlots: TimeSlot[];
  dateError?: string;
  timeError?: string;
}

const DAYS_TH = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const MONTHS_TH = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  timeSlots,
  dateError,
  timeError,
}: DateTimePickerProps) {
  const theme = useTheme();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  const isDateDisabled = (date: Date) => {
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  const isToday = (date: Date) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
      {/* Calendar */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          เลือกวันที่ *
        </Typography>
        <Paper sx={{ p: 2 }}>
          {/* Month navigation */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <IconButton onClick={() => navigateMonth(-1)} size="small">
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="subtitle1" fontWeight={600}>
              {MONTHS_TH[currentMonth.getMonth()]} {currentMonth.getFullYear() + 543}
            </Typography>
            <IconButton onClick={() => navigateMonth(1)} size="small">
              <ChevronRightIcon />
            </IconButton>
          </Box>

          {/* Day headers */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0.5,
              mb: 1,
            }}
          >
            {DAYS_TH.map((day, index) => (
              <Typography
                key={day}
                variant="caption"
                sx={{
                  textAlign: "center",
                  fontWeight: 600,
                  color: index === 0 ? theme.palette.error.main : theme.palette.text.secondary,
                  py: 0.5,
                }}
              >
                {day}
              </Typography>
            ))}
          </Box>

          {/* Calendar grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0.5,
            }}
          >
            {calendarDays.map((date, index) => (
              <Box
                key={index}
                onClick={() => date && !isDateDisabled(date) && onDateChange(date)}
                sx={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  cursor: date && !isDateDisabled(date) ? "pointer" : "default",
                  bgcolor: date && isDateSelected(date)
                    ? theme.palette.primary.main
                    : "transparent",
                  color: date
                    ? isDateSelected(date)
                      ? "#fff"
                      : isDateDisabled(date)
                        ? theme.palette.grey[300]
                        : theme.palette.text.primary
                    : "transparent",
                  fontWeight: date && isToday(date) ? 700 : 400,
                  border: date && isToday(date) && !isDateSelected(date)
                    ? `2px solid ${theme.palette.primary.main}`
                    : "2px solid transparent",
                  transition: "all 0.15s ease",
                  "&:hover": date && !isDateDisabled(date)
                    ? {
                        bgcolor: isDateSelected(date)
                          ? theme.palette.primary.dark
                          : theme.palette.primary.main + "15",
                      }
                    : {},
                }}
              >
                <Typography variant="body2">{date?.getDate()}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
        {dateError && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
            {dateError}
          </Typography>
        )}
      </Box>

      {/* Time slots */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          เลือกเวลา *
        </Typography>
        <Paper
          sx={{
            p: 2,
            maxHeight: 360,
            overflow: "auto",
          }}
        >
          {selectedDate ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
              }}
            >
              {timeSlots.map((slot) => (
                <Paper
                  key={slot.time}
                  onClick={() => slot.available && onTimeChange(slot.time)}
                  sx={{
                    p: 1.5,
                    textAlign: "center",
                    cursor: slot.available ? "pointer" : "not-allowed",
                    bgcolor: selectedTime === slot.time
                      ? theme.palette.primary.main
                      : slot.available
                        ? theme.palette.background.paper
                        : theme.palette.grey[100],
                    color: selectedTime === slot.time
                      ? "#fff"
                      : slot.available
                        ? theme.palette.text.primary
                        : theme.palette.grey[400],
                    border: 1,
                    borderColor: selectedTime === slot.time
                      ? theme.palette.primary.main
                      : theme.palette.divider,
                    transition: "all 0.15s ease",
                    "&:hover": slot.available
                      ? {
                          borderColor: theme.palette.primary.main,
                          transform: "scale(1.02)",
                        }
                      : {},
                  }}
                >
                  <Typography variant="body2" fontWeight={selectedTime === slot.time ? 600 : 400}>
                    {slot.time}
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 200,
                color: theme.palette.text.secondary,
              }}
            >
              <Typography variant="body2">กรุณาเลือกวันที่ก่อน</Typography>
            </Box>
          )}
        </Paper>
        {timeError && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block" }}>
            {timeError}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
