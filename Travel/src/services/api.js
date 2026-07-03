// API services for Travel Explorer
const REST_COUNTRIES_API = 'https://restcountries.com/v3.1';
const DUMMYJSON_API = 'https://dummyjson.com'; 

// Countries API calls
export const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${REST_COUNTRIES_API}}/all`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    // Ensure data is an array
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    // Return mock data for demo purposes
    return getMockCountries();
  }
};

export const fetchCountryByCode = async (code) => {
  const upperCode = code?.toUpperCase?.() || '';

  try {
    const response = await fetch(`${REST_COUNTRIES_API}/alpha/${upperCode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    // Ensure data is an array
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (error) {
    console.error(`Error fetching country ${upperCode}:`, error);

    // Try to find the country from the cached/all countries fallback.
    try {
      const allCountries = await fetchAllCountries();
      const match = allCountries.filter(
        (country) => country.cca2?.toUpperCase() === upperCode
      );
      if (match.length > 0) {
        return match;
      }
    } catch (fallbackError) {
      console.warn('Fallback fetchAllCountries failed:', fallbackError);
    }

    const mockMatch = getMockCountries().filter(
      (country) => country.cca2 === upperCode
    );
    if (mockMatch.length > 0) {
      return mockMatch;
    }

    throw error;
  }
};

export const fetchCountriesByRegion = async (region) => {
  try {
    const response = await fetch(`${REST_COUNTRIES_API}/region/${region}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    // Ensure data is an array
    if (!Array.isArray(data)) {
      data = [data];
    }
    return data;
  } catch (error) {
    console.error(`Error fetching countries in region ${region}:`, error);
    return getMockCountries().filter(
      (country) => country.region.toLowerCase() === region.toLowerCase()
    );
  }
};

// Users API calls (DummyJSON typically allows CORS)
export const fetchAllUsers = async () => {
  try {
    const response = await fetch(`${DUMMYJSON_API}/users`);
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${DUMMYJSON_API}/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

// Mock data for demo/fallback purposes
const getMockCountries = () => [
  {
    name: { common: 'India', official: 'Republic of India' },
    cca2: 'IN',
    region: 'Asia',
    subregion: 'South Asia',
    capital: ['New Delhi'],
    population: 1417173173,
    area: 3287263,
    flag: '🇮🇳',
    languages: { hin: 'Hindi', eng: 'English' },
    currencies: { INR: { name: 'Indian Rupee', symbol: '₹' } },
  },
  {
    name: { common: 'Japan', official: 'Japan' },
    cca2: 'JP',
    region: 'Asia',
    subregion: 'East Asia',
    capital: ['Tokyo'],
    population: 123294513,
    area: 377975,
    flag: '🇯🇵',
    languages: { jpn: 'Japanese' },
    currencies: { JPY: { name: 'Japanese Yen', symbol: '¥' } },
  },
  {
    name: { common: 'United States', official: 'United States of America' },
    cca2: 'US',
    region: 'Americas',
    subregion: 'North America',
    capital: ['Washington, D.C.'],
    population: 338289857,
    area: 9833520,
    flag: '🇺🇸',
    languages: { eng: 'English' },
    currencies: { USD: { name: 'United States dollar', symbol: '$' } },
  },
  {
    name: { common: 'France', official: 'French Republic' },
    cca2: 'FR',
    region: 'Europe',
    subregion: 'Western Europe',
    capital: ['Paris'],
    population: 67970571,
    area: 643801,
    flag: '🇫🇷',
    languages: { fra: 'French' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
  },
  {
    name: { common: 'Australia', official: 'Commonwealth of Australia' },
    cca2: 'AU',
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    capital: ['Canberra'],
    population: 26068792,
    area: 7692024,
    flag: '🇦🇺',
    languages: { eng: 'English' },
    currencies: { AUD: { name: 'Australian dollar', symbol: '$' } },
  },
  {
    name: { common: 'Canada', official: 'Canada' },
    cca2: 'CA',
    region: 'Americas',
    subregion: 'North America',
    capital: ['Ottawa'],
    population: 39292355,
    area: 9984670,
    flag: '🇨🇦',
    languages: { eng: 'English', fra: 'French' },
    currencies: { CAD: { name: 'Canadian dollar', symbol: '$' } },
  },
];

