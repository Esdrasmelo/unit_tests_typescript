import { TestUserRepository } from "./repository/testUserRepository.repository";
import { UserService } from "../../../src/services/user.service";
import { IUser, IUserUpdate } from "../../../src/types";

const fakeUserId = "valid_id";

const fakeInput: IUserUpdate = {
  name: "valid_name",
  email: "valid_email@email.com",
  birthdate: new Date("2001-03-15"),
  job_position: "valid_job_position",
  phone: "valid_phone",
};

const fakeUniqueUserOutput: IUser = {
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

describe("Unit tests for UpdateUser service", () => {
  it("Should call FindById function with correct values", async () => {
    const { sut, testUserRepository } = makeSut();

    const findUserByIdSpy = jest.spyOn(
      testUserRepository,
      "FindById"
    );

    await sut.UpdateUser(fakeUserId, fakeInput);

    expect(findUserByIdSpy).toBeCalledWith(fakeUserId);
  });

  it("Should call FindById function 1 time", async () => {
    const { sut, testUserRepository } = makeSut();

    const findUserByIdSpy = jest.spyOn(
      testUserRepository,
      "FindById"
    );

    await sut.UpdateUser(fakeUserId, fakeInput);

    expect(findUserByIdSpy).toBeCalledTimes(1);
  });

  it("Should return an error message if user doest not exist", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(undefined);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.body).toBe("User does not exist");
  });

  it("Should return status 404 if user doest not exist", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(undefined);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.status).toBe(404);
  });

  it("Should not return an error message if user exists", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.body).not.toBe("User does not exist");
  });

  it("Should not return status 404 if user exists", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.status).not.toBe(404);
  });

  it("Should return an error message if email is invalid", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeInvalidEmail = "invalid_email";

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      email: fakeInvalidEmail,
    });

    expect(sutReturn.body).toBe("Invalid email address");
  });

  it("Should not return an error message if email is valid", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeValidEmail = "another_valid_email@email.com";

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      email: fakeValidEmail,
    });

    expect(sutReturn.body).not.toBe("Invalid email address");
  });

  it("Should return status 400 if email is invalid", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeInvalidEmail = "invalid_email";

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      email: fakeInvalidEmail,
    });

    expect(sutReturn.status).toBe(400);
  });

  it("Should not return status 400 if email is invalid", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeValidEmail = "another_valid_email@email.com";

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      email: fakeValidEmail,
    });

    expect(sutReturn.status).not.toBe(400);
  });

  it("Should return an error message if birthdate is invalid", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeInvalidBirthdate = new Date();
    fakeInvalidBirthdate.setDate(fakeInvalidBirthdate.getDate() + 10);

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      birthdate: fakeInvalidBirthdate,
    });

    expect(sutReturn.body).toBe("Invalid birthdate");
  });

  it("Should not return an error message if birthdate is valid", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeValidBirthdate = new Date();
    fakeValidBirthdate.setDate(fakeValidBirthdate.getDate() - 10);

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      birthdate: fakeValidBirthdate,
    });

    expect(sutReturn.body).not.toBe("Invalid birthdate");
  });

  it("Should return status 400 if birthdate is invalid", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeInvalidBirthdate = new Date();
    fakeInvalidBirthdate.setDate(fakeInvalidBirthdate.getDate() + 10);

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      birthdate: fakeInvalidBirthdate,
    });

    expect(sutReturn.status).toBe(400);
  });

  it("Should not return status 400 if birthdate is valid", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeValidBirthdate = new Date();
    fakeValidBirthdate.setDate(fakeValidBirthdate.getDate() - 10);

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      birthdate: fakeValidBirthdate,
    });

    expect(sutReturn.status).not.toBe(400);
  });

  it("Should successfully update user and return the user data with correct structure", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    jest
      .spyOn(testUserRepository, "Update")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.body).toMatchObject<IUser>({
      id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      birthdate: expect.any(Date),
      job_position: expect.any(String),
      phone: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it("Should call testUserRepository with correct values", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const updateUserRepositorySpy = jest.spyOn(
      testUserRepository,
      "Update"
    );

    await sut.UpdateUser(fakeUserId, fakeInput);

    expect(updateUserRepositorySpy).toBeCalledWith(fakeUserId, fakeInput);
  });

  it("Should call testUserRepository 1 time", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const updateUserRepositorySpy = jest.spyOn(
      testUserRepository,
      "Update"
    );

    await sut.UpdateUser(fakeUserId, fakeInput);

    expect(updateUserRepositorySpy).toBeCalledTimes(1);
  });

  it("Should throw error if testUserRepository throws", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "FindById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    jest
      .spyOn(testUserRepository, "Update")
      .mockRejectedValueOnce(new Error(""));

    const sutReturn = sut.UpdateUser(fakeUserId, fakeInput);

    await expect(sutReturn).rejects.toThrow();
  });
});
