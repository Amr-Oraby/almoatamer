const fs = require('fs');

const arPath = 'e:/4-Projects/almoatamer/messages/ar.json';
const enPath = 'e:/4-Projects/almoatamer/messages/en.json';

const arJson = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));

arJson.News = {
  "news1": "فتوى: جواز العمرة بالإنابة وفقاً للضوابط الشرعية...",
  "news2": "المعتمر يستعرض الخدمات المقدمة لضيوف الرحمن في المعرض...",
  "news3": "استعراض باقة الخدمات المقدمة لضيوف الرحمن ومميزاتها..."
};

arJson.NewsDetails = {
  "title": "أخبار المعتمر: تغطية شاملة لآخر التطورات والخدمات",
  "intro": "نحرص في منصة المعتمر على إبقائكم على اطلاع دائم بآخر الأخبار والتحديثات المتعلقة بخدمات العمرة والتسهيلات المقدمة لضيوف الرحمن. تابعونا لمعرفة المزيد عن جهودنا المستمرة لتحسين تجربة العمرة.",
  "content": "شهدت خدمات المعتمر مؤخرًا تطورات ملحوظة تهدف إلى تيسير أداء المناسك على المسلمين من جميع أنحاء العالم. من خلال توفير باقات مرنة وخدمات تقنية متقدمة، نسعى دائمًا لأن نكون الخيار الأول والأكثر موثوقية لكل من ينوي أداء العمرة. استمرت فرق العمل لدينا في تقديم أفضل سبل الدعم الميداني والتقني لضمان سلامة وراحة المعتمرين في كل خطوة."
};

enJson.News = {
  "news1": "Fatwa: The Permissibility Of Proxy Umrah According...",
  "news2": "Almoatamer Showcases The Services Provided To Gues...",
  "news3": "Showcasing Package Of Services Provided To The Gue..."
};

enJson.NewsDetails = {
  "title": "Al-Moatamer News: Comprehensive Coverage of Latest Developments",
  "intro": "At Al-Moatamer platform, we ensure you stay updated with the latest news and updates related to Umrah services and facilities provided to the guests of Allah. Follow us to learn more about our continuous efforts to improve the Umrah experience.",
  "content": "Al-Moatamer services have recently witnessed remarkable developments aimed at facilitating the performance of rituals for Muslims from all over the world. By providing flexible packages and advanced technical services, we always strive to be the first and most reliable choice for everyone intending to perform Umrah. Our teams have continued to provide the best field and technical support to ensure the safety and comfort of pilgrims at every step."
};

fs.writeFileSync(arPath, JSON.stringify(arJson, null, 2));
fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
console.log('News translations updated.');
