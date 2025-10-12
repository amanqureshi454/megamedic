import { fetchDataFromApi } from "../_utils/strapiFetcher";

export async function getPartners() {
  const endpoint = "/api/partners";
  const partners = await fetchDataFromApi(endpoint);

  return partners;
}
