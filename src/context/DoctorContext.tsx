import React, { createContext, useContext, useState } from "react";
import { Doctor } from "../data/doctor.types";
import { doctorService } from "../data/doctor.service";

type DoctorContextType = {
  doctors: Doctor[];
  searchDoctors: (query: string) => void;
  filterDoctors: (category: string) => void;
};

const DoctorContext = createContext<DoctorContextType | null>(null);

export const DoctorProvider = ({ children }: any) => {
  const [doctors, setDoctors] = useState(doctorService.getAll());

  const searchDoctors = (query: string) => {
    if (!query) return setDoctors(doctorService.getAll());
    setDoctors(doctorService.search(query));
  };

  const filterDoctors = (category: string) => {
    setDoctors(doctorService.filterByCategory(category));
  };

  return (
    <DoctorContext.Provider
      value={{ doctors, searchDoctors, filterDoctors }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = () => {
  const ctx = useContext(DoctorContext);
  if (!ctx) throw new Error("DoctorProvider missing");
  return ctx;
};
