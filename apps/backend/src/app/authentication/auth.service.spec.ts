import { AuthService } from './auth.service';
import { UserRole } from '@malen-app/dtos';
import { UserEntity } from '@malen-app/entities';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userRepositoryFactory } from '../../testing/mocks/repositories';
import * as bcrypt from 'bcrypt';
import { environment } from '../../environments/environment';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<UserEntity>;
  let validUser: UserEntity;

  beforeEach(async () => {
    validUser = {
      id: 1,
      username: 'user',
      passwordHash: await bcrypt.hash(
        'password',
        environment.authentication.bcryptSaltRounds
      ),
      role: UserRole.USER,
      creationTime: new Date(),
      email: 'mail@mail.com',
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: environment.authentication.jwtSecret,
          signOptions: { expiresIn: environment.authentication.jwtExpiration },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: userRepositoryFactory,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    userRepository = module.get(getRepositoryToken(UserEntity));

    const findOne: (FindOneOptions) => Promise<UserEntity | undefined> = (
      options
    ) => {
      if (
        options?.where?.username === validUser.username ||
        options?.where?.email == validUser.email
      ) {
        return Promise.resolve(validUser);
      }
      return Promise.resolve(undefined);
    };

    jest.spyOn(userRepository, 'findOne').mockImplementation(findOne);
  });

  describe('validateUser', () => {
    it('should validate successful', async () => {
      expect(
        await authService.validateUser(validUser.username, 'password')
      ).toBe(validUser);
    });
    it('should not validate successful', async () => {
      expect(await authService.validateUser(validUser.username, 'aaa')).toBe(
        undefined
      );
      expect(await authService.validateUser('test', 'password')).toBe(
        undefined
      );
    });
  });
});
