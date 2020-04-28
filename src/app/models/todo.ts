export interface Todo {
  id?: string;
  name: string;
  description: string;
  status: string;
  userId: number;
  categroyId: number;
  created_at?: string;
  updtated_at?: string;
}