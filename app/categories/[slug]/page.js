import CategoryProductListing from "@/app/_components/CategoryProductListing";
import { fetchDataFromApi } from "@/app/_utils/strapiFetcher";
import React from "react";

// dynamic meta data
export async function generateMetadata({ params }) {
  const { slug } = await params;

  return { title: `Category | ${slug}` };
}

// generate static params
export async function generateStaticParams() {
  const categories = await fetchDataFromApi("/api/categories");

  const categorySlugs = categories?.map((category) => ({
    category: String(category?.slug),
  }));

  return categorySlugs;
}

export default async function Page({ params }) {
  const { slug } = await params;

  const products = await fetchDataFromApi(
    "/api/products?populate=*&pagination[limit]=100",
  );

  return (
    <div className="mx-auto min-h-screen w-[85%]">
      <CategoryProductListing products={products} slug={slug} />
    </div>
  );
}
