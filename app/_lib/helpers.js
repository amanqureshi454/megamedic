export const navItems = [
  {
    id: 200,
    name: "Categories",
    url: "#",
    nested: true,
  },
  {
    id: 202,
    name: "Brands",
    url: "/brands",
    nested: true,
  },
  {
    id: 201,
    name: "About us",
    url: "/about-us",
  },

  {
    id: 203,
    name: "News",
    url: "/news",
  },
  {
    id: 204,
    name: "Career",
    url: "/career",
  },
  {
    id: 205,
    name: "Contact",
    url: "/contact",
  },
];

export function getImageUrl(image, fallback = "/default.png") {
  if (!image) return fallback;

  // Prioritize formats
  const url =
    image.formats?.large?.url ||
    image.formats?.medium?.url ||
    image.formats?.small?.url ||
    image.url;

  if (!url) return fallback;

  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

export function formatDateTime(isoString, timeZone = "Asia/Karachi") {
  if (!isoString) return "";

  try {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      timeZone,
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Invalid date:", isoString);
    return isoString;
  }
}
