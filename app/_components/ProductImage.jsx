import Image from "next/image";
import React from "react";
import { getImageUrl } from "../_lib/helpers";

export default function ProductImage({ product }) {
  const imageUrl = getImageUrl(product?.image);
  return (
    <div className="relative h-[350px] w-full justify-self-center">
      <Image src={imageUrl} fill alt="product" className="object-contain" />
    </div>
  );
}
