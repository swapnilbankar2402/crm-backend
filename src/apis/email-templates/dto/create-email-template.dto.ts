import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateEmailTemplateDto {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    html: string;
}
