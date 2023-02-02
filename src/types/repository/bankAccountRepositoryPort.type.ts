import { IBankAccount, IBankAccountAdd } from "../bankAccount";
import { IBaseRepositoryPort } from "./baseRepositoryPort.type";

export interface IBankAccountRepositoryPort
  extends IBaseRepositoryPort<IBankAccount, IBankAccountAdd> {
  FindByAccountNumber: (accountNumber: string) => Promise<IBankAccount | undefined>;
}
