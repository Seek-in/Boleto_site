export type Category =
  | 'Alimentation'
  | 'Mode'
  | 'Maison'
  | 'Loisirs'
  | 'Boissons'
  | 'Beauté';

export type Offer = {
  id: string;
  title: string;
  subtitle: string;
  points: number;
  stamps?: { current: number; total: number };
};

export type Commerce = {
  id: string;
  name: string;
  category: Category;
  status: 'ouvert' | 'ferme';
  distance: string;
  address: string;
  description: string;
  offers: Offer[];
};

export const categories: Category[] = [
  'Alimentation',
  'Mode',
  'Maison',
  'Loisirs',
  'Boissons',
  'Beauté',
];

/** Commerces partenaires — vide pour l'instant, à remplir plus tard */
export const commerces: Commerce[] = [];

export function getCommerceById(id: string): Commerce | undefined {
  return commerces.find((c) => c.id === id);
}
