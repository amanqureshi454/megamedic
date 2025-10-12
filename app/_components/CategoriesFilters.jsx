import React from "react";
import CheckBox from "./CheckBox";
import { useNav } from "../_context/NavProvider";
import LineSkeleton from "./LineSkeleton";
import { useFilter } from "../_context/FilterProvider";

export default function CategoriesFilters() {
  const { categories } = useFilter();

  if (!categories || categories?.length === 0)
    return <LineSkeleton length={5} height="10" />;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Categories</h3>

        <button className="bg-primary flex size-6 items-center justify-center rounded-full text-white">
          -
        </button>
      </div>
      <ul className="space-y-2">
        {categories &&
          categories?.map((item) => {
            return (
              <li key={item?.id} className="flex items-center gap-2">
                <CheckBox type={"category"} label={item?.slug} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
