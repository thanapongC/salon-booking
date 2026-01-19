"use client"

import { Box, Typography, Button, ButtonGroup, IconButton, useTheme, useMediaQuery } from "@mui/material"
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  Add as AddIcon,
} from "@mui/icons-material"

interface CalendarHeaderProps {
  currentDate: Date
  viewMode: 'day' | 'week'
  onViewModeChange: (mode: 'day' | 'week') => void
  onDateChange: (date: Date) => void
  onAddAppointment: () => void
}

export default function CalendarHeader({
  currentDate,
  viewMode,
  onViewModeChange,
  onDateChange,
  onAddAppointment,
}: CalendarHeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
    if (viewMode === 'day') {
      return currentDate.toLocaleDateString('th-TH', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    }
    // Week view - show week range
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - day)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    
    return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('th-TH', options)}`
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    }
    onDateChange(newDate)
  }

  const goToToday = () => {
    onDateChange(new Date())
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
      }}
    >
      {/* Left section - Title and Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          Calendar
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => navigateDate('prev')}
            sx={{
              bgcolor: theme.palette.background.paper,
              '&:hover': { bgcolor: theme.palette.grey[100] },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          
          <Button
            startIcon={<TodayIcon />}
            onClick={goToToday}
            variant="outlined"
            size="small"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.main,
                color: '#fff',
              },
            }}
          >
            {isMobile ? '' : 'วันนี้'}
          </Button>
          
          <IconButton
            onClick={() => navigateDate('next')}
            sx={{
              bgcolor: theme.palette.background.paper,
              '&:hover': { bgcolor: theme.palette.grey[100] },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 500,
            minWidth: { xs: '100%', sm: 'auto' },
          }}
        >
          {formatDateRange()}
        </Typography>
      </Box>

      {/* Right section - View Mode Toggle and Add Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <ButtonGroup variant="outlined" size="small">
          <Button
            onClick={() => onViewModeChange('day')}
            sx={{
              bgcolor: viewMode === 'day' ? theme.palette.primary.main : 'transparent',
              color: viewMode === 'day' ? '#fff' : theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: viewMode === 'day' ? theme.palette.primary.dark : theme.palette.grey[100],
              },
            }}
          >
            รายวัน
          </Button>
          <Button
            onClick={() => onViewModeChange('week')}
            sx={{
              bgcolor: viewMode === 'week' ? theme.palette.primary.main : 'transparent',
              color: viewMode === 'week' ? '#fff' : theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: viewMode === 'week' ? theme.palette.primary.dark : theme.palette.grey[100],
              },
            }}
          >
            รายสัปดาห์
          </Button>
        </ButtonGroup>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddAppointment}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: '#fff',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          {isMobile ? 'เพิ่ม' : 'นัดหมายใหม่'}
        </Button>
      </Box>
    </Box>
  )
}
