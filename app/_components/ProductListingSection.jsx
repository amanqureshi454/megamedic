"use client";
import React, { useState } from "react";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductGrid from "./ProductGrid";
import ToggleFilter from "./ToggleFilter";
import { useFilter } from "../_context/FilterProvider";

export default function ProductListingSection({ products }) {
  const { filterSelectedValues } = useFilter();
  const [showFilter, setShowFlter] = useState(false);
  const filteredProducts = products.filter((product) => {
    if (filterSelectedValues?.length === 0) {
      return true; // Show all products when no filter is selected
    }

    const partnerSlugs = product.partners?.map((p) => p.slug) || [];
    const categorySlugs = product.categories?.map((c) => c.slug) || [];

    // Check if any selected filter matches partners or categories
    return filterSelectedValues.some(
      (selected) =>
        partnerSlugs.includes(selected) || categorySlugs.includes(selected),
    );
  });

  return (
    <div className="text-darkblue mt-20">
      <h1 className="text-3xl sm:text-6xl md:ml-[276px]">Products</h1>
      <div className="my-10 mb-48 grid grid-cols-1 items-start gap-4 sm:my-20 md:grid-cols-[250px_1fr]">
        <ToggleFilter setShowFlter={setShowFlter} />
        <ProductFilterSidebar showFilter={showFilter} />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
