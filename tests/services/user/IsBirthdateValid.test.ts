import { TestUserRepository } from "../../repository/user";
import { UserService } from "../../../src/services";

const makeSut = () => {
  const testUserRepository = new TestUserRepository();
  const sut = new UserService(testUserRepository);

  return {
    sut,
  };
};

describe("Unit tests for IsBirthdateValid method", () => {
  it("Should return true if birthdate is valid", async () => {
    const { sut } = makeSut();

    const fakeValidBirthdate = new Date();
    fakeValidBirthdate.setDate(fakeValidBirthdate.getDate() - 10);

    const sutReturn = sut.IsBirthdateValid(fakeValidBirthdate);

    expect(sutReturn).toBeTruthy();
  });

  it("Should return false if birthdate is not valid", async () => {
    const { sut } = makeSut();

    const fakeInvalidBirthdate = new Date();
    fakeInvalidBirthdate.setDate(fakeInvalidBirthdate.getDate() + 10);

    const sutReturn = sut.IsBirthdateValid(fakeInvalidBirthdate);

    expect(sutReturn).toBeFalsy();
  });
});
