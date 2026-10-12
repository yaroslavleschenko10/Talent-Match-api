import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandidateTestStatus } from '../common/enums';
import { Test } from './test.entity';
import { CandidateProfile } from '../candidates/candidate-profile.entity';

@Entity('candidate_tests')
export class CandidateTest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  testId!: string;

  @ManyToOne(() => Test, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test!: Test;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column({ nullable: true })
  vacancyId?: string;

  @Column({ type: 'enum', enum: CandidateTestStatus, default: CandidateTestStatus.NOT_STARTED })
  status!: CandidateTestStatus;

  @Column({ type: 'float', nullable: true })
  score?: number;

  @Column({ type: 'timestamptz', nullable: true })
  startedAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt?: Date;

  @Column({ type: 'timestamptz' })
  deadline!: Date;
}
