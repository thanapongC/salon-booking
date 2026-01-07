// contexts/StoreContext.tsx

"use client";

import {
  DefaultOperatingHour,
  Holiday,
  Service,
  ServiceList,
  Store,
  StoreRegister,
  initialHoliday,
  initialOperatingHour,
  initialStore,
  initialStoreRegister,
  // initialStore,
  // StoreSelect,
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
interface StoreContextProps {
  Stores: Store[];
  setStores: Dispatch<React.SetStateAction<Store[]>>;
  StoreForm: Store;
  setStoreForm: Dispatch<React.SetStateAction<Store>>;
  StoreEdit: boolean;
  setStoreEdit: Dispatch<React.SetStateAction<boolean>>;
  setServicesSelect: Dispatch<React.SetStateAction<ServiceList[]>>;
  servicesSelect: ServiceList[];
  setStoreRegister: Dispatch<React.SetStateAction<StoreRegister>>;
  storeRegister: StoreRegister;
  setStoreTime: Dispatch<React.SetStateAction<DefaultOperatingHour>>;
  storeTime: DefaultOperatingHour;
  setHolidays: Dispatch<React.SetStateAction<Holiday>>;
  holidays: Holiday;
  setHolidaysList: Dispatch<React.SetStateAction<Holiday[]>>;
  holidaysList: Holiday[];
}

// สร้าง Context
const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [Stores, setStores] = useState<Store[]>([]);
  const [storeRegister, setStoreRegister] =
    useState<StoreRegister>(initialStoreRegister);
  const [storeTime, setStoreTime] =
    useState<DefaultOperatingHour>(initialOperatingHour);
  const [servicesSelect, setServicesSelect] = useState<ServiceList[]>([]);
  const [StoreForm, setStoreForm] = useState<Store>(initialStore);
  const [StoreEdit, setStoreEdit] = useState<boolean>(false);
  const [holidaysList, setHolidaysList] = useState<Holiday[]>([]);
  const [holidays, setHolidays] = useState<Holiday>(initialHoliday);

  useEffect(() => {
    // setStoreForm({
    //   ...StoreForm,
    //   StoreId: "",
    //   StoreName: faker.company.name(),
    //   StoreDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
    // setTypeForm({
    //   ...typeForm,
    //   StoreId: "",
    //   StoreName: faker.finance.currencyCode(),
    //   StoreDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
  }, []);

  return (
    <StoreContext.Provider
      value={{
        Stores,
        setStores,
        StoreForm,
        setStoreForm,
        StoreEdit,
        setStoreEdit,
        setServicesSelect,
        servicesSelect,
        setStoreRegister,
        storeRegister,
        setStoreTime,
        storeTime,
        setHolidays,
        holidays,
        setHolidaysList,
        holidaysList
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};
