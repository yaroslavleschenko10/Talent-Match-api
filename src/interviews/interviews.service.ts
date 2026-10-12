import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from './interview.entity';

@Injectable()
export class InterviewsService {
  constructor(@InjectRepository(Interview) private repo: Repository<Interview>) {}

  findByEmployer(employerId: string) {
    return this.repo.find({
      where: { employerId },
      relations: ['candidate'],
      order: { date: 'ASC', startTime: 'ASC' },
    });
  }

  findByCandidate(candidateId: string) {
    return this.repo.find({
      where: { candidateId },
      relations: ['candidate'],
      order: { date: 'ASC', startTime: 'ASC' },
    });
  }

  async create(data: Partial<Interview>) {
    const i = this.repo.create(data);
    return this.repo.save(i);
  }

  async update(id: string, data: Partial<Interview>) {
    const i = await this.repo.findOne({ where: { id } });
    if (!i) throw new NotFoundException();
    Object.assign(i, data);
    return this.repo.save(i);
  }
}
