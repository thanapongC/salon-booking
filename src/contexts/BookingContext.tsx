// contexts/BookingContext.tsx

"use client";

import {
  Booking,
  initialBooking,
  // initialbooking,
  // bookingSelect,
} from "@/interfaces/Booking";
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
interface BookingContextProps {
  bookings: Booking[];
  setBookings: Dispatch<React.SetStateAction<Booking[]>>;
  bookingForm: Booking;
  setBookingForm: Dispatch<React.SetStateAction<Booking>>;
  bookingEdit: boolean;
  setBookingEdit: Dispatch<React.SetStateAction<boolean>>;
  // setTypeForm: Dispatch<React.SetStateAction<Booking>>;
  // setbookingSelectState: Dispatch<React.SetStateAction<bookingSelect[]>>;
  // bookingSelectState: bookingSelect[];
}

// สร้าง Context
const BookingContext = createContext<BookingContextProps | undefined>(
  undefined
);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  // const [bookingSelectState, setbookingSelectState] = useState<
  //   bookingSelect[]
  // >([]);
  const [bookingForm, setBookingForm] = useState<Booking>(initialBooking)
  const [bookingEdit, setBookingEdit] = useState<boolean>(false);

  useEffect(() => {
    // setbookingForm({
    //   ...bookingForm,
    //   bookingId: "",
    //   bookingName: faker.company.name(),
    //   bookingDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
    // setTypeForm({
    //   ...typeForm,
    //   BookingId: "",
    //   BookingName: faker.finance.currencyCode(),
    //   BookingDesc: faker.lorem.lines(),
    //   equipments: [],
    // });
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        bookingForm,
        setBookingForm,
        bookingEdit,
        setBookingEdit,
        // bookingSelectState,
        // setbookingSelectState,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
