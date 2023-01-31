import { UserRepositoryImplementation } from "../../../src/repository";
import { UserService } from "../../../src/services";

const makeSut = () => {
  const userRepositoryStub = new UserRepositoryImplementation();
  const sut = new UserService(userRepositoryStub);

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
