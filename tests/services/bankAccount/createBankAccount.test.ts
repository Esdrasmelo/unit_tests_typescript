import { BankAccountService } from "../../../src/services/bankAccount.service";
import { IBankAccountAdd } from "../../../src/types/bankAccount";
import { TestBankAccountRepository } from "../../repository/bankAccount";

const fakeInput: IBankAccountAdd = {
  accountNumber: "valid_account_number",
  balance: 100,
  owner_id: "valid_owner_id",
};

const makeSut = () => {
  const testBankAccountRepository = new TestBankAccountRepository();
  const sut = new BankAccountService(testBankAccountRepository);

  return {
    sut,
    testBankAccountRepository,
  };
};

describe("Unit tests for CreateBankAccount service", () => {
  it("Should call Create from testBankAccountRepository with correct values", async () => {
    const { sut, testBankAccountRepository } = makeSut();

    const createUserSpy = jest.spyOn(testBankAccountRepository, "Create");

    await sut.CreateBankAccount(fakeInput);

    expect(createUserSpy).toBeCalledWith(fakeInput);
  });
});
