"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useNav } from "../_context/NavProvider";
import { fetchDataFromApi } from "../_utils/strapiFetcher";
import Fuse from "fuse.js";

export default function AnimatedSearch({ isHome }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const { openNav } = useNav();

  // Configure Fuse
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: [
        "title",
        "description",
        "tags.name", // if tags is an array of objects
        "categories.slug", // if categories is also array of objects
        "partners.slug",
      ],
      threshold: 0.3, // lower = stricter, higher = more fuzzy
    });
  }, [products]);

  const results = query
    ? fuse.search(query).map((result) => result.item)
    : products;

  useEffect(() => {
    async function fetchProduct() {
      const products = await fetchDataFromApi(
        `/api/products?populate=*&pagination[limit]=100`,
      );
      setProducts(products);
    }
    fetchProduct();
  }, [query]);

  return (
    <div className="ml-2 flex items-center gap-2">
      <div
        className={`relative z-50 rounded-full ${isOpen ? "bg-white" : "bg-transparent"} px-4 py-3`}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "50vw", maxWidth: "300px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full max-w-full border-none outline-none"
              placeholder="search"
            />
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="group absolute top-1/2 right-0 z-30 -translate-y-1/2 cursor-pointer duration-300 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            className="size-7 duration-300 group-hover:rotate-[-360deg] sm:size-8"
          >
            <circle
              cx="19"
              cy="19"
              r="19"
              fill={openNav ? "white" : isHome ? "white" : "#34855B"}
            />
            <path
              d="M26 25L22.25 21.25M23.84 17.42C23.84 20.4134 21.4134 22.84 18.42 22.84C15.4266 22.84 13 20.4134 13 17.42C13 14.4266 15.4266 12 18.42 12C21.4134 12 23.84 14.4266 23.84 17.42Z"
              stroke={openNav ? "#34855B" : isHome ? "#34855B" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <AnimatePresence>
          {isOpen && query !== "" && (
            <motion.div
              className="absolute left-0 z-50 mt-4 max-h-[500px] w-full max-w-full overflow-y-auto rounded-2xl bg-white px-4 py-10 text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                pointerEvents: "auto",
                touchAction: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {results.length === 0 ? (
                <p className="text-center text-gray-500">No products found.</p>
              ) : (
                <ul className="space-y-4 divide-y-1 divide-neutral-200 overflow-y-auto">
                  {results.map((product) => (
                    <li key={product.id} className="pb-2">
                      <h3 className="text-base font-semibold hover:underline">
                        <Link
                          target="_blank"
                          href={`/products/${product?.slug}`}
                        >
                          {" "}
                          {product.name}
                        </Link>
                      </h3>

                      {/* optionally show tags & categories */}
                      <div className="mt-2 text-xs text-gray-500">
                        {product.categories?.map((c) => c.name).join(", ")}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
