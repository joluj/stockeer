import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../../environments/environment';
import { ProductEntity, StorageEntity, UserEntity } from '@stockeer/entities';
import { Init1662751734633 } from './migrations/1662751734633-Init';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      // DB Connection Information
      {
        type: 'postgres',
        host: environment.database.host,
        port: environment.database.port,
        username: environment.database.user,
        password: environment.database.password,
        database: environment.database.database,
        entities: [UserEntity, StorageEntity, ProductEntity],
        synchronize: environment.database.synchronize,
        migrations: [Init1662751734633],
        migrationsRun: environment.database.runMigrations,
      }
    ),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
