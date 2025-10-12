import { fetchDataFromApi } from "../_utils/strapiFetcher";

export async function getCategories() {
  const endpoint = "/api/categories";
  const categories = await fetchDataFromApi(endpoint);

  return categories;
}
