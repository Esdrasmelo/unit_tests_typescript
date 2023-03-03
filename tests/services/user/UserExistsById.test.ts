import { TestUserRepository } from "../../repository/user";
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
  const testUserRepository = new TestUserRepository();
  const sut = new UserService(testUserRepository);

  return {
    sut,
    testUserRepository,
  };
};

describe("Unit tests for UserExistsById method", () => {
  it("Should return true if user already exists", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUser);

    const userAlreadyExistsReturn = await sut.UserExistsById(
      "valid_id"
    );

    expect(userAlreadyExistsReturn).toBe(true);
  });

  it("Should return false if user does not exist", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(undefined);

    const userAlreadyExistsReturn = await sut.UserExistsById(
      "another_valid_id"
    );

    expect(userAlreadyExistsReturn).toBe(false);
  });
});
