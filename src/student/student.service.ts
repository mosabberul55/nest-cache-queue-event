import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class StudentService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  private readonly students = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Sarah Smith',
    },
  ];

  async getStudents() {
    {
      return await this.getStudentFromDb();
    }
  }

  async getStudentFromDb() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.students);
      }, 3000);
    });
  }
}
