import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import nodeHtmlToImage from 'node-html-to-image';
import { CreateEmailTemplateDto } from '../dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from '../dto/update-email-template.dto';
import { EmailTemplates } from 'src/database/entities/email-template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailTemplatesService {
  constructor(
    @InjectRepository(EmailTemplates)
    private readonly emailTemplatesRepository: Repository<EmailTemplates>,
  ) {}

  // Create email templates
 async create(createEmailTemplateDto: CreateEmailTemplateDto) {
    const existing = await this.emailTemplatesRepository.findOne({
      where: {
        name : createEmailTemplateDto.name
      }
    })

    if(existing){
     throw new ConflictException('Already exists !')
    }

    // convert html into base64
    let Image = '';
    await nodeHtmlToImage({
      html: `<h1>Bandya us herw</h1>`,
    }).then(async (data: any) => {
      let image = await data.toString('base64');
      Image = await image;
    });

    const create = await this.emailTemplatesRepository.create({
      ...createEmailTemplateDto,
      preview : Image
    })

    return await this.emailTemplatesRepository.save(create);
  }

  findAll() {
    return `This action returns all emailTemplates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailTemplate`;
  }

  update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return `This action updates a #${id} emailTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailTemplate`;
  }
}
