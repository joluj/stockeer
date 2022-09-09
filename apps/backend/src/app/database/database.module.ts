import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../../environments/environment';
import { ProductEntity, StorageEntity, UserEntity } from '@stockeer/entities';
import { InitDB1650362930944 } from './migrations/1650362930944-InitDB';
import { StockeerAndProductEntities1662750499394 } from './migrations/1662750499394-StockeerAndProductEntities';

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
        migrations: [
          InitDB1650362930944,
          StockeerAndProductEntities1662750499394,
        ],
        migrationsRun: environment.database.runMigrations,
      }
    ),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
