import { Service } from "@/interfaces/Store";
import APIServices from "../APIServices";

export const EMPLOYEE_API_BASE_URL = "/api/services";

export const serviceService = {

    async getService(serviceId: string) {
        try {
            let data: any = await APIServices.get(`${EMPLOYEE_API_BASE_URL}?serviceId=${serviceId}`);
            return { success: true, message: data.message };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async getSelectService() {
        try {
            let data: any = await APIServices.get(`${EMPLOYEE_API_BASE_URL}?selectService=true`);
            return { success: true, message: data.message };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async updateService(service: Service) {
        try {
            let data: any = await APIServices.patch(EMPLOYEE_API_BASE_URL, service);
            return { success: true, message: data.message };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async createService(service: Service) {
        try {
            let data: any = await APIServices.post(`${EMPLOYEE_API_BASE_URL}`, service);
            return { success: true, message: data?.message };
        } catch (error: any) {
            console.log(error.response.data)
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response.data?.message || "เกิดข้อผิดพลาด" };
        }
    },

    async deleteService(serviceId: string) {
        try {
            const response: any = await APIServices.delete(`${EMPLOYEE_API_BASE_URL}?serviceId=${serviceId}`);
            return { success: true, message: `ระบบได้ลบ ${response.serviceName} แล้ว` };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.message || "เกิดข้อผิดพลาด" };
        }
    },
};