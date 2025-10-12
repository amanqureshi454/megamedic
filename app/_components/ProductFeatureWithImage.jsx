import ProductFeatures from "./ProductFeatures";
import ProductImage from "./ProductImage";

export default function ProductFeatureWithImage({ product }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_0.5fr] md:gap-14">
      <ProductFeatures product={product} />
      <ProductImage product={product} />
    </div>
  );
}
