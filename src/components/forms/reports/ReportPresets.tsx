"use client"

import React from "react"

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { ReportFilters, ReportPreset } from "@/components/lib/reports"
import { defaultPresets } from "@/components/lib/reports-data"

interface ReportPresetsProps {
  currentFilters: ReportFilters
  onPresetSelect: (filters: ReportFilters) => void
}

const presetIcons: Record<string, React.ReactNode> = {
  'monthly': <CalendarMonthIcon />,
  'staff-performance': <PersonIcon />,
  'no-show': <EventBusyIcon />,
  'new-customers': <PersonAddIcon />,
}

export default function ReportPresets({ currentFilters, onPresetSelect }: ReportPresetsProps) {
  const theme = useTheme()
  const [presets, setPresets] = useState<ReportPreset[]>(defaultPresets)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [newPresetName, setNewPresetName] = useState('')
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null)

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return

    const newPreset: ReportPreset = {
      id: `custom-${Date.now()}`,
      name: newPresetName,
      filters: currentFilters,
      createdAt: new Date().toISOString(),
    }

    setPresets([...presets, newPreset])
    setNewPresetName('')
    setSaveDialogOpen(false)
  }

  const handleDeletePreset = (id: string) => {
    setPresets(presets.filter(p => p.id !== id))
    if (selectedPresetId === id) {
      setSelectedPresetId(null)
    }
  }

  const handleSelectPreset = (preset: ReportPreset) => {
    setSelectedPresetId(preset.id)
    onPresetSelect(preset.filters)
  }

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BookmarkIcon sx={{ color: theme.palette.primary.main }} />
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                Shortcut รายงาน
              </Typography>
            </Box>
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setSaveDialogOpen(true)}
              sx={{ color: theme.palette.primary.main }}
            >
              บันทึก Preset
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {presets.map((preset) => (
              <Chip
                key={preset.id}
                // icon={presetIcons[preset.id] || <TrendingUpIcon />}
                label={preset.name}
                onClick={() => handleSelectPreset(preset)}
                onDelete={preset.id.startsWith('custom-') ? () => handleDeletePreset(preset.id) : undefined}
                sx={{
                  bgcolor: selectedPresetId === preset.id ? theme.palette.primary.main : theme.palette.grey[100],
                  color: selectedPresetId === preset.id ? 'white' : theme.palette.primary.main,
                  fontWeight: selectedPresetId === preset.id ? 600 : 400,
                  '&:hover': {
                    bgcolor: selectedPresetId === preset.id ? theme.palette.primary.dark : theme.palette.grey[200],
                  },
                  '& .MuiChip-icon': {
                    color: selectedPresetId === preset.id ? 'white' : theme.palette.primary.main,
                  },
                  '& .MuiChip-deleteIcon': {
                    color: selectedPresetId === preset.id ? 'rgba(255,255,255,0.7)' : theme.palette.text.secondary,
                    '&:hover': {
                      color: selectedPresetId === preset.id ? 'white' : theme.palette.error.main,
                    },
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Save Preset Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
          บันทึก Preset รายงาน
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="ชื่อ Preset"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            sx={{ mt: 2 }}
            placeholder="เช่น รายงานยอดขายรายสัปดาห์"
          />
          <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
            Preset จะบันทึกการตั้งค่าตัวกรองปัจจุบันเพื่อใช้งานซ้ำได้อย่างรวดเร็ว
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setSaveDialogOpen(false)}>
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            onClick={handleSavePreset}
            disabled={!newPresetName.trim()}
            sx={{ bgcolor: theme.palette.primary.main }}
          >
            บันทึก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
