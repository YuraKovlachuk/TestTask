import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationModule } from './station/station.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideModule } from './ride/ride.module';
import { RideEntity } from './ride/ride.entity';
import { StationEntity } from './station/station.entity';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    StationModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [RideEntity, StationEntity],
      synchronize: true,
    }),
    RideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
