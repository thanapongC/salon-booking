"use client";

import {
  Card,
  CardContent,
  TextField,
  Typography,
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CUSTOMER_TYPES } from "@/components/lib/customer";
import { CustomerType } from "@prisma/client";

interface CustomerFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  // filterType: CustomerType;
  // onFilterTypeChange: (value: CustomerType) => void;
  filteredCount: number;
  totalCount: number;
}

export function CustomerFilters({
  searchQuery,
  onSearchChange,
  // filterType,
  // onFilterTypeChange,
  filteredCount,
  totalCount,
}: CustomerFiltersProps) {
  return (
    <Card sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              placeholder="ค้นหาชื่อ, เบอร์โทร, LINE ID..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>ประเภทลูกค้า</InputLabel>
              <Select
                // value={filterType}
                label="ประเภทลูกค้า"
                // onChange={(e) => onFilterTypeChange(e.target.value as CustomerType)}
              >
                {CUSTOMER_TYPES.map((type: any) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Typography variant="body2" color="text.secondary">
              แสดง {filteredCount} จาก {totalCount} รายการ
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
}
