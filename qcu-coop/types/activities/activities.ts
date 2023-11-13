export type Activities = {
  id: number;
  admin_id: number;
  action: string;
  target: string;
  object: string;
  target_change: string | null;
  message: string;
  date: string;
};
