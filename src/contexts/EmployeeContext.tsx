// contexts/EmployeeContext.tsx

"use client";

import {
  Employee,
  EmployeeSelect,
  initialEmployee,
  // initialemployee,
  // employeeSelect,
} from "@/interfaces/Store";
import { faker } from "@faker-js/faker";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

// กำหนดประเภทของ Context
interface EmployeeContextProps {
  employees: Employee[];
  setEmployees: Dispatch<React.SetStateAction<Employee[]>>;
  employeeForm: Employee;
  setEmployeeForm: Dispatch<React.SetStateAction<Employee>>;
  employeeEdit: boolean;
  setEmployeeEdit: Dispatch<React.SetStateAction<boolean>>;
  // setTypeForm: Dispatch<React.SetStateAction<Employee>>;
  setEmployeeSelect: Dispatch<React.SetStateAction<EmployeeSelect[]>>;
  employeeSelect: EmployeeSelect[];
}

// สร้าง Context
const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeSelect, setEmployeeSelect] = useState<
    EmployeeSelect[]
  >([]);
  const [employeeForm, setEmployeeForm] = useState<Employee>(initialEmployee)
  const [employeeEdit, setEmployeeEdit] = useState<boolean>(false);

  useEffect(() => {
    // setemployeeForm({
    //   ...employeeForm,
    //   employeeId: "",
    //   employeeName: faker.company.name(),
    //   employeeDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
    // setTypeForm({
    //   ...typeForm,
    //   EmployeeId: "",
    //   EmployeeName: faker.finance.currencyCode(),
    //   EmployeeDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        employeeForm,
        setEmployeeForm,
        employeeEdit,
        setEmployeeEdit,
        employeeSelect,
        setEmployeeSelect
        // employeeSelectState,
        // setemployeeSelectState,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext must be used within a EmployeeProvider");
  }
  return context;
};
