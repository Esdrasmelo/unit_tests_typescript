import { UserService } from "../../../src/services/user.service";
import { UserRepositoryImplementation } from "../../../src/repository";
import { IUser, IUserAdd } from "../../../src/types/user/user.type";

const fakeInput: IUserAdd = {
  name: "valid_name",
  email: "valid_email",
  birthdate: new Date("2004-01-21"),
  job_position: "valid_job_position",
  phone: "valid_phone",
};

const fakeOutput: IUser[] = [
  {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email",
    birthdate: new Date("2004-01-21"),
    job_position: "valid_job_position",
    phone: "valid_phone",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const makeSut = () => {
  const userRepositoryImplementationStub = new UserRepositoryImplementation();
  const sut = new UserService(userRepositoryImplementationStub);

  return {
    userRepositoryImplementationStub,
    sut,
  };
};

describe("Unit tests for CreateUser resource", () => {
  it("Should call internal functions with correct values", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest.spyOn(sut, "IsBirthdateValid").mockReturnValueOnce(true);

    jest.spyOn(sut, "UserAlreadyExists").mockResolvedValueOnce(false);

    await sut.CreateUser(fakeInput);

    expect(sut.IsBirthdateValid).toHaveBeenCalledWith(fakeInput.birthdate);
    expect(sut.UserAlreadyExists).toHaveBeenCalledWith(fakeInput.email);
  });

  it("Should return an error message if birthdate is not valid", async () => {
    const { sut } = makeSut();

    const fakeInvalidBirthdate = new Date();
    fakeInvalidBirthdate.setDate(fakeInvalidBirthdate.getDate() + 10);

    const sutReturn = sut.CreateUser({
      ...fakeInput,
      birthdate: fakeInvalidBirthdate,
    });

    await expect(sutReturn).resolves.toThrowError("Invalid birthdate");
  });

  it("Should not return an error message if birthdate is valid", async () => {
    const { sut } = makeSut();

    const fakeValidBirthdate = new Date();
    fakeValidBirthdate.setDate(fakeValidBirthdate.getDate() - 10);

    const sutReturn = sut.CreateUser({
      ...fakeInput,
      birthdate: fakeValidBirthdate,
    });

    await expect(sutReturn).resolves.not.toThrowError("Invalid birthdate");
  });

  it("Should return an error message if user already exists", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "UserAlreadyExists").mockResolvedValueOnce(true);

    const sutReturn = sut.CreateUser(fakeInput);

    await expect(sutReturn).resolves.toThrowError("User already exists");
  });

  it("Should not return an error message if user does not exists", async () => {
    const { sut } = makeSut();

    jest.spyOn(sut, "UserAlreadyExists").mockResolvedValueOnce(false);

    const sutReturn = sut.CreateUser(fakeInput);

    await expect(sutReturn).resolves.not.toThrowError("User already exists");
  });

  it("Should return true if user already exists", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserByEmail")
      .mockResolvedValueOnce(fakeOutput[0]);

    const userAlreadyExistsReturn = await sut.UserAlreadyExists("valid_email");

    expect(userAlreadyExistsReturn).toBeTruthy();
  });

  it("Should return false if user does not exist", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findUserByEmail")
      .mockResolvedValueOnce(undefined);

    const userAlreadyExistsReturn = await sut.UserAlreadyExists(
      "another_valid_email"
    );

    expect(userAlreadyExistsReturn).toBeFalsy();
  });

  it("Should create user and return it", async () => {
    const { sut } = makeSut();

    const sutReturn = await sut.CreateUser(fakeInput);

    expect(sutReturn).toMatchObject<IUser>({
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
});
