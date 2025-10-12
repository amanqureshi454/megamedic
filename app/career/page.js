import qs from "qs";
import CareerHero from "../_components/CareerHero";
import JobListings from "../_components/JobListings";
import { fetchDataFromApi } from "../_utils/strapiFetcher";
import Image from "next/image";
import XParticles from "../_components/XParticles";
export async function generateMetadata() {
  const data = await fetchDataFromApi("/api/career");
  return { title: data?.title, description: data?.description };
}

export default async function Page() {
  const ourQuery = qs.stringify({
    populate: {
      content: {
        on: {
          "blocks.career-hero": {
            populate: {
              image: {
                populate: "*",
              },
            },
          },
          "blocks.job-listing": {
            populate: {
              jobs: {
                populate: {
                  apply: {
                    populate: {
                      icon: {
                        populate: "*",
                      },
                    },
                  },
                  types: {
                    populate: "*",
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const endpoint = `/api/career?${ourQuery}`;

  const careerData = await fetchDataFromApi(endpoint);
  function ourRenderer(item, index) {
    if (item?.__component === "blocks.career-hero") {
      return <CareerHero key={index} data={item} />;
    }
    if (item?.__component === "blocks.job-listing") {
      return <JobListings key={index} data={item} />;
    }
  }
  return (
    <div className="relative -mt-24 min-h-dvh overflow-hidden bg-[#FF9D94]/50 pt-20 pb-32">
      {/* <XParticles svgFill="#C2C7AB" type="two" /> */}

      {careerData?.content?.map((item, index) => ourRenderer(item, index))}
    </div>
  );
}
