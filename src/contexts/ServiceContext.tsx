// contexts/ServiceContext.tsx

"use client";

import {
  Category,
  initialCategory,
  EquipmentType,
  initialEquipmentType,
  CategorySelect,
  TypeSelect,
} from "@/interfaces/Category";
import { Service } from "@/interfaces/Store";
import { faker } from "@faker-js/faker";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

export const initialService: Service = {
  id: '',
  name: '', // เช่น "ตัดผม 30 นาที"
  durationMinutes: 30, // กำหนดค่าเริ่มต้น
  price: undefined, // หรือ 0.00
  storeId: '',
  store: undefined,
  employees: undefined,
  employeeIds: [],
  bookings: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// กำหนดประเภทของ Context
interface ServiceContextProps {
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
const ServiceContext = createContext<ServiceContextProps | undefined>(
  undefined
);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
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
    <ServiceContext.Provider
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
    </ServiceContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};
