import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandidateProfile } from '../candidates/candidate-profile.entity';

@Entity('blacklisted_companies')
export class BlacklistedCompany {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  companyName!: string;

  @Column({ type: 'text' })
  reason!: string;

  @CreateDateColumn()
  addedAt!: Date;
}
