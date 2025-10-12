"use server";

export async function contactData(formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const company = formData.get("company");
  const phone = formData.get("phone");
  const interestedIn = formData.get("InterestedIn");
  const message = formData.get("message");
  const isAgreeWithPrivacyPolicy = formData.get("isAgreeWithPrivacyPolicy");
  const isAgreed = isAgreeWithPrivacyPolicy === "on" ? true : false;
  const payload = {
    data: {
      firstName,
      lastName,
      email,
      company,
      phone,
      interestedIn,
      message,
      isAgreeWithPrivacyPolicy: isAgreed,
    },
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/contact-forms`,
    {
      method: "POST", // 👈 specify method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
  const resBody = await res.json();
  console.log(resBody);
  if (resBody?.error && resBody?.error?.name === "ValidationError") {
    return { errors: resBody?.error?.details.errors };
  }
}
