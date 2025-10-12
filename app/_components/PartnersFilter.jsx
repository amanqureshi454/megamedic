import React from "react";
import CheckBox from "./CheckBox";
import LineSkeleton from "./LineSkeleton";
import { useNav } from "../_context/NavProvider";
import { useFilter } from "../_context/FilterProvider";

export default function ParntersFilter() {
  const { partners } = useFilter();

  if (!partners || partners?.length === 0)
    return <LineSkeleton length={7} height="10" />;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Partners</h3>

        <button className="bg-primary flex size-6 items-center justify-center rounded-full text-white">
          -
        </button>
      </div>
      <ul className="space-y-2">
        {partners &&
          partners?.map((item) => {
            return (
              <li key={item?.id} className="flex items-center gap-2">
                <CheckBox type={"partner"} label={item?.slug} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
