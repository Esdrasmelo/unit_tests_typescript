export interface IBankAccount {
  id: string;
  accountNumber: string;
  owner_id: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface IBankAccountAdd {
  accountNumber: string;
  owner_id: string;
  balance: number;
}

export interface IBankAccounUpdate extends Partial<IBankAccountAdd> {}
