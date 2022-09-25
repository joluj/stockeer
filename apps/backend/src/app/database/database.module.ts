import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../../environments/environment';
import {
  BarcodeEntity,
  ProductEntity,
  StorageEntity,
  UserEntity,
} from '@stockeer/entities';
import { Init1662751734633 } from './migrations/1662751734633-Init';
import { BarcodeEntities1662819433365 } from './migrations/1662819433365-BarcodeEntities';

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
        entities: [UserEntity, StorageEntity, ProductEntity, BarcodeEntity],
        synchronize: environment.database.synchronize,
        migrations: [Init1662751734633, BarcodeEntities1662819433365],
        migrationsRun: environment.database.runMigrations,
      }
    ),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
