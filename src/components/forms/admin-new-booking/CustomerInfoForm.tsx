"use client";

import { Box, Typography, TextField, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

interface CustomerInfoFormProps {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  onChange: (field: string, value: string) => void;
  errors: {
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
  };
}

export function CustomerInfoForm({
  customerName,
  customerPhone,
  customerEmail,
  onChange,
  errors,
}: CustomerInfoFormProps) {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        ข้อมูลลูกค้า
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="ชื่อลูกค้า *"
            fullWidth
            value={customerName}
            onChange={(e) => onChange("customerName", e.target.value)}
            error={!!errors.customerName}
            helperText={errors.customerName}
            slotProps={{
              input: {
                startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.grey[400] }} />,
              },
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            label="เบอร์โทรศัพท์ *"
            fullWidth
            value={customerPhone}
            onChange={(e) => onChange("customerPhone", e.target.value)}
            error={!!errors.customerPhone}
            helperText={errors.customerPhone}
            placeholder="08X-XXX-XXXX"
            slotProps={{
              input: {
                startAdornment: <PhoneIcon sx={{ mr: 1, color: theme.palette.grey[400] }} />,
              },
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            label="อีเมล"
            type="email"
            fullWidth
            value={customerEmail}
            onChange={(e) => onChange("customerEmail", e.target.value)}
            error={!!errors.customerEmail}
            helperText={errors.customerEmail}
            placeholder="example@email.com"
            slotProps={{
              input: {
                startAdornment: <EmailIcon sx={{ mr: 1, color: theme.palette.grey[400] }} />,
              },
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
