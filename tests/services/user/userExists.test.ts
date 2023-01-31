import { UserRepositoryImplementation } from "../../../src/repository";
import { UserService } from "../../../src/services";
import { IUser } from "../../../src/types";

const fakeUser: IUser = {
  id: "valid_id",
  name: "valid_name",
  email: "valid_email@email.com",
  birthdate: new Date("2004-01-21"),
  job_position: "valid_job_position",
  phone: "valid_phone",
  created_at: new Date(),
  updated_at: new Date(),
};

const makeSut = () => {
  const userRepositoryStub = new UserRepositoryImplementation();
  const sut = new UserService(userRepositoryStub);

  return {
    sut,
    userRepositoryStub,
  };
};

describe("User Exists method", () => {
  it("Should return true if user already exists", async () => {
    const { sut, userRepositoryStub } = makeSut();

    jest
      .spyOn(userRepositoryStub, "findUserByEmail")
      .mockResolvedValueOnce(fakeUser);

    const userAlreadyExistsReturn = await sut.UserExists(
      "valid_email@email.com"
    );

    expect(userAlreadyExistsReturn).toBeTruthy();
  });

  it("Should return false if user does not exist", async () => {
    const { sut, userRepositoryStub } = makeSut();

    jest
      .spyOn(userRepositoryStub, "findUserByEmail")
      .mockResolvedValueOnce(undefined);

    const userAlreadyExistsReturn = await sut.UserExists(
      "another_valid_email@email.com"
    );

    expect(userAlreadyExistsReturn).toBeFalsy();
  });
});
