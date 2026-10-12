import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InterviewType, InterviewStatus, MeetingType } from '../common/enums';
import { CandidateProfile } from '../candidates/candidate-profile.entity';
import { Vacancy } from '../vacancies/vacancy.entity';

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  vacancyId?: string;

  @ManyToOne(() => Vacancy, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'vacancyId' })
  vacancy?: Vacancy;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  employerId!: string;

  @Column()
  title!: string;

  @Column({ type: 'enum', enum: InterviewType })
  type!: InterviewType;

  @Column({ type: 'date' })
  date!: string;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @Column({ nullable: true })
  meetingLink?: string;

  @Column({ type: 'enum', enum: MeetingType, default: MeetingType.GOOGLE_MEET })
  meetingType!: MeetingType;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ type: 'enum', enum: InterviewStatus, default: InterviewStatus.SCHEDULED })
  status!: InterviewStatus;

  @Column({ type: 'simple-array', default: '' })
  participants!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
