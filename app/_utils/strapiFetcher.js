export async function fetchDataFromApi(endPoints) {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = "https://fortunate-light-40d1a8cc82.strapiapp.com";
  const res = await fetch(`${apiUrl}${endPoints}`);
  const data = await res.json();

  return data?.data;
}
