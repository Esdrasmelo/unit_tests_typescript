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

describe("Unit tests for Get All Users resource", () => {
  it("Should call userRepositoryImplementation with correct values", async () => {
    const { sut, userRepositoryImplementationStub } = makeSut();

    const userRepositoryImplementationSpy = jest.spyOn(
      userRepositoryImplementationStub,
      "findAllUsers"
    );

    await sut.GetAllUsers();

    expect(userRepositoryImplementationSpy).toHaveBeenCalledTimes(1);
  });
});
