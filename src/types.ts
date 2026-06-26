export interface HLSStream {
  id: string;
  name: string;
  url: string;
  category: 'sports' | 'anime' | 'gaming' | 'ambient';
  description: string;
}

export type ActiveSection = 'home' | 'football' | 'anime' | 'gremix' | 'song';

export interface JujutsuCharacter {
  name: string;
  role: string;
  ability: string;
  energyLevel: number;
  quote: string;
}

export interface GremixQuote {
  text: string;
  reaction: string;
  soundType: string;
}
