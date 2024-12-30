import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateEmailTemplateDto } from '../dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from '../dto/update-email-template.dto';
import { EmailTemplatesService } from '../services/email-templates.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Email Templates')
@Controller('email-templates')
export class EmailTemplatesController {
  constructor(private readonly emailTemplatesService: EmailTemplatesService) {}

  // Create email templates
  @Post()
  @ApiOperation({
    summary: 'Create email template.',
  })
  @ApiBody({ type: CreateEmailTemplateDto, required: true })
  async createCategory(
    @Body()
    createEmailTemplateDto: CreateEmailTemplateDto,
  ) {
    const result = await this.emailTemplatesService.create(
      createEmailTemplateDto,
    );
    return {
      status: true,
      data: result,
      statusText: 'SUCCESS',
      message: 'Template create success',
    };
  }
  @Get()
  findAll() {
    return this.emailTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailTemplatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailTemplateDto: UpdateEmailTemplateDto,
  ) {
    return this.emailTemplatesService.update(+id, updateEmailTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailTemplatesService.remove(+id);
  }
}
