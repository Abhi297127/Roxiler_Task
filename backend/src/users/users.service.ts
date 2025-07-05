import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: any) {
    data.password = await bcrypt.hash(data.password, 10);
    return this.usersRepository.save(data);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll() {
    return this.usersRepository.find({
      order: {
        name: 'ASC',
        email: 'ASC',
      },
    });
  }  
}
