import qs from "qs";
import CompanyIntro from "./_components/CompanyIntro";
import HomeHero from "./_components/HomeHero";
import LiquidShader from "./_components/LiquidShader";
import OurPartners from "./_components/OurPartners";
import OurValues from "./_components/OurValues";
import { fetchDataFromApi } from "./_utils/strapiFetcher";
export async function generateMetadata() {
  const data = await fetchDataFromApi("/api/home");
  return { title: data?.title, description: data?.description };
}

export default async function Home() {
  const ourQuery = qs.stringify({
    populate: {
      content: {
        on: {
          "blocks.home-hero": {
            populate: "*",
          },
          "blocks.company-intro": {
            populate: {
              cta: {
                populate: "*",
              },
            },
          },
          "blocks.partners": {
            populate: {
              leftCarousel: {
                populate: {
                  images: {
                    populate: "*",
                  },
                },
              },
              rightCarousel: {
                populate: {
                  images: {
                    populate: "*",
                  },
                },
              },
            },
          },
          "blocks.our-value": {
            populate: "*",
          },
        },
      },
    },
  });
  const endpoint = `/api/home?${ourQuery}`;
  const homeData = await fetchDataFromApi(endpoint);

  if (!homeData) return <p>hsdjk</p>;
  function OurRendered(item, index) {
    if (item?.__component === "blocks.home-hero") {
      return <HomeHero key={index} data={item} />;
    }
    if (item?.__component === "blocks.company-intro") {
      return <CompanyIntro key={index} data={item} />;
    }
    if (item?.__component === "blocks.partners") {
      return <OurPartners key={index} data={item} />;
    }
    if (item?.__component === "blocks.our-value") {
      return <OurValues key={index} data={item} />;
    }
  }
  return (
    <div className="-mt-24 overflow-x-hidden">
      <LiquidShader />
      {homeData?.content?.map((item, index) => OurRendered(item, index))}
    </div>
  );
}
