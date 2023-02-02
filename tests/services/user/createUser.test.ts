import { UserService } from "../../../src/services";
import { TestUserRepository } from "../../repository/user";
import { IUser, IUserAdd } from "../../../src/types/user/user.type";

const fakeInput: IUserAdd = {
  name: "valid_name",
  email: "valid_email@email.com",
  birthdate: new Date("2004-01-21"),
  job_position: "valid_job_position",
  phone: "valid_phone",
};

const makeSut = () => {
  const testUserRepository = new TestUserRepository();
  const sut = new UserService(testUserRepository);

  return {
    testUserRepository,
    sut,
  };
};

describe("Unit tests for CreateUser service", () => {
  it("Should call internal functions with correct values", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "IsBirthdateValid").mockReturnValueOnce(true);

    jest.spyOn(sut, "UserExists").mockResolvedValueOnce(false);

    jest.spyOn(sut, "IsEmailValid").mockReturnValueOnce(true);

    await sut.CreateUser(fakeInput);

    expect(sut.IsBirthdateValid).toHaveBeenCalledWith(fakeInput.birthdate);
    expect(sut.IsEmailValid).toHaveBeenCalledWith(fakeInput.email);
    expect(sut.UserExists).toHaveBeenCalledWith(fakeInput.email);
  });

  it("Should return an error message if birthdate is not valid", async () => {
    const { sut } = makeSut();

    const fakeInvalidBirthdate = new Date();
    fakeInvalidBirthdate.setDate(fakeInvalidBirthdate.getDate() + 10);

    const sutReturn = await sut.CreateUser({
      ...fakeInput,
      birthdate: fakeInvalidBirthdate,
    });

    expect(sutReturn.body).toBe("Invalid birthdate");
  });

  it("Should return status 400 if birthdate is not valid", async () => {
    const { sut } = makeSut();

    const fakeInvalidBirthdate = new Date();
    fakeInvalidBirthdate.setDate(fakeInvalidBirthdate.getDate() + 10);

    const sutReturn = await sut.CreateUser({
      ...fakeInput,
      birthdate: fakeInvalidBirthdate,
    });

    expect(sutReturn.status).toBe(400);
  });

  it("Should not return an error message if birthdate is valid", async () => {
    const { sut } = makeSut();

    const fakeValidBirthdate = new Date();
    fakeValidBirthdate.setDate(fakeValidBirthdate.getDate() - 10);

    const sutReturn = await sut.CreateUser({
      ...fakeInput,
      birthdate: fakeValidBirthdate,
    });

    expect(sutReturn.body).not.toBe("Invalid birthdate");
  });

  it("Should not return status 400 if birthdate is valid", async () => {
    const { sut } = makeSut();

    const fakeValidBirthdate = new Date();
    fakeValidBirthdate.setDate(fakeValidBirthdate.getDate() - 10);

    const sutReturn = await sut.CreateUser({
      ...fakeInput,
      birthdate: fakeValidBirthdate,
    });

    expect(sutReturn.status).not.toBe(400);
  });

  it("Should return an error message if email is invalid", async () => {
    const { sut } = makeSut();

    const fakeInvalidEmail = "invalid_email";

    const sutReturn = await sut.CreateUser({
      ...fakeInput,
      email: fakeInvalidEmail,
    });

    expect(sutReturn.body).toBe("Invalid email address");
  });

  it("Should return status 400 if email is invalid", async () => {
    const { sut } = makeSut();

    const fakeInvalidEmail = "invalid_email";

    const sutReturn = await sut.CreateUser({
      ...fakeInput,
      email: fakeInvalidEmail,
    });

    expect(sutReturn.status).toBe(400);
  });

  it("Should not return an error message if email is valid", async () => {
    const { sut } = makeSut();

    const fakeValidEmail = "valid_email@gmail.com";

    const sutReturn = await sut.CreateUser({
      ...fakeInput,
      email: fakeValidEmail,
    });

    expect(sutReturn.body).not.toBe("Invalid email address");
  });

  it("Should not return status 400 if email is valid", async () => {
    const { sut } = makeSut();

    const fakeValidEmail = "valid_email@gmail.com";

    const sutReturn = await sut.CreateUser({
      ...fakeInput,
      email: fakeValidEmail,
    });

    expect(sutReturn.status).not.toBe(400);
  });

  it("Should return false if email is invalid", async () => {
    const { sut } = makeSut();

    const fakeInvalidEmail = "invalid_email";

    const isEmailValidReturn = sut.IsEmailValid(fakeInvalidEmail);

    expect(isEmailValidReturn).toBeFalsy();
  });

  it("Should return true if email is invalid", async () => {
    const { sut } = makeSut();

    const fakeValidEmail = "valid_email@gmail.com";

    const isEmailValidReturn = sut.IsEmailValid(fakeValidEmail);

    expect(isEmailValidReturn).toBeTruthy();
  });

  it("Should return an error message if user already exists", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "UserExists").mockResolvedValueOnce(true);

    const sutReturn = await sut.CreateUser(fakeInput);

    expect(sutReturn.body).toBe("User already exists");
  });

  it("Should return status 400 if user already exists", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "UserExists").mockResolvedValueOnce(true);

    const sutReturn = await sut.CreateUser(fakeInput);

    expect(sutReturn.status).toBe(400);
  });

  it("Should not return an error message if user does not exists", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "UserExists").mockResolvedValueOnce(false);

    const sutReturn = await sut.CreateUser(fakeInput);

    expect(sutReturn.body).not.toBe("User already exists");
  });

  it("Should not return status 400 if user does not exists", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "UserExists").mockResolvedValueOnce(false);

    const sutReturn = await sut.CreateUser(fakeInput);

    expect(sutReturn.status).not.toBe(400);
  });

  it("Should successfully create user and return it with the expected fields", async () => {
    const { sut } = makeSut();

    const sutReturn = await sut.CreateUser(fakeInput);

    expect(sutReturn.body).toMatchObject<IUser>({
      id: expect.any(String),
      birthdate: expect.any(Date),
      name: expect.any(String),
      email: expect.any(String),
      job_position: expect.any(String),
      phone: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it("Should return status 201 if user is successfully created", async () => {
    const { sut } = makeSut();

    const sutReturn = await sut.CreateUser(fakeInput);

    expect(sutReturn.status).toBe(201);
  });

  it("Should throw error if testUserRepository throws", async () => {
    const { sut, testUserRepository } = makeSut();

    jest
      .spyOn(testUserRepository, "Create")
      .mockRejectedValueOnce(new Error(""));

    const sutReturn = sut.CreateUser(fakeInput);

    await expect(sutReturn).rejects.toThrow();
  });
});
