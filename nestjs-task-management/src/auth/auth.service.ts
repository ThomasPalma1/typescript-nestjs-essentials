import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

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

  async signIn(authCredentialsDto: AuthCredentialsDTO): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login credentials!');
    }
  }
}
