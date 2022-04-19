import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { environment } from '../../environments/environment';
import { UserEntity } from '@stockeer/entities';
import { JwtResponseDto, UserRole } from '@stockeer/dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserEntity | null> {
    const user = await this.findRegisteredByUsername(username);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return user;
    }
    return null;
  }

  async createAdminUser(
    username: string,
    password: string
  ): Promise<JwtResponseDto> {
    const entity = new UserEntity({
      id: 0,
      username: username,
      passwordHash: await bcrypt.hash(
        password,
        environment.authentication.bcryptSaltRounds
      ),
      role: UserRole.ADMIN,
      creationTime: undefined as unknown as Date,
      editedTime: undefined as unknown as Date,
    });

    return this.createJwt(await this.userRepository.save(entity));
  }

  /**
   * Creates a signed Jwt from a given UserEntity Entity.
   */
  async createJwt(user: UserEntity): Promise<JwtResponseDto> {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        username: user.username,
        role: user.role,
      }),
    };
  }

  async findRegisteredByUsername(
    username: string
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: { username },
    });
  }
}
