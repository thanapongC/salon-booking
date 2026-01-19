"use client"

import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Collapse,
  Chip,
  Typography,
  Menu,
  useTheme,
  useMediaQuery
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ClearIcon from '@mui/icons-material/Clear'
import { BookingChannel, BookingFilters, BookingStatus } from '@/components/lib/bookings'
import { staffMembers } from '@/utils/lib/booking-data'

interface BookingsHeaderProps {
  filters: BookingFilters
  onFilterChange: (filters: BookingFilters) => void
  onAddNew: () => void
  onExport: (format: 'xlsx' | 'csv') => void
}

export default function BookingsHeader({
  filters,
  onFilterChange,
  onAddNew,
  onExport
}: BookingsHeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [showFilters, setShowFilters] = useState(false)
  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null)

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value })
  }

  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value as BookingStatus | 'all' })
  }

  const handleChannelChange = (value: string) => {
    onFilterChange({ ...filters, channel: value as BookingChannel | 'all' })
  }

  const handleDateFromChange = (value: string) => {
    onFilterChange({ ...filters, dateFrom: value })
  }

  const handleDateToChange = (value: string) => {
    onFilterChange({ ...filters, dateTo: value })
  }

  const handleStaffChange = (value: string) => {
    onFilterChange({ ...filters, staffId: value })
  }

  const clearFilters = () => {
    onFilterChange({
      search: '',
      status: 'all',
      channel: 'all',
      dateFrom: '',
      dateTo: '',
      staffId: ''
    })
  }

  const hasActiveFilters = 
    filters.status !== 'all' || 
    filters.channel !== 'all' || 
    filters.dateFrom || 
    filters.dateTo || 
    filters.staffId

  return (
    <Box sx={{ mb: 3 }}>
      {/* Top Row */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2, 
        mb: 2,
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
          รายการจองทั้งหมด
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={(e) => setExportAnchor(e.currentTarget)}
            sx={{
              borderColor: theme.palette.grey[300],
              color: theme.palette.text.primary,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                bgcolor: theme.palette.action.hover
              }
            }}
          >
            Export
          </Button>
          <Menu
            anchorEl={exportAnchor}
            open={Boolean(exportAnchor)}
            onClose={() => setExportAnchor(null)}
          >
            <MenuItem onClick={() => { onExport('xlsx'); setExportAnchor(null) }}>
              Export เป็น Excel (.xlsx)
            </MenuItem>
            <MenuItem onClick={() => { onExport('csv'); setExportAnchor(null) }}>
              Export เป็น CSV (.csv)
            </MenuItem>
          </Menu>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddNew}
            sx={{
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark
              }
            }}
          >
            เพิ่มการจอง
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Toggle */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 2,
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <TextField
          placeholder="ค้นหาชื่อลูกค้า, เบอร์โทร, บริการ..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          size="small"
          sx={{ 
            flex: 1,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.text.secondary }} />
              </InputAdornment>
            )
          }}
        />
        <Button
          variant={showFilters ? 'contained' : 'outlined'}
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{
            minWidth: 120,
            borderColor: showFilters ? 'transparent' : theme.palette.grey[300],
            bgcolor: showFilters ? theme.palette.primary.main : 'transparent',
            color: showFilters ? '#fff' : theme.palette.text.primary,
            '&:hover': {
              bgcolor: showFilters ? theme.palette.primary.dark : theme.palette.action.hover
            }
          }}
        >
          ตัวกรอง {hasActiveFilters && `(${[
            filters.status !== 'all' ? 1 : 0,
            filters.channel !== 'all' ? 1 : 0,
            filters.dateFrom ? 1 : 0,
            filters.dateTo ? 1 : 0,
            filters.staffId ? 1 : 0
          ].reduce((a, b) => a + b, 0)})`}
        </Button>
      </Box>

      {/* Filter Panel */}
      <Collapse in={showFilters}>
        <Box sx={{
          p: 3,
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          mb: 2,
          boxShadow: '0px 2px 8px rgba(23, 46, 78, 0.08)'
        }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 2
          }}>
            <FormControl size="small" fullWidth>
              <InputLabel>สถานะ</InputLabel>
              <Select
                value={filters.status}
                label="สถานะ"
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <MenuItem value="all">ทั้งหมด</MenuItem>
                <MenuItem value="pending">รอยืนยัน</MenuItem>
                <MenuItem value="confirmed">ยืนยันแล้ว</MenuItem>
                <MenuItem value="completed">เสร็จสิ้น</MenuItem>
                <MenuItem value="cancelled">ยกเลิก</MenuItem>
                <MenuItem value="no-show">ไม่มา</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>ช่องทาง</InputLabel>
              <Select
                value={filters.channel}
                label="ช่องทาง"
                onChange={(e) => handleChannelChange(e.target.value)}
              >
                <MenuItem value="all">ทั้งหมด</MenuItem>
                <MenuItem value="online">ออนไลน์</MenuItem>
                <MenuItem value="walk-in">Walk-in</MenuItem>
                <MenuItem value="phone">โทรศัพท์</MenuItem>
                <MenuItem value="line">LINE</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>พนักงาน</InputLabel>
              <Select
                value={filters.staffId}
                label="พนักงาน"
                onChange={(e) => handleStaffChange(e.target.value)}
              >
                <MenuItem value="">ทั้งหมด</MenuItem>
                {staffMembers.map((staff) => (
                  <MenuItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="จากวันที่"
              type="date"
              size="small"
              value={filters.dateFrom}
              onChange={(e) => handleDateFromChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="ถึงวันที่"
              type="date"
              size="small"
              value={filters.dateTo}
              onChange={(e) => handleDateToChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>

          {hasActiveFilters && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                ตัวกรองที่ใช้:
              </Typography>
              {filters.status !== 'all' && (
                <Chip
                  size="small"
                  label={`สถานะ: ${filters.status}`}
                  onDelete={() => handleStatusChange('all')}
                  sx={{ bgcolor: theme.palette.grey[100] }}
                />
              )}
              {filters.channel !== 'all' && (
                <Chip
                  size="small"
                  label={`ช่องทาง: ${filters.channel}`}
                  onDelete={() => handleChannelChange('all')}
                  sx={{ bgcolor: theme.palette.grey[100] }}
                />
              )}
              {filters.staffId && (
                <Chip
                  size="small"
                  label={`พนักงาน: ${staffMembers.find(s => s.id === filters.staffId)?.name}`}
                  onDelete={() => handleStaffChange('')}
                  sx={{ bgcolor: theme.palette.grey[100] }}
                />
              )}
              {filters.dateFrom && (
                <Chip
                  size="small"
                  label={`จาก: ${filters.dateFrom}`}
                  onDelete={() => handleDateFromChange('')}
                  sx={{ bgcolor: theme.palette.grey[100] }}
                />
              )}
              {filters.dateTo && (
                <Chip
                  size="small"
                  label={`ถึง: ${filters.dateTo}`}
                  onDelete={() => handleDateToChange('')}
                  sx={{ bgcolor: theme.palette.grey[100] }}
                />
              )}
              <IconButton size="small" onClick={clearFilters} sx={{ ml: 1 }}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  )
}
