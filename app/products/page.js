import React from "react";
import ProductListingSection from "../_components/ProductListingSection";
import { fetchDataFromApi } from "../_utils/strapiFetcher";

export const revalidate = 0;
export default async function Page() {
  const data = await fetchDataFromApi(
    "/api/products?populate=*&pagination[limit]=100",
  );
  return (
    <div className="mx-auto min-h-screen w-[85%]">
      <ProductListingSection products={data} />
    </div>
  );
}
