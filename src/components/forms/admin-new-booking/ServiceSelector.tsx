"use client";

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useTheme,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Service } from "@/components/lib/admin-booking";

interface ServiceSelectorProps {
  services: Service[];
  value: string;
  onChange: (serviceId: string) => void;
  error?: string;
}

export function ServiceSelector({ services, value, onChange, error }: ServiceSelectorProps) {
  const theme = useTheme();
  const selectedService = services.find((s) => s.id === value);

  // Group services by category
  const groupedServices = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, Service[]>
  );

  return (
    <Box>
      <FormControl fullWidth error={!!error}>
        <InputLabel>เลือกบริการ *</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="เลือกบริการ *"
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 400 },
            },
          }}
        >
          {Object.entries(groupedServices).map(([category, categoryServices]) => [
            <MenuItem
              key={`cat-${category}`}
              disabled
              sx={{
                fontWeight: 700,
                bgcolor: theme.palette.grey[100],
                color: theme.palette.text.primary,
                "&.Mui-disabled": {
                  opacity: 1,
                },
              }}
            >
              {category}
            </MenuItem>,
            ...categoryServices.map((service) => (
              <MenuItem key={service.id} value={service.id} sx={{ pl: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                  <Typography>{service.name}</Typography>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip
                      size="small"
                      icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                      label={`${service.duration} นาที`}
                      sx={{ height: 24 }}
                    />
                    <Typography variant="body2" color="primary" fontWeight={600}>
                      {service.price.toLocaleString()} บาท
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            )),
          ])}
        </Select>
        {error && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
            {error}
          </Typography>
        )}
      </FormControl>

      {selectedService && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: theme.palette.primary.main + "08",
            borderRadius: 2,
            border: `1px solid ${theme.palette.primary.main}20`,
          }}
        >
          <Typography variant="subtitle2" color="primary" fontWeight={600}>
            {selectedService.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              ระยะเวลา: {selectedService.duration} นาที
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ราคา: {selectedService.price.toLocaleString()} บาท
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
