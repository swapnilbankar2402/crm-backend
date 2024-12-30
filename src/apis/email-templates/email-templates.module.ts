import { Module } from '@nestjs/common';
import { EmailTemplatesService } from './services/email-templates.service';
import { EmailTemplatesController } from './controllers/email-templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplates } from 'src/database/entities/email-template.entity';

@Module({
  imports : [TypeOrmModule.forFeature([EmailTemplates])],
  controllers: [EmailTemplatesController],
  providers: [EmailTemplatesService]
})
export class EmailTemplatesModule {}
