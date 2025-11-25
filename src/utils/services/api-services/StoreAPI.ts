import { Store } from "@/interfaces/Store";
import APIServices from "../APIServices";

export const EMPLOYEE_API_BASE_URL = "/api/store";

export const storeService = {

    async getStore(storeId: string) {
        try {
            let data: any = await APIServices.get(`${EMPLOYEE_API_BASE_URL}?storeId=${storeId}`);
            return { success: true, message: data.message };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async getSelectStore() {
        try {
            let data: any = await APIServices.get(`${EMPLOYEE_API_BASE_URL}?selectStore=true`);
            return { success: true, message: data.message };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async updateStore(Store: Store) {
        try {
            let data: any = await APIServices.patch(EMPLOYEE_API_BASE_URL, Store);
            return { success: true, message: data.message };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async createStore(Store: Store) {
        try {
            let data: any = await APIServices.post(EMPLOYEE_API_BASE_URL, Store);
            return { success: true, message: data.message };
        } catch (error: any) {
            console.log('error')
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data || "เกิดข้อผิดพลาด" };
        }
    },

    async deleteStore(storeId: string) {
        try {
            const response: any = await APIServices.delete(`${EMPLOYEE_API_BASE_URL}?storeId=${storeId}`);
            return { success: true, message: `ระบบได้ลบ ${response.storeName} แล้ว` };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.message || "เกิดข้อผิดพลาด" };
        }
    },
};