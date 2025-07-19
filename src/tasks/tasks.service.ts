import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>,) {}

  async create(createTaskDto: CreateTaskDto) {
    const newtask = this.taskRepository.create(createTaskDto);
    
    return await this.taskRepository.save(newtask);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const foundTask = await this.taskRepository.findOne({ where: { id } });
    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return foundTask;
  }

  async findStatus(statusString: string) {
    const statusEnum = statusString as  TaskStatus;
    return this.taskRepository.find({ where: { status: statusEnum } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.findOne(id);
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async getTasksByCategory(categoryId: number): Promise<Task[]>{
    const found = await this.taskRepository.find({
      where: {
        category: {
          id: categoryId
        }
      }
    })
    return found
  }

  async remove(id: number) {
    return await this.taskRepository.delete(id);
  }
}
