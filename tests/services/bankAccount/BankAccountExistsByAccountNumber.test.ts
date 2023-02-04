import { BankAccountService } from "../../../src/services/bankAccount.service";
import { UserService } from "../../../src/services/user.service";
import { IBankAccount } from "../../../src/types/bankAccount";
import {
  TestBankAccountRepository,
  TestUserRepository,
} from "../../repository";

const fakeAccountNumberInput = "valid_account_number";

const fakeOutput: IBankAccount = {
  id: "valid_id",
  balance: 100,
  accountNumber: "valid_account_number",
  owner_id: "valid_owner_id",
  created_at: new Date(),
  updated_at: new Date(),
};

const makeSut = () => {
  const testBankAccountRepository = new TestBankAccountRepository();
  const testUserRepository = new TestUserRepository();
  const userService = new UserService(testUserRepository);
  const sut = new BankAccountService(testBankAccountRepository, userService);

  return {
    sut,
    testBankAccountRepository,
  };
};

describe("Unit tests for BankAccountExistsByAccountNumber service method", () => {
  it("Should return false if bank account does not exist", async () => {
    const { sut, testBankAccountRepository } = makeSut();

    jest
      .spyOn(testBankAccountRepository, "FindByAccountNumber")
      .mockResolvedValueOnce(undefined);

    const sutReturn = await sut.BankAccountExistsByAccountNumber(
      fakeAccountNumberInput
    );

    expect(sutReturn).toBe(false);
  });

  it("Should return true if bank account already exists", async () => {
    const { sut, testBankAccountRepository } = makeSut();

    jest
      .spyOn(testBankAccountRepository, "FindByAccountNumber")
      .mockResolvedValueOnce(fakeOutput);

    const sutReturn = await sut.BankAccountExistsByAccountNumber(
      fakeAccountNumberInput
    );

    expect(sutReturn).toBe(true);
  });

  it("Should throw if FindByAccountNumber from testBankAccountRepository throws", async () => {
    const { sut, testBankAccountRepository } = makeSut();

    jest
      .spyOn(testBankAccountRepository, "FindByAccountNumber")
      .mockRejectedValueOnce(new Error(""));

    const sutReturn = sut.BankAccountExistsByAccountNumber(
      fakeAccountNumberInput
    );

    await expect(sutReturn).rejects.toThrowError();
  });
});
