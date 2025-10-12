// import React from "react";
// import { useFilter } from "../_context/FilterProvider";

// export default function CheckBox({ label, type }) {
//   const { filterSelectedValues, setFilterSelectedValues } = useFilter();

//   if (!filterSelectedValues) return null;
//   const isChecked = filterSelectedValues.includes(label);

//   const handleChange = () => {
//     if (isChecked) {
//       // Remove from array
//       setFilterSelectedValues((prev) => prev.filter((item) => item !== label));
//     } else {
//       // Add to array
//       setFilterSelectedValues((prev) => [...prev, label]);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <input
//         id={label}
//         type="checkbox"
//         checked={isChecked}
//         onChange={handleChange}
//         className="border-primary accent-primary checked:border-primary checked:bg-primary h-[0.9rem] w-[0.9rem] appearance-none rounded-xs border transition duration-150"
//       />
//       <label htmlFor={label} className="capitalize selection:bg-transparent">
//         {label}
//       </label>
//     </div>
//   );
// }

import React from "react";
import { useFilter } from "../_context/FilterProvider";

export default function CheckBox({ label, type }) {
  const {
    filterSelectedValues,
    setFilterSelectedValues,
    categories = [],
    partners = [],
  } = useFilter();

  if (!filterSelectedValues) return null;

  const isChecked = filterSelectedValues.includes(label);

  const handleChange = () => {
    setFilterSelectedValues((prev) => {
      // if unchecking -> just remove this label
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      }

      // prepping arrays of slugs for group detection
      const categorySlugs = categories.map((c) => c.slug);
      const partnerSlugs = partners.map((p) => p.slug);

      if (type === "category") {
        // remove any partner slugs from prev (reset partner group),
        // keep existing category slugs and add the new one (avoid dupes)
        const kept = prev.filter((item) => !partnerSlugs.includes(item));
        // if label already present (shouldn't be), avoid dupes
        return Array.from(new Set([...kept, label]));
      } else if (type === "partner") {
        // remove any category slugs from prev (reset category group),
        // keep existing partner slugs and add the new one
        const kept = prev.filter((item) => !categorySlugs.includes(item));
        return Array.from(new Set([...kept, label]));
      }

      // fallback: just add the label
      return Array.from(new Set([...prev, label]));
    });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        id={`${type}-${label}`}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="border-primary accent-primary checked:border-primary checked:bg-primary h-[0.9rem] w-[0.9rem] appearance-none rounded-xs border transition duration-150"
      />
      <label
        htmlFor={`${type}-${label}`}
        className="capitalize selection:bg-transparent"
      >
        {label}
      </label>
    </div>
  );
}
