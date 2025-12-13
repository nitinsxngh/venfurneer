export type VotesType = {
  count: number;
  value: number;
};

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[];
};

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
};

export type SizePriceType = {
  size: string;
  price: number;
  currentPrice: number;
};

export type ProductType = {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  price: number;
  currentPrice: number;
  discount: number;
  category: string;
  images: string[];
  sizes: string[];
  sizePrices?: SizePriceType[];
  colors: string[];
  quantityAvailable: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
  createdAt: string;
  updatedAt: string;
};

export type ProductTypeList = {
  id: string;
  name: string;
  price: number;
  currentPrice: number;
  images: string[];
  discount?: number;
  sizes: string[];
  colors: string[];
};

export type ProductStoreType = {
  id: string;
  name: string;
  thumb: string;
  price: number;
  count: number;
  color: string;
  size: string;
};

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string;
};
