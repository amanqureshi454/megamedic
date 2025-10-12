"use client";

import LenisProvider from "./_components/LenisProvider";
import NavProvider from "./_context/NavProvider";
import FilterProvider from "./_context/FilterProvider";
import ScrollToTop from "./_components/ScrollToTop";

export default function Providers({ children }) {
  return (
    <LenisProvider>
      <NavProvider>
        <FilterProvider>
          <ScrollToTop />
          {children}
        </FilterProvider>
      </NavProvider>
    </LenisProvider>
  );
}
