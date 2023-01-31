import { UserRepositoryImplementation } from "../../../src/repository";
import { UserService } from "../../../src/services";
import { IUser } from "../../../src/types";

const fakeOutput: IUser[] = [
  {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email",
    job_position: "valid_job_position",
    phone: "valid_phone",
    birthdate: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "another_valid_id",
    name: "another_valid_name",
    email: "another_valid_email",
    job_position: "another_valid_job_position",
    phone: "another_valid_phone",
    birthdate: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const makeSut = () => {
  const userRepositoryImplementationStub = new UserRepositoryImplementation();
  const sut = new UserService(userRepositoryImplementationStub);

  return {
    sut,
    userRepositoryImplementationStub,
  };
};

describe("Unit tests for GetAllUsers service", () => {
  it("Should call findAllUsers 1 time", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    const userRepositoryImplementationSpy = jest.spyOn(
      userRepositoryImplementationStub,
      "findAllUsers"
    );

    await sut.GetAllUsers();

    expect(userRepositoryImplementationSpy).toHaveBeenCalledTimes(1);
  });

  it("Should not call user findAllUsers function with any arguments", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    const userRepositoryImplementationSpy = jest.spyOn(
      userRepositoryImplementationStub,
      "createUser"
    );

    await sut.GetAllUsers();

    expect(userRepositoryImplementationSpy).not.toHaveBeenCalledWith();
  });

  it("Should return an error message if no users were found", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findAllUsers")
      .mockResolvedValueOnce([]);

    const sutReturn = await sut.GetAllUsers();

    expect(sutReturn.body).toBe("Users not found");
  });

  it("Should return status 404 if no users were found", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findAllUsers")
      .mockResolvedValueOnce([]);

    const sutReturn = await sut.GetAllUsers();

    expect(sutReturn.status).toBe(404);
  });

  it("Should return data with correct structure", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findAllUsers")
      .mockResolvedValueOnce(fakeOutput);

    const sutReturn = await sut.GetAllUsers();

    expect(sutReturn.body[0]).toMatchObject<IUser>({
      id: expect.any(String),
      birthdate: expect.any(Date),
      name: expect.any(String),
      email: expect.any(String),
      job_position: expect.any(String),
      phone: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
    expect(sutReturn.body[1]).toMatchObject<IUser>({
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

  it("Should return status 200 if users are found", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findAllUsers")
      .mockResolvedValueOnce(fakeOutput);

    const sutReturn = await sut.GetAllUsers();

    expect(sutReturn.status).toBe(200);
  });

  it("Should throw error if userRepositoryImplementationStub throws", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    jest
      .spyOn(userRepositoryImplementationStub, "findAllUsers")
      .mockRejectedValueOnce(new Error(""));

    const sutReturn = sut.GetAllUsers();

    await expect(sutReturn).rejects.toThrow();
  });
});
