import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployerRequest } from './employer-request.entity';
import { CompanyApplication } from './company-application.entity';
import { BlacklistedCompany } from './blacklist.entity';
import { SavedJob } from './saved-job.entity';
import { RequestStatus } from '../common/enums';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(EmployerRequest) private requests: Repository<EmployerRequest>,
    @InjectRepository(CompanyApplication) private apps: Repository<CompanyApplication>,
    @InjectRepository(BlacklistedCompany) private blacklist: Repository<BlacklistedCompany>,
    @InjectRepository(SavedJob) private saved: Repository<SavedJob>,
  ) {}

  // Employer requests to candidates
  getRequestsByCandidate(candidateId: string) {
    return this.requests.find({ where: { candidateId }, order: { createdAt: 'DESC' } });
  }

  async createRequest(data: Partial<EmployerRequest>) {
    return this.requests.save(this.requests.create(data));
  }

  async updateRequestStatus(id: string, status: RequestStatus) {
    const r = await this.requests.findOne({ where: { id } });
    if (!r) throw new NotFoundException();
    r.status = status;
    return this.requests.save(r);
  }

  // Candidate applications to companies
  getApplications(candidateId: string) {
    return this.apps.find({ where: { candidateId }, order: { appliedAt: 'DESC' } });
  }

  // Blacklist
  getBlacklist(candidateId: string) {
    return this.blacklist.find({ where: { candidateId }, order: { addedAt: 'DESC' } });
  }

  async addToBlacklist(data: Partial<BlacklistedCompany>) {
    return this.blacklist.save(this.blacklist.create(data));
  }

  async removeFromBlacklist(id: string) {
    await this.blacklist.delete(id);
    return { ok: true };
  }

  // Saved jobs
  getSavedJobs(candidateId: string) {
    return this.saved.find({ where: { candidateId }, order: { savedAt: 'DESC' } });
  }

  async saveJob(data: Partial<SavedJob>) {
    return this.saved.save(this.saved.create(data));
  }

  async unsaveJob(id: string) {
    await this.saved.delete(id);
    return { ok: true };
  }
}
