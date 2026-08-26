/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

const arPath = 'e:/4-Projects/almoatamer/messages/ar.json';
const enPath = 'e:/4-Projects/almoatamer/messages/en.json';

const arJson = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));

arJson.Contact = {
  "fullNamePlaceholder": "الاسم بالكامل",
  "phonePlaceholder": "أدخل رقم هاتفك",
  "emailPlaceholder": "البريد الالكتروني",
  "messagePlaceholder": "نص الرسالة...",
  "submitButton": "إرسال",
  "contactInfoTitle": "معلومات الاتصال",
  "contactInfoSubtitle": "تواصل معنا لبدء محادثة مباشرة !",
  "phone": "+966 0533319553",
  "email": "info@almoatamer.com"
};

enJson.Contact = {
  "fullNamePlaceholder": "Full Name",
  "phonePlaceholder": "Enter your phone number",
  "emailPlaceholder": "Email Address",
  "messagePlaceholder": "Message text...",
  "submitButton": "Send",
  "contactInfoTitle": "Contact Information",
  "contactInfoSubtitle": "Contact us to start a direct chat!",
  "phone": "+966 0533319553",
  "email": "info@almoatamer.com"
};

fs.writeFileSync(arPath, JSON.stringify(arJson, null, 2));
fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
console.log('Contact translations updated.');
