import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
