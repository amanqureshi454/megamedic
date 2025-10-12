"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCategories } from "../_lib/categoriesApi";
import { getPartners } from "../_lib/partnerApi";
import { usePathname } from "next/navigation";

const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [filterSelectedValues, setFilterSelectedValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [partners, setPartners] = useState([]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const pathname = usePathname();

  const updateFilterValues = (updaterFn) => {
    setHasUserInteracted(true);
    setFilterSelectedValues(updaterFn);
  };

  // 👇 Extract slug after /categories/
  const categorySlug = pathname.startsWith("/categories/")
    ? pathname.split("/categories/")[1]?.split("/")[0]
    : null;

  // ✅ Set slug as default filter
  // useEffect(() => {
  //   if (
  //     pathname.startsWith("/categories/") &&
  //     categorySlug &&
  //     filterSelectedValues.length === 0 &&
  //     !hasUserInteracted // ✅ block auto-apply if user acted
  //   ) {
  //     setFilterSelectedValues([categorySlug]);
  //   }
  // }, [pathname, categorySlug, filterSelectedValues, hasUserInteracted]);

  // ✅ Set slug as default filter when user visits a category page
  useEffect(() => {
    if (
      pathname.startsWith("/categories/") &&
      categorySlug &&
      filterSelectedValues.length === 0 &&
      !hasUserInteracted // ✅ block auto-apply if user acted
    ) {
      setFilterSelectedValues([categorySlug]); // <-- ab sirf yeh slug rakho
    }
  }, [pathname, categorySlug, filterSelectedValues, hasUserInteracted]);

  // Reset filter when user leaves the category page
  useEffect(() => {
    if (!pathname.startsWith("/products/")) {
      setFilterSelectedValues([]);
    }
  }, [pathname]);

  // fetch categories
  useEffect(() => {
    async function getData() {
      const data = await getCategories();
      setCategories(data);
    }
    getData();
  }, [setCategories]);

  // fetch partners
  useEffect(() => {
    async function getData() {
      const data = await getPartners();
      setPartners(data);
    }
    getData();
  }, [setPartners]);
  return (
    <FilterContext.Provider
      value={{
        filterSelectedValues,
        setPartners,
        setFilterSelectedValues: updateFilterValues,
        categories,
        partners,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined)
    return { error: "useFilter must be used inside the Filter provider" };
  return context;
}
