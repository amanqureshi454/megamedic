import { AnimatePresence, motion } from "framer-motion";
import CategoriesFilters from "./CategoriesFilters";
import ParntersFilter from "./PartnersFilter";
import { useFilter } from "../_context/FilterProvider";
import BrandFilters from "./BrandFilters";

export default function ProductFilterSidebar({ showFilter }) {
  const { filterSelectedValues, setFilterSelectedValues } = useFilter();
  const handleRemove = (label) => {
    setFilterSelectedValues((prev) => prev.filter((val) => val !== label));
  };
  return (
    <>
      {/* ✅ For small screens - Animated */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            key="mobile-filter"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-gray-background space-y-8 rounded-2xl px-4 py-6 text-sm md:hidden"
          >
            <h3 className="mb-10 font-semibold tracking-tight">Filter</h3>
            <div className="flex flex-wrap items-center gap-2">
              {filterSelectedValues?.map((filter) => {
                return (
                  <div
                    key={filter}
                    className="bg-primary flex items-center gap-2 rounded-full px-3 py-1 text-[10px] text-white"
                  >
                    <span>{filter}</span>
                    <button
                      onClick={() => handleRemove(filter)}
                      className="cursor-pointer text-base"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
            <CategoriesFilters />
            <BrandFilters />
            <button className="-mt-4 ml-8 block text-xs">see more+</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ For large screens - Always visible */}
      <div className="bg-gray-background hidden space-y-8 rounded-2xl px-4 py-6 text-sm md:block">
        <h3 className="mb-10 font-semibold tracking-tight">Filter</h3>
        <div className="flex flex-wrap items-center gap-2">
          {filterSelectedValues?.map((filter) => {
            return (
              <div
                key={filter}
                className="bg-primary flex items-center gap-2 rounded-full px-3 py-1 text-[10px] text-white"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleRemove(filter)}
                  className="cursor-pointer text-base"
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
        <CategoriesFilters />
        <BrandFilters />
      </div>
    </>
  );
}
