"use client"

import { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  useTheme,
  Snackbar,
  Alert,
  Grid,
  InputAdornment,
} from "@mui/material"
import { Save as SaveIcon } from "@mui/icons-material"
import type { BookingRule } from "@/types/settings"

export default function BookingRulesSettings() {
  const theme = useTheme()
  const [snackbar, setSnackbar] = useState({ open: false, message: "" })
  const [rules, setRules] = useState<BookingRule>({
    minAdvanceHours: 2,
    maxAdvanceDays: 30,
    minCancelHours: 24,
    allowCustomerCancel: true,
    maxBookingsPerPhone: 3,
  })

  const handleSave = () => {
    setSnackbar({ open: true, message: "บันทึกกฎการจองสำเร็จ" })
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Box
          component="h2"
          sx={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: theme.palette.primary.main,
            mb: 0.5,
          }}
        >
          กฎการจอง
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: "0.875rem",
            color: theme.palette.text.secondary,
          }}
        >
          กำหนดกฎและข้อจำกัดในการจองเพื่อควบคุมระบบให้มีระเบียบ
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                การจองล่วงหน้า
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  label="จองล่วงหน้าขั้นต่ำ"
                  type="number"
                  value={rules.minAdvanceHours}
                  onChange={(e) => setRules({ ...rules, minAdvanceHours: Number(e.target.value) })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ชั่วโมง</InputAdornment>,
                  }}
                  fullWidth
                  helperText="ลูกค้าต้องจองล่วงหน้าอย่างน้อยกี่ชั่วโมง"
                />

                <TextField
                  label="จองล่วงหน้าสูงสุด"
                  type="number"
                  value={rules.maxAdvanceDays}
                  onChange={(e) => setRules({ ...rules, maxAdvanceDays: Number(e.target.value) })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">วัน</InputAdornment>,
                  }}
                  fullWidth
                  helperText="จำกัดการจองล่วงหน้าสูงสุดกี่วัน"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                การยกเลิกคิว
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  label="ยกเลิกล่วงหน้าขั้นต่ำ"
                  type="number"
                  value={rules.minCancelHours}
                  onChange={(e) => setRules({ ...rules, minCancelHours: Number(e.target.value) })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ชั่วโมง</InputAdornment>,
                  }}
                  fullWidth
                  helperText="ลูกค้าต้องยกเลิกล่วงหน้าอย่างน้อยกี่ชั่วโมง"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={rules.allowCustomerCancel}
                      onChange={(e) => setRules({ ...rules, allowCustomerCancel: e.target.checked })}
                    />
                  }
                  label="อนุญาตให้ลูกค้ายกเลิกคิวเอง"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                จำกัดการจอง
              </Box>

              <TextField
                label="จำนวนคิวสูงสุดต่อเบอร์โทร"
                type="number"
                value={rules.maxBookingsPerPhone}
                onChange={(e) => setRules({ ...rules, maxBookingsPerPhone: Number(e.target.value) })}
                InputProps={{
                  endAdornment: <InputAdornment position="end">คิว</InputAdornment>,
                }}
                fullWidth
                helperText="จำกัดจำนวนคิวที่จองได้ต่อหนึ่งเบอร์โทร"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            bgcolor: theme.palette.primary.main,
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
            },
            px: 4,
          }}
        >
          บันทึกการตั้งค่า
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
