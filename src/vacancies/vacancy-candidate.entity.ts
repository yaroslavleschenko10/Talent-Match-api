import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandidateVacancyStatus } from '../common/enums';
import { Vacancy } from './vacancy.entity';
import { CandidateProfile } from '../candidates/candidate-profile.entity';

@Entity('vacancy_candidates')
export class VacancyCandidate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  vacancyId!: string;

  @ManyToOne(() => Vacancy, (v) => v.candidates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vacancyId' })
  vacancy!: Vacancy;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column({ type: 'enum', enum: CandidateVacancyStatus, default: CandidateVacancyStatus.NEW })
  status!: CandidateVacancyStatus;

  @Column({ type: 'float', default: 0 })
  matchScore!: number;

  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  appliedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
