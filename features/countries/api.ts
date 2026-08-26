import { apiFetch } from "@/lib/api/fetcher";

export const getCountries = () => fetch("https://umrah.azmy.aait-d.com/api/v1/client/countries").then(res => res.json());