import React from "react";
import ContactForm from "../_components/ContactForm";
import ContactInfo from "../_components/ContactInfo";
import qs from "qs";
import { fetchDataFromApi } from "../_utils/strapiFetcher";
import ContactVideo from "../_components/ContactVideo";

export default async function Page() {
  const ourQuery = qs.stringify({
    populate: {
      content: {
        on: {
          "blocks.contact-form-section": {
            populate: "*",
          },
          "blocks.contact-video": {
            populate: {
              video: {
                populate: "*",
              },
              cta: {
                populate: {
                  icon: {
                    populate: "*",
                  },
                },
              },
            },
          },
          "blocks.contact-support": {
            populate: {
              socialBlock: {
                populate: {
                  icons: {
                    populate: "*",
                  },
                },
              },
              infoBlocks: {
                populate: "*",
              },
            },
          },
        },
      },
    },
  });

  const endpoints = `/api/contact?${ourQuery}`;
  const contactData = await fetchDataFromApi(endpoints);

  function ourRenderer(item, index) {
    if (item?.__component === "blocks.contact-form-section") {
      return <ContactForm key={index} data={item} />;
    }
  }
  return (
    <div
      id="contact-section"
      className="mx-auto grid w-[85%] grid-cols-1 gap-4 py-10 sm:py-20 lg:grid-cols-2"
    >
      {contactData?.content?.map((item, index) => ourRenderer(item, index))}
      <ContactInfo data={contactData} />
    </div>
  );
}
