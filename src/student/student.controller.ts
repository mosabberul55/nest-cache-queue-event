import { Controller, Get, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CacheTTL } from '@nestjs/common/cache';

@UseInterceptors(CacheInterceptor)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @HttpCode(HttpStatus.OK)
  @CacheTTL(20 * 1000)
  @Get()
  async getStudents() {
    return this.studentService.getStudents();
  }
}
