import { BankAccountService } from "../../../src/services/bankAccount.service";
import { IBankAccount, IBankAccountAdd } from "../../../src/types/bankAccount";
import { TestBankAccountRepository } from "../../repository/bankAccount";

const fakeInput: IBankAccountAdd = {
  accountNumber: "valid_account_number",
  owner_id: "valid_owner_id",
  amountToBeDeposited: 100,
};

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
  const sut = new BankAccountService(testBankAccountRepository);

  return {
    sut,
    testBankAccountRepository,
  };
};

describe("Unit tests for CreateBankAccount service", () => {
  it("Should return an error if a bank account for a specific account number already exists", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(true);

    const sutReturn = await sut.CreateBankAccount(fakeInput);

    expect(sutReturn.body).toBe(
      "A bank account for this account number already exists"
    );
  });

  it("Should not return an error if a bank account for a specific account number does not exist", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(false);

    const sutReturn = await sut.CreateBankAccount(fakeInput);

    expect(sutReturn.body).not.toBe(
      "A bank account for this account number already exists"
    );
  });

  it("Should return status 400 if a bank account for a specific account number already exists", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(true);

    const sutReturn = await sut.CreateBankAccount(fakeInput);

    expect(sutReturn.status).toBe(400);
  });

  it("Should not return status 400 if a bank account for a specific account number does not exist", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(false);

    const sutReturn = await sut.CreateBankAccount(fakeInput);

    expect(sutReturn.status).not.toBe(400);
  });

  it("Should return an error if bank account is trying to be created without any deposit", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(false);

    const sutReturn = await sut.CreateBankAccount({
      ...fakeInput,
      amountToBeDeposited: 0,
    });

    expect(sutReturn.body).toBe(
      "You must deposit to be able to create a bank account"
    );
  });

  it("Should not return an error if bank account is not trying to be created without any deposit", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(false);

    const sutReturn = await sut.CreateBankAccount(fakeInput);

    expect(sutReturn.body).not.toBe(
      "You must deposit to be able to create a bank account"
    );
  });

  it("Should return status 400 if bank account is trying to be created without any deposit", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(false);

    const sutReturn = await sut.CreateBankAccount({
      ...fakeInput,
      amountToBeDeposited: 0,
    });

    expect(sutReturn.status).toBe(400);
  });

  it("Should not return status 400 if bank account is not trying to be created without any deposit", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(false);

    const sutReturn = await sut.CreateBankAccount(fakeInput);

    expect(sutReturn.status).not.toBe(400);
  });

  it("Should call Create from testBankAccountRepository with correct values", async () => {
    const { sut, testBankAccountRepository } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(false);

    const createUserSpy = jest.spyOn(testBankAccountRepository, "Create");

    await sut.CreateBankAccount(fakeInput);

    expect(createUserSpy).toBeCalledWith(fakeInput);
  });

  it("Should successfully create bank account", async () => {
    const { sut, testBankAccountRepository } = makeSut();

    jest.spyOn(sut, "BankAccountExists").mockResolvedValueOnce(false);

    jest
      .spyOn(testBankAccountRepository, "Create")
      .mockResolvedValueOnce(fakeOutput);

    const sutReturn = await sut.CreateBankAccount(fakeInput);

    expect(sutReturn.body).toMatchObject<IBankAccount>({
      id: expect.any(String),
      accountNumber: expect.any(String),
      balance: expect.any(Number),
      owner_id: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });
});
