import React from "react";
import NewsHero from "../_components/NewsHero";
import RelatedNews from "../_components/RelatedNews";
import qs from "qs";
import { fetchDataFromApi } from "../_utils/strapiFetcher";

export default async function Page() {
  const ourQuery = qs.stringify({
    populate: {
      content: {
        on: {
          "blocks.news-hero": {
            populate: {
              image: {
                populate: "*",
              },
            },
          },
        },
      },
    },
  });
  const endpoint = `/api/news?populate=*`;
  const newsData = await fetchDataFromApi(endpoint);

  const firstNews = newsData[0];

  return (
    <div className="mx-auto min-h-screen max-w-[90%] py-10 sm:max-w-[85%] sm:py-20">
      {/* {newsData?.content?.map((item, index) => ourRenderer(item, index))} */}
      <NewsHero data={firstNews} />
      <RelatedNews data={newsData} />
    </div>
  );
}
