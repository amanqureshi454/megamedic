import ProductFeatureWithImage from "./ProductFeatureWithImage";
import ProductHeading from "./ProductHeading";
import ProductTabs from "./ProductTabs";

export default function SinglePageDetail({ product }) {
  return (
    <div className="space-y-10 py-20 sm:space-y-20" id="product-detail">
      <ProductHeading product={product} />
      <ProductFeatureWithImage product={product} />
      <ProductTabs product={product} />
    </div>
  );
}
