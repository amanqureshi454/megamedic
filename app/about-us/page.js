import React from "react";
import AboutHero from "../_components/AboutHero";
import AboutInnovation from "../_components/AboutInnovation";
import OurTeam from "../_components/OurTeam";
import Testimonilas from "../_components/Testimonilas";
import CompanyValue from "../_components/CompanyValue";
import { fetchDataFromApi } from "../_utils/strapiFetcher";
import qs from "qs";

export async function generateMetadata() {
  const data = await fetchDataFromApi("/api/about-us");
  return { title: data?.title, description: data?.description };
}

export default async function Page() {
  const ourQuery = qs.stringify({
    populate: {
      content: {
        on: {
          "blocks.about-hero": {
            populate: "*",
          },
          "blocks.about-innovation": {
            populate: "*",
          },
          "blocks.testimonial": {
            populate: {
              testimonials: {
                populate: {
                  image: {
                    populate: "*",
                  },
                },
              },
            },
          },
          "blocks.our-team": {
            populate: {
              members: {
                populate: {
                  image: {
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
  const endpoint = `/api/about-us?${ourQuery}`;
  const aboutData = await fetchDataFromApi(endpoint);

  function OurRenderer(item, index) {
    if (item?.__component === "blocks.about-hero") {
      return <AboutHero key={index} data={item} />;
    }
    if (item?.__component === "blocks.about-innovation") {
      return <AboutInnovation key={index} data={item} />;
    }
    if (item?.__component === "blocks.our-team") {
      return <OurTeam key={index} data={item} />;
    }
    // if (item?.__component === "blocks.testimonial") {
    //   return <Testimonilas key={index} data={item} />;
    // }
  }
  return (
    <div className="-mt-24">
      {aboutData?.content?.map((item, index) => OurRenderer(item, index))}
      <CompanyValue />
    </div>
  );
}
