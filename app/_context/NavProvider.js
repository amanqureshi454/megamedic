"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchDataFromApi } from "../_utils/strapiFetcher";
import qs from "qs";

const NavContext = createContext();

export default function NavProvider({ children }) {
  const [mainNavigations, setMainNavigations] = useState([]);
  const [openNav, setOpenNav] = useState(false);
  const [menuLevel, setMenuLevel] = useState("main");
  const [categories, setCategories] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [footerData, setFooterData] = useState({});
  const [scrolled, setScrolled] = useState(false);

  const [mainNavActiveItem, setMainNavActiveItem] = useState("");

  const navRef = useRef(null);

  function handleMenu() {
    setOpenNav((open) => !open);
    setMenuLevel("main");
  }

  // fetch main nav items
  useEffect(() => {
    const ourQuery = qs.stringify({
      populate: {
        header: {
          populate: {
            logo: {
              populate: {
                greenImage: {
                  populate: "*",
                },
                whiteImage: {
                  populate: "*",
                },
              },
            },
            link: {
              populate: "*",
            },
          },
        },
      },
    });
    const endpoint = `/api/global?${ourQuery}`;

    async function getMainNavigations() {
      const navigations = await fetchDataFromApi(endpoint);
      setMainNavigations(navigations);
    }
    getMainNavigations();
  }, []);

  // fetch strapi categories & partners
  useEffect(() => {
    async function fetchCategories() {
      const categories = await fetchDataFromApi("/api/categories");
      const partners = await fetchDataFromApi("/api/partners");
      setCategories(categories);
      setPartners(partners);
    }
    fetchCategories();
  }, []);

  // fetch products based on selected categories
  useEffect(() => {
    async function fetchProductsByCategory() {
      if (!selectedCategory) return null;
      const products = await fetchDataFromApi(
        `/api/products?filters[categories][slug]=${selectedCategory}`,
      );
      setProductsByCategory(products);
    }
    fetchProductsByCategory();
  }, [setProductsByCategory, selectedCategory]);

  // fetch footer data
  useEffect(() => {
    const endpoint =
      "/api/global?populate[footer][populate][mainLink]=*&populate[footer][populate][socialLink]=*&[populate][footer][populate][support][populate][link]=*&[populate][footer][populate][address]=*";
    async function getFooterData() {
      const data = await fetchDataFromApi(endpoint);
      setFooterData(data);
    }
    getFooterData();
  }, []);

  // add blur effect to nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close navbar on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenNav(false);
      }
    }

    if (openNav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNav]);
  return (
    <NavContext.Provider
      value={{
        openNav,
        setOpenNav,
        menuLevel,
        setMenuLevel,
        handleMenu,
        categories,
        selectedCategory,
        setSelectedCategory,
        productsByCategory,
        mainNavigations,
        footerData,
        scrolled,
        navRef,
        mainNavActiveItem,
        setMainNavActiveItem,
        partners,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined)
    return { error: "Context shoudl be uses inside the provider" };

  return context;
}
