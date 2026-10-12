import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

@Entity('work_experiences')
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, (c) => c.workHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  company!: string;

  @Column()
  position!: string;

  @Column()
  period!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
