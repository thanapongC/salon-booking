"use client";
import { useBookingContext } from "@/contexts/BookingContext";
import { useEmployeeContext } from "@/contexts/EmployeeContext";
import { useNotifyContext } from "@/contexts/NotifyContext";
import { staffMembers } from "@/utils/lib/booking-data";
import APIServices from "@/utils/services/APIServices";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { staffMembers } from "@/lib/booking-data"

interface Step3Props {
  // value?: string
  // onChange?: (value: string) => void
  // serviceType?: "with-staff" | "without-staff"
}

export function Step3EmployeeSelection({}: Step3Props) {
  const params = useParams<{ shop_id: string }>();

  const theme = useTheme();
  const { setEmployees, employees } = useEmployeeContext();
  const { setBookingForm, bookingForm } = useBookingContext();
  const { setNotify } = useNotifyContext();
  const [loading, setLoading] = useState<boolean>(false);

  const getEmployee = async () => {
    try {
      setLoading(true);
      let data: any = await APIServices.get(
        // `/api/employee/public/?store_username=${params.shop_id}&service_id=${bookingForm.serviceId}`,
        `/api/employees/public/?store_username=${params.shop_id}&service_id=695b3f58c8cdfac414cc9335`,
      );
      console.log(data)
      setEmployees(data.data);
    } catch (error: any) {
      setNotify({
        open: true,
        message: error.code,
        color: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployee();
    return () => {
      setEmployees([]);
    };
  }, []);

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
    );
  }

  // if (serviceType === "without-staff") {
  //   return (
  //     <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", textAlign: "center" }}>
  //       <Typography
  //         variant="h5"
  //         sx={{
  //           mb: 1,
  //           fontWeight: 600,
  //           color: "text.primary",
  //         }}
  //       >
  //         Staff member
  //       </Typography>
  //       <Typography variant="body1" sx={{ color: "text.secondary" }}>
  //         You selected any available staff member. We'll assign the best person for your service.
  //       </Typography>
  //     </Box>
  //   )
  // }

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto" }}>
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        เลือกพนักงาน
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 3,
          color: "text.secondary",
        }}
      >
        เลือกพนักงานที่คุณต้องการ
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        {staffMembers.map((staff: any) => (
          <Card
            key={staff.id}
            sx={{
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              // border:
              //   value === staff.id ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.divider}`,
              // backgroundColor: value === staff.id ? theme.palette.action.selected : theme.palette.background.paper,
              // "&:hover": {
              //   borderColor: value === staff.id ? theme.palette.primary.main : theme.palette.primary.light,
              // },
            }}
            // onClick={() => onChange(staff.id)}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  {staff.name.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {staff.name}
                  </Typography>
                  <Chip
                    label={staff.role}
                    size="small"
                    sx={{
                      mt: 0.5,
                      bgcolor: theme.palette.grey[200],
                      color: "text.primary",
                    }}
                  />
                </Box>
                {/* {value === staff.id && (
                  <Box
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      borderRadius: "50%",
                      p: 0.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check size={16} color="white" />
                  </Box>
                )} */}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
