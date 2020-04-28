export interface Category {
  id?: string;
  name: string;
  status: "important" | "freetime" |"family";
  created_at?: string;
  updtated_at?: string;
}