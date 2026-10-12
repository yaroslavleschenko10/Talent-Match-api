import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApplicationStatus } from '../common/enums';
import { CandidateProfile } from '../candidates/candidate-profile.entity';

@Entity('company_applications')
export class CompanyApplication {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  companyName!: string;

  @Column({ nullable: true })
  companyLogo?: string;

  @Column()
  vacancyTitle!: string;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.SENT })
  status!: ApplicationStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  appliedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
