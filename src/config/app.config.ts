import { ConfigService } from '@nestjs/config';

export class Config {
  constructor(private readonly configService: ConfigService) {}

  getDBConfiguration() {
    let dbConfig: any = {};

    dbConfig = {
      host: this.configService.get('DB_HOST'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      logging: this.configService.get('DB_LOGGING'),
    };

    return dbConfig;
  }
}
