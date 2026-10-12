import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(CandidateProfile)
    private repo: Repository<CandidateProfile>,
  ) {}

  async findAll(query: {
    position?: string;
    location?: string;
    minExperience?: number;
    skill?: string;
  }) {
    const qb = this.repo
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.workHistory', 'work')
      .leftJoinAndSelect('c.education', 'edu')
      .leftJoinAndSelect('c.projects', 'proj')
      .where('c.profileVisible = true');

    if (query.position) {
      qb.andWhere('c.position ILIKE :position', { position: `%${query.position}%` });
    }
    if (query.location && query.location !== 'all') {
      qb.andWhere('c.location = :location', { location: query.location });
    }
    if (query.minExperience) {
      qb.andWhere('c.experienceYears >= :minExp', { minExp: query.minExperience });
    }
    if (query.skill) {
      qb.andWhere('c.skills ILIKE :skill', { skill: `%${query.skill}%` });
    }

    return qb.orderBy('c.updatedAt', 'DESC').getMany();
  }

  async findOne(id: string) {
    const c = await this.repo.findOne({
      where: { id },
      relations: ['workHistory', 'education', 'projects', 'user'],
    });
    if (!c) throw new NotFoundException('Candidate not found');
    return c;
  }

  async findByUserId(userId: string) {
    const c = await this.repo.findOne({
      where: { userId },
      relations: ['workHistory', 'education', 'projects'],
    });
    if (!c) throw new NotFoundException('Profile not found');
    return c;
  }

  async update(id: string, data: Partial<CandidateProfile>) {
    const c = await this.findOne(id);
    Object.assign(c, data);
    return this.repo.save(c);
  }
}
