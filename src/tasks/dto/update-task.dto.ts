import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, { message: 'Status must be a valid TaskStatus value (PENDING, IN_PROGRESS, COMPLETED).' })
  status: TaskStatus;
}
