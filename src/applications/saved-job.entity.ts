import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandidateProfile } from '../candidates/candidate-profile.entity';

@Entity('saved_jobs')
export class SavedJob {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  companyName!: string;

  @Column()
  position!: string;

  @Column({ nullable: true })
  salary?: string;

  @Column({ nullable: true })
  location?: string;

  @CreateDateColumn()
  savedAt!: Date;
}
