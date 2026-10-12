import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployerProfile } from './employer-profile.entity';

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(EmployerProfile) private repo: Repository<EmployerProfile>,
  ) {}

  async findOne(id: string) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException('Employer not found');
    return e;
  }

  async findByUserId(userId: string) {
    const e = await this.repo.findOne({ where: { userId } });
    if (!e) throw new NotFoundException('Employer profile not found');
    return e;
  }

  async update(id: string, data: Partial<EmployerProfile>) {
    const e = await this.findOne(id);
    Object.assign(e, data);
    return this.repo.save(e);
  }
}
