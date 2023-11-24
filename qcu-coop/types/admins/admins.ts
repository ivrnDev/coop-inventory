export type Admin = {
  admin_id: number;
  admin_name: string;
  admin_username: string;
  admin_password: string;
  role: string;
  profile_picture: string;
  isDeleted: number;
};

export type DeletedAdmin = {
  admin_id: number;
  admin_name: string;
  admin_username: string;
  role: string;
};
