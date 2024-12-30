import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/app.config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EmailTemplatesModule } from './apis/email-templates/email-templates.module';

@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    // NestjsScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const appConfig = new Config(config);
        const dbConfig = appConfig.getDBConfiguration();
        return {
          type: 'postgres',
          host: dbConfig.host,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          synchronize: false,
          logging: dbConfig.logging,
          migrationsRun: false,
          entities: [__dirname + '/database/entities/**/*.entity.{ts,js}'],
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),

    EmailTemplatesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
