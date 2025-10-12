import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getImageUrl } from "../_lib/helpers";

export default function ProductCard({ product }) {
  const imageUrl = getImageUrl(product?.image);
  return (
    <div key={product?.id} className="space-y-4">
      <div className="bg-product-background relative flex items-center justify-center overflow-hidden rounded-md p-2 duration-300 hover:shadow-2xl">
        <Link
          href={`/products/${product?.slug}`}
          className="group relative block h-[200px] w-[200px] xl:h-[230px] xl:w-[230px]"
        >
          <Image
            src={imageUrl}
            alt={product?.name}
            fill
            className="object-contain duration-300 group-hover:scale-110"
          />
        </Link>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold capitalize">
          {product?.productTitle}
        </h3>
        {product?.categories?.length > 0 && (
          <p className="text-sm capitalize">
            {product?.categories?.map((cat) => cat?.name)}
          </p>
        )}
        {/* {product?.partners?.length > 0 && (
          <p className="text-base capitalize">
            {product?.partners?.map((partner) => partner?.name)}
          </p>
        )} */}
      </div>
    </div>
  );
}
