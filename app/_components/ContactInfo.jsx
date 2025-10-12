import React from "react";
import ContactVideo from "./ContactVideo";
import ContactSupport from "./ContactSupport";

export default function ContactInfo({ data }) {
  function ourRenderer(item, index) {
    if (item?.__component === "blocks.contact-video") {
      return <ContactVideo key={index} data={item} />;
    }
    if (item?.__component === "blocks.contact-support") {
      return <ContactSupport key={index} data={item} />;
    }
  }
  return (
    <div className="flex h-full flex-col gap-4">
      {data?.content?.map((item, index) => ourRenderer(item, index))}
    </div>
  );
}
