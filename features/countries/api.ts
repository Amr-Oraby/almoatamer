import { apiClient } from "@/lib/api/client";
import { CountriesResponse } from "@/app/types/UserType";

export const getCountries = () => apiClient<CountriesResponse>("/api/countries", { method: "GET" });