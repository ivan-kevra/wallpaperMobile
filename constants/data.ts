const categories: string[] = [
  'backgrounds',
  'fashion',
  'nature',
  'science',
  'education',
  'feelings',
  'health',
  'people',
  'religion',
  'places',
  'animals',
  'industry',
  'computer',
  'food',
  'sports',
  'transportation',
  'travel',
  'buildings',
  'business',
  'music',
];

type FiltersType = {
  [key: string]: string[];
}
const filters: FiltersType = {
  order: ["popular", "latest"],
  orientation: ["horizontal", "vertical"],
  type: ["photo", "illustration", "vector"],
  colors: ["red", "orange", "yellow", "green", "turquoise", "blue", "pink", "gray", "black", "brown"
  ]
}

type DataType = {
  categories: string[];
  filters: FiltersType;
}
export const data: DataType = {
  categories,
  filters
};
