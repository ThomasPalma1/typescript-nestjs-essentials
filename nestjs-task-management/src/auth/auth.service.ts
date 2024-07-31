import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Using the generic repository
    private userRepositoryCustom: UserRepository, // Using the custom repository
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.userRepositoryCustom.createUser(authCredentialsDto);
  }
}
