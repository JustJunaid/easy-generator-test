import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { SignUpDto, SignInDto } from './dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private logger: LoggerService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, name } = signUpDto;

    try {
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        this.logger.warn(`Signup attempt with existing email: ${email}`);
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await this.userModel.create({
        email,
        name,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({ sub: user._id });
      this.logger.log(`User successfully registered: ${email}`);
      
      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      };
    } catch (error) {
      this.logger.error(
        `Failed to register user: ${email}`,
        error.stack,
        'AuthService'
      );
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        this.logger.warn(`Failed login attempt for non-existent user: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Failed login attempt for user: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign({ sub: user._id });
      this.logger.log(`User successfully logged in: ${email}`);
      
      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      };
    } catch (error) {
      this.logger.error(
        `Login error for user: ${email}`,
        error.stack,
        'AuthService'
      );
      throw error;
    }
  }
} 