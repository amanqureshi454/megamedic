import Empty from "./Empty";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products || products?.length === 0) return <Empty name="products" />;
  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-3 2xl:grid-cols-[repeat(auto-fit,minmax(220px,220px))]">
      {products?.map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })}
    </div>
  );
}
