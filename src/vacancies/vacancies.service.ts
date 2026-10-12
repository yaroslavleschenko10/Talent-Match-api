import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './vacancy.entity';
import { VacancyCandidate } from './vacancy-candidate.entity';
import { VacancyStatus } from '../common/enums';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectRepository(Vacancy) private vacancies: Repository<Vacancy>,
    @InjectRepository(VacancyCandidate) private vc: Repository<VacancyCandidate>,
  ) {}

  findByEmployer(employerId: string) {
    return this.vacancies.find({
      where: { employerId },
      relations: ['candidates', 'candidates.candidate'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const v = await this.vacancies.findOne({
      where: { id },
      relations: ['candidates', 'candidates.candidate', 'employer'],
    });
    if (!v) throw new NotFoundException('Vacancy not found');
    return v;
  }

  async create(employerId: string, data: Partial<Vacancy>) {
    const v = this.vacancies.create({ ...data, employerId });
    return this.vacancies.save(v);
  }

  async update(id: string, data: Partial<Vacancy>) {
    const v = await this.findOne(id);
    Object.assign(v, data);
    return this.vacancies.save(v);
  }

  async setStatus(id: string, status: VacancyStatus) {
    return this.update(id, { status });
  }
}
