"use client";

import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Menu,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu'
import DownloadIcon from '@mui/icons-material/Download'
import ScheduleIcon from '@mui/icons-material/Schedule'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import TableChartIcon from '@mui/icons-material/TableChart'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'


import PageContainer from "@/components/container/PageContainer";
import { useTranslations } from "next-intl";
import BaseCard from "@/components/shared/BaseCard";
import { useEffect, useMemo, useState } from "react";
import { useBreadcrumbContext } from "@/contexts/BreadcrumbContext";
import ReportExport from "@/components/forms/reports/ReportExport";
import ReportPreview from "@/components/forms/reports/ReportPreview";
import ReportCharts from "@/components/forms/reports/ReportCharts";
import ReportEmptyState from "@/components/forms/reports/ReportEmptyState";
import ReportFiltersComponent from "@/components/forms/reports/ReportFilters";
import ReportPresets from "@/components/forms/reports/ReportPresets";
import { ReportFilters } from "@/components/lib/reports";
import { defaultPresets, generateReportSummary, generateRevenueChartData, generateServiceChartData, generateStaffChartData, mockReportData } from "@/components/lib/reports-data";
import ReportSummaryComponent from "@/components/forms/reports/ReportSummary";

const Report = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const [filters, setFilters] = useState<ReportFilters>({
    reportType: 'revenue',
    staffId: 'all',
    groupBy: 'day',
    dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    dateTo: new Date().toISOString().split('T')[0],
    exportFormat: 'xlsx',
    customerType: 'all',
    popularServiceOnly: false,
  })

  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null)
  const [autoExportMenuAnchor, setAutoExportMenuAnchor] = useState<null | HTMLElement>(null)
  const { setBreadcrumbs } = useBreadcrumbContext();

    // Filter data based on filters
  const filteredData = useMemo(() => {
    let data = [...mockReportData]

    // Filter by customer type
    if (filters.customerType !== 'all') {
      data = data.filter(d => d.customerType === filters.customerType)
    }

    // Filter by staff
    if (filters.staffId !== 'all') {
      // Mock filter - in real app would match staff ID
      data = data.filter(d => d.staffName.includes('Sarah') || filters.staffId === '1')
    }

    // Filter by report type
    if (filters.reportType === 'no-show') {
      data = data.filter(d => d.status === 'no-show')
    }

    // Filter by date range
    data = data.filter(d => {
      const date = new Date(d.date)
      const from = new Date(filters.dateFrom)
      const to = new Date(filters.dateTo)
      return date >= from && date <= to
    })

    return data
  }, [filters])

  const summary = useMemo(() => generateReportSummary(filteredData), [filteredData])
  const revenueChartData = useMemo(() => generateRevenueChartData(filteredData), [filteredData])
  const serviceChartData = useMemo(() => generateServiceChartData(filteredData), [filteredData])
  const staffChartData = useMemo(() => generateStaffChartData(filteredData), [filteredData])

  const handleFiltersChange = (newFilters: ReportFilters) => {
    setFilters(newFilters)
    setHasSearched(true)
  }

  const handlePresetSelect = (presetFilters: ReportFilters) => {
    setFilters(presetFilters)
    setHasSearched(true)
  }

  const handleSelectPresetById = (presetId: string) => {
    const preset = defaultPresets.find(p => p.id === presetId)
    if (preset) {
      setFilters(preset.filters)
      setHasSearched(true)
    }
  }

  const handleExport = (format: 'xlsx' | 'csv' | 'pdf') => {
    setIsLoading(true)
    setExportMenuAnchor(null)
    
    // Simulate export
    setTimeout(() => {
      setIsLoading(false)
      // setSnackbar({
      //   open: true,
      //   message: `ดาวน์โหลดรายงานในรูปแบบ ${format.toUpperCase()} สำเร็จ`,
      //   severity: 'success',
      // })
    }, 1500)
  }

  const handleAutoExport = (schedule: 'daily' | 'weekly' | 'monthly') => {
    setAutoExportMenuAnchor(null)
    // setSnackbar({
    //   open: true,
    //   message: `ตั้งค่า Export อัตโนมัติ${schedule === 'daily' ? 'รายวัน' : schedule === 'weekly' ? 'รายสัปดาห์' : 'รายเดือน'}สำเร็จ`,
    //   severity: 'success',
    // })
  }


  useEffect(() => {
    setBreadcrumbs([
      { name: "หน้าแรก", href: "/dashboard" },
      { name: "รายงาน", href: "" },
    ]);
    return () => {
      setBreadcrumbs([]);
    };
  }, []);

  return (
    <PageContainer title="" description="">
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, overflow: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
              รายงาน
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Auto Export Button */}
            <Button
              variant="outlined"
              startIcon={<ScheduleIcon />}
              onClick={(e) => setAutoExportMenuAnchor(e.currentTarget)}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              Export อัตโนมัติ
            </Button>
            <Menu
              anchorEl={autoExportMenuAnchor}
              open={Boolean(autoExportMenuAnchor)}
              onClose={() => setAutoExportMenuAnchor(null)}
            >
              <MenuItem onClick={() => handleAutoExport('daily')}>
                <ListItemText primary="รายวัน" secondary="ส่งรายงานทุกวันเวลา 08:00" />
              </MenuItem>
              <MenuItem onClick={() => handleAutoExport('weekly')}>
                <ListItemText primary="รายสัปดาห์" secondary="ส่งรายงานทุกวันจันทร์" />
              </MenuItem>
              <MenuItem onClick={() => handleAutoExport('monthly')}>
                <ListItemText primary="รายเดือน" secondary="ส่งรายงานวันที่ 1 ของเดือน" />
              </MenuItem>
            </Menu>

            {/* Export Button */}
            <Button
              variant="contained"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
              onClick={(e) => setExportMenuAnchor(e.currentTarget)}
              disabled={!hasSearched || filteredData.length === 0 || isLoading}
              sx={{ bgcolor: theme.palette.primary.main }}
            >
              {isLoading ? 'กำลังดาวน์โหลด...' : 'ดาวน์โหลด'}
            </Button>
            <Menu
              anchorEl={exportMenuAnchor}
              open={Boolean(exportMenuAnchor)}
              onClose={() => setExportMenuAnchor(null)}
            >
              <MenuItem onClick={() => handleExport('xlsx')}>
                <ListItemIcon>
                  <TableChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Excel (.xlsx)" />
              </MenuItem>
              <MenuItem onClick={() => handleExport('csv')}>
                <ListItemIcon>
                  <InsertDriveFileIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="CSV (.csv)" />
              </MenuItem>
              <MenuItem onClick={() => handleExport('pdf')}>
                <ListItemIcon>
                  <PictureAsPdfIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="PDF (.pdf)" />
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Presets */}
        <ReportPresets currentFilters={filters} onPresetSelect={handlePresetSelect} />

        {/* Filters */}
        <ReportFiltersComponent filters={filters} onFiltersChange={handleFiltersChange} />

        {/* Content */}
        {!hasSearched ? (
          <ReportEmptyState onSelectPreset={handleSelectPresetById} />
        ) : filteredData.length === 0 ? (
          <ReportEmptyState onSelectPreset={handleSelectPresetById} />
        ) : (
          <>
            {/* Summary */}
            <ReportSummaryComponent summary={summary} />

            {/* Charts */}
            <ReportCharts
              revenueData={revenueChartData}
              serviceData={serviceChartData}
              staffData={staffChartData}
            />

            {/* Preview */}
            <ReportPreview data={filteredData} />
          </>
        )}

      </Box>
    </Box>
    </PageContainer>
  );
};

export default Report;
