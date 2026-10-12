import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PipelineStage } from './pipeline-stage.entity';
import { PipelineCandidate } from './pipeline-candidate.entity';

@Injectable()
export class PipelineService {
  constructor(
    @InjectRepository(PipelineStage) private stages: Repository<PipelineStage>,
    @InjectRepository(PipelineCandidate) private candidates: Repository<PipelineCandidate>,
  ) {}

  getStages(employerId: string) {
    return this.stages.find({ where: { employerId }, order: { order: 'ASC' } });
  }

  getCandidates(employerId: string) {
    return this.candidates.find({
      where: { employerId },
      relations: ['candidate', 'stage'],
      order: { updatedAt: 'DESC' },
    });
  }

  async moveCandidate(id: string, stageId: string) {
    const pc = await this.candidates.findOne({ where: { id } });
    if (!pc) throw new NotFoundException();
    pc.stageId = stageId;
    return this.candidates.save(pc);
  }

  async addCandidate(data: {
    employerId: string;
    candidateId: string;
    stageId: string;
    notes?: string;
  }) {
    const pc = this.candidates.create(data);
    return this.candidates.save(pc);
  }
}
