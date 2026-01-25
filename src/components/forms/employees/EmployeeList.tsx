"use client"

import type React from "react"

import { Box, Button, Typography, Pagination, CircularProgress, Grid2 } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { EmployeeCard } from "./EmployeeCard"
import { Employee } from "@/interfaces/Store"
import { PaginationMeta } from "@/interfaces/Types"
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";


interface EmployeeListProps {
  employees: Employee[]
  pagination: PaginationMeta
  onPageChange: (page: number) => void
  onEdit: (employeeId: string) => void
  onDelete: (employeeId: string) => void
  onToggleStatus?: (employeeId: string, active: boolean) => void
  loading?: boolean
}

export function EmployeeList({
  employees,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
  onToggleStatus,
  loading,
}: EmployeeListProps) {
  const theme = useTheme()
    const router = useRouter();
    const localActive = useLocale();

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page)
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!employees || employees.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
          ไม่พบรายการพนักงาน
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1, mb: 5 }}>
          คลิกปุ่ม "เพิ่มพนักงานใหม่" เพื่อเริ่มต้น
        </Typography>

        {/* <NotFound/> */}

        

            <Button
              variant="contained"
              color="warning"
              onClick={() =>
          router.push(`/${localActive}/protected/admin/employees/new`)
        }
              style={{
                // background: '#fff',
                // color: 'palette.primary.main',
                borderRadius: "50%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                padding: "16px",
                minWidth: "56px",
                minHeight: "56px",
              }}
            >
              <Add />
            </Button>
      </Box>
    )
  }

  return (
    <Box>
      {/* Employees Grid */}
      <Grid2 container spacing={3}>
        {employees.map((employee) => (
          <Grid2 size={{xs: 12, sm: 6, md:4}} key={employee.id}>
            <EmployeeCard employee={employee} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
          </Grid2>
        ))}
      </Grid2>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            แสดง {employees.length} จาก {pagination.totalItems} รายการ
          </Typography>
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
                "&:hover": {
                  backgroundColor: `${theme.palette.primary.main}10`,
                },
              },
              "& .Mui-selected": {
                backgroundColor: `${theme.palette.primary.main} !important`,
                color: `${theme.palette.primary.contrastText} !important`,
              },
            }}
          />
        </Box>
      )}
    </Box>
  )
}
