import Empty from "@/app/_components/Empty";
import EmptyPost from "@/app/_components/EmptyPost";
import NewsCard from "@/app/_components/NewsCard";
import { formatDateTime, getImageUrl } from "@/app/_lib/helpers";
import { fetchDataFromApi } from "@/app/_utils/strapiFetcher";
import Image from "next/image";
import qs from "qs";
import React from "react";

export default async function Page({ params }) {
  const { categorySlug } = await params;

  const query = qs.stringify({
    filters: {
      news_categories: {
        slug: {
          $eq: categorySlug,
        },
      },
    },
    populate: {
      image: true,
      tags: true,
    },
  });
  const endpoint = `/api/news?${query}`;

  const posts = await fetchDataFromApi(endpoint);

  if (!posts || posts.length === 0) return <EmptyPost />;

  return (
    <div className="mx-auto w-[90%] max-w-full py-10 sm:py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => {
          return <NewsCard key={post?.id} post={post} />;
        })}
      </div>
    </div>
  );
}
