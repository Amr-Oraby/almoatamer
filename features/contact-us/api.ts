export type ContactFormValues = {
  name: string;
  email: string;
  phone_code: string;
  phone: string;
  message_text: string;
};

const submitContactForm = async (data: ContactFormValues, locale: string) => {
  const response = await fetch("https://umrah.azmy.aait-d.com/api/v1/client/contact-us", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Accept-Language": locale
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to send message");
  }
  return response.json();
};

export const api = {
  submitContactForm,
};
