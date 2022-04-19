import { UserEntity } from '@stockeer/entities';

export class MockConnection {}

export class MockRepository<ENT> {
  public async find(): Promise<ENT[]> {
    return Promise.resolve([]);
  }
  public async findOne(): Promise<ENT | undefined> {
    return Promise.resolve(undefined);
  }
  public async save(): Promise<void> {
    return Promise.resolve();
  }
  public async delete(): Promise<void> {
    return Promise.resolve();
  }
}

export const userRepositoryFactory: () => MockRepository<UserEntity> = () => {
  return new MockRepository<UserEntity>();
};
