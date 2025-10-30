export type SnackbarType = "success" | "error";

export interface Wish {
  id: string | number;
  title: string;
  image: string;
  description: string;
  price: number;
  createdAt: string; 
}

export type CreateWish = Omit<Wish, "id" | "createdAt">;
export type UpdateWish = { id: Wish["id"] } & Partial<Omit<Wish, "id" | "createdAt">>;

export type DateSort = "new_first" | "old_first";
export type PriceSort = "high_to_low" | "low_to_high";

export interface SortState {
  date: DateSort;
  price: PriceSort;
}


