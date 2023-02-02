import { createdResponse } from "../protocols/http.protocols";
import { IHttpResponse } from "../types";
import {
  IBankAccounUpdate,
  IBankAccount,
  IBankAccountAdd,
} from "../types/bankAccount";
import { IBankAccountRepositoryPort } from "../types/repository/bankAccountRepositoryPort.type";

export class BankAccountService {
  private bankAccountRepositoryPort: IBankAccountRepositoryPort;

  constructor(bankAccountRepositoryPort: IBankAccountRepositoryPort) {
    this.bankAccountRepositoryPort = bankAccountRepositoryPort;
  }

  async CreateBankAccount(
    inputData: IBankAccountAdd
  ): Promise<IHttpResponse<IBankAccount | string>> {
    try {
      const createdBankAccount = await this.bankAccountRepositoryPort.Create(
        inputData
      );

      return createdResponse<IBankAccount>(createdBankAccount);
    } catch (error) {
      throw new Error(error);
    }
  }
}
