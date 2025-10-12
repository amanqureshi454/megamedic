import NewsIntroPart from "@/app/_components/NewsIntroPart";
import NewsSidebar from "@/app/_components/NewsSidebar";
import { fetchDataFromApi } from "@/app/_utils/strapiFetcher";
import qs from "qs";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default async function Page({ params }) {
  const { newsSlug } = await params;
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: newsSlug,
      },
    },
    populate: {
      companyInfo: {
        populate: {
          cta: {
            populate: {
              icon: true,
            },
          },
        },
      },
      image: true,
      tags: true,
      news_categories: true,
      authorInfo: {
        populate: ["image", "icons.icon"],
      },
    },
  });

  const endpoint = `/api/news?${query}`;
  const data = await fetchDataFromApi(endpoint);
  const newsData = data[0];

  return (
    <div className="mx-auto flex flex-col gap-8 py-10 sm:py-20">
      <NewsIntroPart newsData={newsData} />
      <div className="relative mx-auto grid max-w-full grid-cols-[1fr_50px] gap-10 py-10 sm:grid-cols-[1fr_5rem] lg:w-[85%] lg:grid-cols-[1fr_0.5fr]">
        <div className="prose prose-a:text-primary prose-img:w-full prose-h2:text-sm sm:prose-p:text-base prose-p:text-xs prose-h3:text-sm sm:prose-h3:text-xl prose-li:text-xs sm:prose-li:text-base sm:prose-h2:text-2xl prose-img:inline max-w-none px-4 lg:px-0">
          <Markdown rehypePlugins={[rehypeRaw]}>{newsData?.richText}</Markdown>
        </div>
        <NewsSidebar data={newsData} />
      </div>
    </div>
  );
}
