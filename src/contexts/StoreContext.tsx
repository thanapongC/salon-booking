// contexts/StoreContext.tsx

"use client";

import {
  Store,
  initialStore,
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
  // setTypeForm: Dispatch<React.SetStateAction<Store>>;
  // setStoreSelectState: Dispatch<React.SetStateAction<StoreSelect[]>>;
  // StoreSelectState: StoreSelect[];
}

// สร้าง Context
const StoreContext = createContext<StoreContextProps | undefined>(
  undefined
);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [Stores, setStores] = useState<Store[]>([]);
  // const [StoreSelectState, setStoreSelectState] = useState<
  //   StoreSelect[]
  // >([]);
  const [StoreForm, setStoreForm] = useState<Store>(initialStore)
  const [StoreEdit, setStoreEdit] = useState<boolean>(false);

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
        // StoreSelectState,
        // setStoreSelectState,
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
