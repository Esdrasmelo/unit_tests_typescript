export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthdate: Date;
  job_position?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserAdd {
  name: string;
  email: string;
  phone?: string;
  birthdate: Date;
  job_position?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  phone?: string;
  birthdate?: Date;
  job_position?: string;
}
