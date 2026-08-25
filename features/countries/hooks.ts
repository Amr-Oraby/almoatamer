import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCountries } from "./api";

export function useCountries() {
    return useQuery({
        queryKey: ["countries"],
        queryFn: getCountries,
    });
}


