import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PipelineStage } from './pipeline-stage.entity';
import { CandidateProfile } from '../candidates/candidate-profile.entity';
import { EmployerProfile } from '../employers/employer-profile.entity';

@Entity('pipeline_candidates')
export class PipelineCandidate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  stageId!: string;

  @ManyToOne(() => PipelineStage, (s) => s.candidates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stageId' })
  stage!: PipelineStage;

  @Column()
  employerId!: string;

  @ManyToOne(() => EmployerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employerId' })
  employer!: EmployerProfile;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  addedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
