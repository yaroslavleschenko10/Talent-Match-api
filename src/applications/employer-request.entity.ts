import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EmploymentType, WorkSchedule, RequestStatus } from '../common/enums';
import { CandidateProfile } from '../candidates/candidate-profile.entity';
import { EmployerProfile } from '../employers/employer-profile.entity';

@Entity('employer_requests')
export class EmployerRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  employerId!: string;

  @ManyToOne(() => EmployerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employerId' })
  employer!: EmployerProfile;

  @Column()
  companyName!: string;

  @Column()
  contactPerson!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  position!: string;

  @Column({ nullable: true })
  salaryRange?: string;

  @Column({ type: 'enum', enum: EmploymentType })
  employmentType!: EmploymentType;

  @Column({ type: 'enum', enum: WorkSchedule })
  workSchedule!: WorkSchedule;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDING })
  status!: RequestStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
