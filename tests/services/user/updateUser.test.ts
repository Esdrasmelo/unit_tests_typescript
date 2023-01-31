import { UserRepositoryImplementation } from "../../../src/repository/user/userRepositoryImplementation.repository";
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
  const userRepositoryImplementationStub = new UserRepositoryImplementation();
  const sut = new UserService(userRepositoryImplementationStub);

  return {
    sut,
    userRepositoryImplementationStub,
  };
};

describe("Unit tests for UpdateUser service", () => {
  it("Should call findUserById function with correct values", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    const findUserByIdSpy = jest.spyOn(
      userRepositoryImplementationStub,
      "findUserById"
    );

    await sut.UpdateUser(fakeUserId, fakeInput);

    expect(findUserByIdSpy).toBeCalledWith(fakeUserId);
  });

  it("Should call findUserById function 1 time", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    const findUserByIdSpy = jest.spyOn(
      userRepositoryImplementationStub,
      "findUserById"
    );

    await sut.UpdateUser(fakeUserId, fakeInput);

    expect(findUserByIdSpy).toBeCalledTimes(1);
  });

  it("Should return an error message if user doest not exist", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(undefined);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.body).toBe("User does not exist");
  });

  it("Should return status 404 if user doest not exist", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(undefined);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.status).toBe(404);
  });

  it("Should not return an error message if user exists", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.body).not.toBe("User does not exist");
  });

  it("Should not return status 404 if user exists", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const sutReturn = await sut.UpdateUser(fakeUserId, fakeInput);

    expect(sutReturn.status).not.toBe(404);
  });

  it("Should return an error message if email is invalid", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeInvalidEmail = "invalid_email";

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      email: fakeInvalidEmail,
    });

    expect(sutReturn.body).toBe("Invalid email address");
  });

  it("Should not return an error message if email is valid", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeValidEmail = "another_valid_email@email.com";

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      email: fakeValidEmail,
    });

    expect(sutReturn.body).not.toBe("Invalid email address");
  });

  it("Should return status 400 if email is invalid", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeInvalidEmail = "invalid_email";

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      email: fakeInvalidEmail,
    });

    expect(sutReturn.status).toBe(400);
  });

  it("Should not return status 400 if email is invalid", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const fakeValidEmail = "another_valid_email@email.com";

    const sutReturn = await sut.UpdateUser(fakeUserId, {
      ...fakeInput,
      email: fakeValidEmail,
    });

    expect(sutReturn.status).not.toBe(400);
  });

  it("Should return an error message if birthdate is invalid", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
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
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
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
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
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
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
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
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    jest
      .spyOn(userRepositoryImplementationStub, "updateUser")
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

  it("Should call userRepositoryImplementationStub with correct values", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const updateUserRepositorySpy = jest.spyOn(
      userRepositoryImplementationStub,
      "updateUser"
    );

    await sut.UpdateUser(fakeUserId, fakeInput);

    expect(updateUserRepositorySpy).toBeCalledWith(fakeUserId, fakeInput);
  });

  it("Should call userRepositoryImplementationStub 1 time", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    const updateUserRepositorySpy = jest.spyOn(
      userRepositoryImplementationStub,
      "updateUser"
    );

    await sut.UpdateUser(fakeUserId, fakeInput);

    expect(updateUserRepositorySpy).toBeCalledTimes(1);
  });

  it("Should throw error if userRepositoryImplementationStub throws", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserById")
      .mockResolvedValueOnce(fakeUniqueUserOutput);

    jest
      .spyOn(userRepositoryImplementationStub, "updateUser")
      .mockRejectedValueOnce(new Error(""));

    const sutReturn = sut.UpdateUser(fakeUserId, fakeInput);

    await expect(sutReturn).rejects.toThrow();
  });
});
