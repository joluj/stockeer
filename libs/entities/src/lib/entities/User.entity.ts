import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { IUser, UserRole } from '@stockeer/types';
import { UserDto } from '@stockeer/dtos';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  username: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole | null;

  @Column({ type: String, nullable: true })
  passwordHash: string | null;

  @CreateDateColumn()
  creationTime: Date;
  @UpdateDateColumn()
  editedTime: Date;

  constructor(dto: IUser) {
    if (dto) {
      this.id = dto.id;
      this.username = dto.username;
      this.role = dto.role;
      this.passwordHash = dto.passwordHash;
      this.creationTime = dto.creationTime;
      this.editedTime = dto.editedTime;
    } else {
      // Assign null. This only happens if dto == null, so when the file is created by NestJS/TypeORM
      const NIL = null as never;
      this.id = NIL;
      this.username = NIL;
      this.role = NIL;
      this.passwordHash = NIL;
      this.creationTime = NIL;
      this.editedTime = NIL;
    }
  }

  static createEntity(dto: UserDto): UserEntity {
    return plainToInstance(UserEntity, dto);
  }

  static createDto(entity: UserEntity): UserDto {
    return plainToInstance(UserDto, entity);
  }
}
