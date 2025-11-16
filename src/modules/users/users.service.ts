import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  getUser(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  getByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  getUserList() {
    return this.usersRepo.find();
  }

  createUser(data: Partial<User>) {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }
}
