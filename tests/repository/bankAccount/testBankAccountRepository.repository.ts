import { randomUUID } from "crypto";
import { IBankAccount, IBankAccountAdd } from "../../../src/types/bankAccount";
import { IBankAccountRepositoryPort } from "../../../src/types/repository";

export class TestBankAccountRepository implements IBankAccountRepositoryPort {
  private bankAccountDatabase: IBankAccount[];

  async FindAll(): Promise<IBankAccount[]> {
    try {
      return this.bankAccountDatabase;
    } catch (error) {
      throw new Error(error);
    }
  }

  async FindById(id: string): Promise<IBankAccount | undefined> {
    try {
      const bankAccount = this.bankAccountDatabase.find(
        (account) => account.id === id
      );

      return bankAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

  async Create(inputData: IBankAccountAdd): Promise<IBankAccount> {
    try {
      const generatedId = randomUUID();

      this.bankAccountDatabase.push({
        ...inputData,
        id: generatedId,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const bankAccount = await this.FindById(generatedId);

      return bankAccount!;
    } catch (error) {
      throw new Error(error);
    }
  }

  async Update(
    id: string,
    inputData: Partial<IBankAccount>
  ): Promise<IBankAccount> {
    try {
      const bankAccountIndex = this.bankAccountDatabase.indexOf(
        this.bankAccountDatabase.find((account) => account.id === id)!
      );

      this.bankAccountDatabase[bankAccountIndex] = {
        ...inputData,
        ...this.bankAccountDatabase[bankAccountIndex],
      };

      return this.bankAccountDatabase[bankAccountIndex];
    } catch (error) {
      throw new Error(error);
    }
  }

  async Delete(id: string): Promise<IBankAccount> {
    try {
      const bankAccount = this.bankAccountDatabase.find(
        (account) => account.id === id
      )!;

      const bankAccountIndex = this.bankAccountDatabase.indexOf(bankAccount);

      this.bankAccountDatabase.splice(bankAccountIndex, 1);

      return bankAccount;
    } catch (error) {
      throw new Error();
    }
  }
}
