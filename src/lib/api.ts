import type { Country } from "@/types/country";

const API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,flags";

interface RestCountryResponse {
  name: { common: string };
  capital: string[];
  flags: { svg: string };
}

export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`[api] ❌ Failed to fetch countries: ${response.status}`);
  }

  const data: RestCountryResponse[] = await response.json();

  return data
    .filter((c) => c.capital?.length > 0 && c.flags?.svg)
    .map((c) => ({
      name: c.name.common,
      capital: c.capital[0],
      flag: c.flags.svg,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
