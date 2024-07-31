import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './users.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({
      username,
      password,
    });

    await this.save(user);
  }
}
