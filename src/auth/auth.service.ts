import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CandidateProfile } from '../candidates/candidate-profile.entity';
import { EmployerProfile } from '../employers/employer-profile.entity';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { UserRole } from '../common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(CandidateProfile) private candidates: Repository<CandidateProfile>,
    @InjectRepository(EmployerProfile) private employers: Repository<EmployerProfile>,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.users.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.users.create({
      email: dto.email,
      passwordHash,
      role: dto.role,
    });
    await this.users.save(user);

    if (dto.role === UserRole.CANDIDATE) {
      const profile = this.candidates.create({
        userId: user.id,
        firstName: dto.firstName || 'Кандидат',
        lastName: dto.lastName || '',
        position: dto.position || 'Спеціаліст',
        location: dto.location || 'Київ',
        skills: [],
        employmentTypes: [],
        workSchedules: [],
        languages: [],
      });
      await this.candidates.save(profile);
    } else if (dto.role === UserRole.EMPLOYER) {
      const profile = this.employers.create({
        userId: user.id,
        companyName: dto.companyName || 'Компанія',
        contactPerson: dto.contactPerson || dto.firstName || 'HR',
      });
      await this.employers.save(profile);
    }

    return this.tokenResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.tokenResponse(user);
  }

  private tokenResponse(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwt.sign(payload),
      user: { id: user.id, email: user.email, role: user.role },
    };
  }
}
