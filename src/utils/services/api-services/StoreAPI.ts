import { DefaultOperatingHour, Holiday, Store } from "@/interfaces/Store";
import APIServices from "../APIServices";
import { initialChangePassword, ChangePassword } from "@/interfaces/User";

export const API_BASE_URL = "/api/store";
export const HOLIDAY_API_URL = `${API_BASE_URL}/holidays`;

export const storeService = {

    async getStore() {
        try {
            let data: any = await APIServices.get1only(`${API_BASE_URL}`);
            return { success: true, message: data.message, data: data.data };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data.message || "เกิดข้อผิดพลาด" };
        }
    },

    async getTimeSetting() {
        try {
            let data: any = await APIServices.get1only(`${API_BASE_URL}/operating-hours`);
            return { success: true, message: data.message, data: data.data };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data.message || "เกิดข้อผิดพลาด" };
        }
    },


    async updatePassword(password: ChangePassword) {
        try {
            let data: any = await APIServices.patch(`${API_BASE_URL}/change-password`, password);
            return { success: true, message: data.message, data: data.data };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data.message || "เกิดข้อผิดพลาด" };
        }
    },

    async updateStore(Store: Store) {
        try {
            let data: any = await APIServices.patch(API_BASE_URL, Store);
            return { success: true, message: data.message, data: data.data };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data.message || "เกิดข้อผิดพลาด" };
        }
    },

    async updateTimeSettingStore(operatingHour: DefaultOperatingHour) {
        try {
            let data: any = await APIServices.patch(`${API_BASE_URL}/operating-hours`, operatingHour);
            return { success: true, message: data.message, data: data.data };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data.message || "เกิดข้อผิดพลาด" };
        }
    },

    async updateLineSettingStore(Store: Store) {
        try {
            let data: any = await APIServices.patch(`${API_BASE_URL}/line`, Store);
            return { success: true, message: data.message, data: data.data };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data.message || "เกิดข้อผิดพลาด" };
        }
    },

    async createStore(Store: Store) {
        try {
            let data: any = await APIServices.post(API_BASE_URL, Store);
            return { success: true, message: data.message, data: data.data };
        } catch (error: any) {
            console.log('error')
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data.message || "เกิดข้อผิดพลาด" };
        }
    },

    async deleteStore(storeId: string) {
        try {
            const response: any = await APIServices.delete(`${API_BASE_URL}?storeId=${storeId}`);
            return { success: true, message: `ระบบได้ลบ ${response.storeName} แล้ว` };
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request cancelled");
            }
            return { success: false, message: error.response?.data.message || "เกิดข้อผิดพลาด" };
        }
    },


    // --------------------------------------------------------------------------
    // HOLIDAY METHOD: ดึงข้อมูล
    // --------------------------------------------------------------------------

    async getHolidays(page: number = 1, limit: number = 10) {
        try {
            let data: any = await APIServices.get(`${HOLIDAY_API_URL}?page=${page}&limit=${limit}`);
            return { success: true, data: data.data, metadata: data.metadata };
        } catch (error: any) {
            this.handleError(error);
            return { success: false, message: error.response?.data.message || "ไม่สามารถดึงข้อมูลได้" };
        }
    },

    // 2. ดึงข้อมูลรายรายการ (โดยใช้ ID)
    async getHoliday(id: string) {
        try {
            let data: any = await APIServices.get(`${HOLIDAY_API_URL}/${id}`);
            return { success: true, data: data };
        } catch (error: any) {
            this.handleError(error);
            return { success: false, message: error.response?.data.message || "ไม่พบข้อมูลวันหยุด" };
        }
    },

    // 3. เพิ่มวันหยุดใหม่
    async createHoliday(holidayData: Holiday) {
        try {
            let data: any = await APIServices.post(`${HOLIDAY_API_URL}`, holidayData);
            return { success: true, message: "เพิ่มวันหยุดสำเร็จ", data: data };
        } catch (error: any) {
            this.handleError(error);
            return { success: false, message: error.response?.data.message || "ไม่สามารถเพิ่มวันหยุดได้" };
        }
    },

    // 4. อัปเดตข้อมูลวันหยุด
    async updateHoliday(id: string, holidayData: Partial<Holiday>) {
        try {
            let data: any = await APIServices.patch(`${HOLIDAY_API_URL}/${id}`, holidayData);
            return { success: true, message: "อัปเดตข้อมูลสำเร็จ", data: data };
        } catch (error: any) {
            this.handleError(error);
            return { success: false, message: error.response?.data.message || "ไม่สามารถอัปเดตข้อมูลได้" };
        }
    },

    // 5. ลบวันหยุด
    async deleteHoliday(id: string) {
        try {
            let data: any = await APIServices.delete(`${HOLIDAY_API_URL}/${id}`);
            return { success: true, message: "ลบข้อมูลสำเร็จ" };
        } catch (error: any) {
            this.handleError(error);
            return { success: false, message: error.response?.data.message || "ไม่สามารถลบข้อมูลได้" };
        }
    },

    // Helper สำหรับจัดการ Error พื้นฐาน
    handleError(error: any) {
        if (error.name === "AbortError") {
            console.log("Request cancelled");
        } else {
            console.error("API Error:", error);
        }
    }
};