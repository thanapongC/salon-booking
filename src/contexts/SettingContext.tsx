// contexts/SettingContext.tsx

"use client";

import {
  Category,
  initialCategory,
  EquipmentType,
  initialEquipmentType,
  CategorySelect,
  TypeSelect,
} from "@/interfaces/Category";
import { Store } from "@/interfaces/Store";
import { faker } from "@faker-js/faker";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

export const initialStore: Store = {
  id: '',
  storeName: '',
  storeUsername: '',
  weeklyHolidays: [], // ไม่มีวันหยุดประจำสัปดาห์เริ่มต้น
  defaultOpenTime: '09:00',
  defaultCloseTime: '18:00',
  lineNotifyToken: undefined,
  lineChannelId: undefined,
  lineChannelSecret: undefined,
  userId: '',
  user: undefined,
  employees: undefined,
  services: undefined,
  bookings: undefined,
  operatingHours: undefined,
  notifications: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// กำหนดประเภทของ Context
interface SettingContextProps {
  categoryState: Category[];
  setCategoryState: Dispatch<React.SetStateAction<Category[]>>;
  categoryForm: Category;
  setCategoryForm: Dispatch<React.SetStateAction<Category>>;
  categoryEdit: boolean;
  setCategoryEdit: Dispatch<React.SetStateAction<boolean>>;
  typeState: EquipmentType[];
  setTypeState: Dispatch<React.SetStateAction<EquipmentType[]>>;
  typeForm: EquipmentType;
  setTypeForm: Dispatch<React.SetStateAction<EquipmentType>>;
  setCategorySelectState: Dispatch<React.SetStateAction<CategorySelect[]>>;
  categorySelectState: CategorySelect[];
  setTypeSelectState: Dispatch<React.SetStateAction<TypeSelect[]>>;
  typeSelectState: TypeSelect[];
  setTypeEdit: Dispatch<React.SetStateAction<boolean>>;
  typeEdit: boolean;
}

// สร้าง Context
const SettingContext = createContext<SettingContextProps | undefined>(
  undefined
);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [categoryState, setCategoryState] = useState<Category[]>([]);
  const [categorySelectState, setCategorySelectState] = useState<
    CategorySelect[]
  >([]);
  const [typeSelectState, setTypeSelectState] = useState<TypeSelect[]>([]);
  const [categoryForm, setCategoryForm] = useState<Category>(initialCategory);
  const [categoryEdit, setCategoryEdit] = useState<boolean>(false);
  const [typeState, setTypeState] = useState<EquipmentType[]>([]);
  const [typeForm, setTypeForm] = useState<EquipmentType>(initialEquipmentType);
  const [typeEdit, setTypeEdit] = useState<boolean>(false);

  useEffect(() => {
    // setCategoryForm({
    //   ...categoryForm,
    //   categoryId: "",
    //   categoryName: faker.company.name(),
    //   categoryDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
    // setTypeForm({
    //   ...typeForm,
    //   equipmentTypeId: "",
    //   equipmentTypeName: faker.finance.currencyCode(),
    //   equipmentTypeDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
  }, []);

  return (
    <SettingContext.Provider
      value={{
        categoryState,
        setCategoryState,
        categoryForm,
        setCategoryForm,
        categoryEdit,
        setCategoryEdit,
        typeState,
        setTypeState,
        typeForm,
        setTypeForm,
        typeEdit,
        setTypeEdit,
        categorySelectState,
        setCategorySelectState,
        typeSelectState,
        setTypeSelectState,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useSettingContext = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSettingContext must be used within a SettingProvider");
  }
  return context;
};
