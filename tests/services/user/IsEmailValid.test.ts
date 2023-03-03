import { TestUserRepository } from "../../repository/user";
import { UserService } from "../../../src/services";

const makeSut = () => {
  const testUserRepository = new TestUserRepository();
  const sut = new UserService(testUserRepository);

  return {
    sut,
  };
};

describe("Unit tests for IsEmailValid method", () => {
  it("Should return false if email is not valid", async () => {
    const { sut } = makeSut();

    const fakeInvalidEmail = "invalid_email";

    const sutReturn = sut.IsEmailValid(fakeInvalidEmail);

    expect(sutReturn).toBeFalsy();
  });

  it("Should return true if email is valid", async () => {
    const { sut } = makeSut();

    const fakeValidEmail = "valid_email@email.com";

    const sutReturn = sut.IsEmailValid(fakeValidEmail);

    expect(sutReturn).toBeTruthy();
  });
});
