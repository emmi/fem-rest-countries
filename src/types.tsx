/* eslint-disable no-unused-vars */
export enum Mode {
  Light,
  Dark
}

export interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  alpha3Code: string;

  flags: {
    svg: string;
    png: string;
  };
}

export interface DetailedCountry extends Country {
  nativeName: string;
  subregion: string;
  topLevelDomain: string;

  languages: Language[];
  currencies: Currency[];
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Language {
  name: string;
}
