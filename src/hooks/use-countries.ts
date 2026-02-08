import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "@/lib/api";
import type { Country } from "@/types/country";
import fallbackData from "@/data/countries.json";

async function fetchWithFallback(): Promise<Country[]> {
  try {
    return await fetchCountries();
  } catch (error) {
    console.warn("[countries] ⚠️ API failed, using local fallback data", error);
    return fallbackData as Country[];
  }
}

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchWithFallback,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
