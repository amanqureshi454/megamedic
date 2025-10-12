import Image from "next/image";
import React from "react";
import { fetchDataFromApi } from "../_utils/strapiFetcher";
import qs from "qs";
import { formatDateTime, getImageUrl } from "../_lib/helpers";
import Link from "next/link";
import LinkButton from "./LinkButton";
import TagsBox from "./TagsBox";
import RelatedPost from "./RelatedPost";
import NewsCategories from "./NewsCategories";
import AuthorInfoBox from "./AuthorInfoBox";
import CompanyInfo from "./CompanyInfo";
import MobileSidebar from "./MobileSidebar";

export default async function NewsSidebar({ data }) {
  const categories = await fetchDataFromApi("/api/news-categories");
  const categorySlugs = data?.news_categories?.map((category) => category.slug);

  // recent posts
  const query = qs.stringify({
    filters: {
      news_categories: {
        slug: {
          $in: categorySlugs,
        },
      },
    },
    populate: {
      image: true,
    },
  });
  const endpoint = `/api/news?${query}`;

  const relatedPosts = await fetchDataFromApi(endpoint);

  return (
    <>
      <aside className="sticky top-10 hidden space-y-10 border border-neutral-200 p-8 sm:space-y-20 lg:block">
        {/* author box */}

        <AuthorInfoBox data={data} />

        {/* categories */}
        <NewsCategories categories={categories} />

        {/* related posts */}
        <RelatedPost relatedPosts={relatedPosts} />

        {/* Tags */}
        <TagsBox data={data} />
        <CompanyInfo data={data} />
      </aside>

      <MobileSidebar
        categories={categories}
        data={data}
        relatedPosts={relatedPosts}
      />
    </>
  );
}
