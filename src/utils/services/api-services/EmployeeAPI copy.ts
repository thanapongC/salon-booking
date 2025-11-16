import { Employee } from "@/interfaces/Store";
import APIServices from "../APIServices";

export const EMPLOYEE_API_BASE_URL = "/api/employee";

export const employeeService = {

    async getEmployee(employeeId: string) {
        try {
            let data: any = await APIServices.get(`${EMPLOYEE_API_BASE_URL}?employeeId=${employeeId}`);
            return { success: true, data };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async getSelectEmployee() {
        try {
            let data: any = await APIServices.get(`${EMPLOYEE_API_BASE_URL}?selectEmployee=true`);
            return { success: true, data };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async updateEmployee(employee: Employee) {
        try {
            let data: any = await APIServices.patch(EMPLOYEE_API_BASE_URL, employee);
            return { success: true, message: data.message };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async createEmployee(employee: Employee) {
        try {
            let data: any = await APIServices.post(EMPLOYEE_API_BASE_URL, employee);
            return { success: true, message: data.message };
        } catch (error: any) {
            console.log('error')
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async deleteEmployee(employeeId: string) {
        try {
            const response: any = await APIServices.delete(`${EMPLOYEE_API_BASE_URL}?employeeId=${employeeId}`);
            return { success: true, message: `ระบบได้ลบ ${response.employeeName} แล้ว` };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.message || "เกิดข้อผิดพลาด" };
        }
    },
};