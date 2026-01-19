"use client"

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Chip,
  Grid2,
  Divider,
  useTheme,
  useMediaQuery,
  Collapse,
  IconButton,
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { CustomerType, ExportFormat, GroupBy, ReportFilters, ReportType } from '@/components/lib/reports'
import { staffMembers } from '@/utils/lib/booking-data'
import { groupByLabels, reportTypeLabels } from '@/components/lib/reports-data'

interface ReportFiltersProps {
  filters: ReportFilters
  onFiltersChange: (filters: ReportFilters) => void
}

export default function ReportFiltersComponent({ filters, onFiltersChange }: ReportFiltersProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [expanded, setExpanded] = useState(!isMobile)

  const handleChange = (field: keyof ReportFilters, value: string | boolean) => {
    onFiltersChange({ ...filters, [field]: value })
  }

  const reportTypes: { value: ReportType; label: string }[] = [
    { value: 'booking', label: 'รายงานการจอง' },
    { value: 'revenue', label: 'รายงานรายได้' },
    { value: 'staff', label: 'รายงานพนักงาน' },
    { value: 'service', label: 'รายงานบริการ' },
    { value: 'customer', label: 'รายงานลูกค้า' },
    { value: 'no-show', label: 'รายงานไม่มาตามนัด' },
  ]

  const groupByOptions: { value: GroupBy; label: string }[] = [
    { value: 'day', label: 'รายวัน' },
    { value: 'week', label: 'รายสัปดาห์' },
    { value: 'month', label: 'รายเดือน' },
    { value: 'staff', label: 'ตามพนักงาน' },
    { value: 'service', label: 'ตามบริการ' },
  ]

  const exportFormats: { value: ExportFormat; label: string }[] = [
    { value: 'xlsx', label: 'Excel (.xlsx)' },
    { value: 'csv', label: 'CSV (.csv)' },
    { value: 'pdf', label: 'PDF (.pdf)' },
  ]

  const customerTypes: { value: CustomerType; label: string }[] = [
    { value: 'all', label: 'ลูกค้าทั้งหมด' },
    { value: 'new', label: 'ลูกค้าใหม่' },
    { value: 'returning', label: 'ลูกค้าเก่า' },
  ]

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
              ตัวกรองรายงาน
            </Typography>
          </Box>
          {isMobile && (
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>

        <Collapse in={expanded}>
          <Grid2 container spacing={2}>
            {/* Report Type */}
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>ประเภทรายงาน</InputLabel>
                <Select
                  value={filters.reportType}
                  label="ประเภทรายงาน"
                  onChange={(e) => handleChange('reportType', e.target.value)}
                >
                  {reportTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Staff Selection */}
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>พนักงาน</InputLabel>
                <Select
                  value={filters.staffId}
                  label="พนักงาน"
                  onChange={(e) => handleChange('staffId', e.target.value)}
                >
                  <MenuItem value="all">พนักงานทั้งหมด</MenuItem>
                  {staffMembers.map((staff: any) => (
                    <MenuItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Group By */}
            <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>จัดกลุ่มตาม</InputLabel>
                <Select
                  value={filters.groupBy}
                  label="จัดกลุ่มตาม"
                  onChange={(e) => handleChange('groupBy', e.target.value)}
                >
                  {groupByOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Date From */}
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="ตั้งแต่วันที่"
                value={filters.dateFrom}
                onChange={(e) => handleChange('dateFrom', e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid2>

            {/* Date To */}
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="ถึงวันที่"
                value={filters.dateTo}
                onChange={(e) => handleChange('dateTo', e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid2>

            {/* Export Format */}
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>รูปแบบไฟล์</InputLabel>
                <Select
                  value={filters.exportFormat}
                  label="รูปแบบไฟล์"
                  onChange={(e) => handleChange('exportFormat', e.target.value)}
                >
                  {exportFormats.map((format) => (
                    <MenuItem key={format.value} value={format.value}>
                      {format.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Customer Type */}
            <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>ประเภทลูกค้า</InputLabel>
                <Select
                  value={filters.customerType}
                  label="ประ��ภทลูกค้า"
                  onChange={(e) => handleChange('customerType', e.target.value)}
                >
                  {customerTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            {/* Popular Service Toggle */}
            <Grid2 size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={filters.popularServiceOnly}
                    onChange={(e) => handleChange('popularServiceOnly', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label="แสดงเฉพาะบริการยอดนิยม"
              />
            </Grid2>
          </Grid2>

          {/* Active Filters */}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label={`ประเภท: ${reportTypeLabels[filters.reportType]}`}
              size="small"
              sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}
            />
            <Chip
              label={`จัดกลุ่ม: ${groupByLabels[filters.groupBy]}`}
              size="small"
              sx={{ bgcolor: theme.palette.secondary.main, color: 'white' }}
            />
            {filters.staffId !== 'all' && (
              <Chip
                label={`พนักงาน: ${staffMembers.find((s: any) => s.id === filters.staffId)?.name}`}
                size="small"
                onDelete={() => handleChange('staffId', 'all')}
                sx={{ bgcolor: theme.palette.grey[300] }}
              />
            )}
            {filters.customerType !== 'all' && (
              <Chip
                label={`ลูกค้า: ${filters.customerType === 'new' ? 'ใหม่' : 'เก่า'}`}
                size="small"
                onDelete={() => handleChange('customerType', 'all')}
                sx={{ bgcolor: theme.palette.grey[300] }}
              />
            )}
            {filters.popularServiceOnly && (
              <Chip
                label="บริการยอดนิยม"
                size="small"
                onDelete={() => handleChange('popularServiceOnly', false)}
                sx={{ bgcolor: theme.palette.warning.main, color: theme.palette.primary.main }}
              />
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}
