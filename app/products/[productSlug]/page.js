import ProductPage from "@/app/_components/ProductPage";
import { fetchDataFromApi } from "@/app/_utils/strapiFetcher";
import qs from "qs";
import React from "react";

// dynamic meta data
export async function generateMetadata({ params }) {
  const { productSlug } = await params;

  const productArr = await fetchDataFromApi(
    `/api/products?filters[slug][$eq]=${productSlug}&populate=*`,
  );

  const product = productArr[0];

  return {
    title: `${product?.productTitle}`,
    description: `${product?.metaDescription}`,
  };
}

export async function generateStaticParams() {
  const products = await fetchDataFromApi("/api/products");

  const productSlugs = products?.map((product) => ({
    productSlug: String(product?.slug),
  }));
  return productSlugs;
}

export default async function Page({ params }) {
  const { productSlug } = await params;
  const query = qs.stringify({
    filters: {
      slug: { $eq: productSlug },
    },
    populate: {
      image: true,
      categories: true,
      partners: true,
      specs: {
        populate: {
          image: true,
        },
      },
      company: {
        populate: {
          imageSection: {
            populate: ["image"],
          },
        },
      },
      cta: true,
    },
  });
  const productArr = await fetchDataFromApi(
    `/api/products?${query}`,
    // const productArr = await fetchDataFromApi(
    //   `/api/products?filters[slug][$eq]=${productSlug}&populate[image]=true&populate[categories]=true&populate[partners]=true&populate[specs][populate][listItem]=true&populate[company][populate][imageSection][populate][image][populate]=true&populate[company][populate][videoSection][populate][video][populate]=true&populate[cta]=true`,
  );
  const product = productArr[0];

  if (!product) {
    return <p className="text-center text-2xl">Product not found</p>;
  }
  return (
    <div className="mx-auto w-[85%]">
      <ProductPage product={product} />
    </div>
  );
}
