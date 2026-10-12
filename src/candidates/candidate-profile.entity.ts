import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Gender, EmploymentType, WorkSchedule } from '../common/enums';
import { User } from '../auth/user.entity';
import { CandidateProject } from './candidate-project.entity';
import { WorkExperience } from './work-experience.entity';
import { Education } from './education.entity';

@Entity('candidate_profiles')
export class CandidateProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @OneToOne(() => User, (u) => u.candidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName!: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  telegram?: string;

  @Column({ nullable: true })
  viber?: string;

  @Column({ nullable: true })
  linkedin?: string;

  @Column({ nullable: true })
  portfolio?: string;

  @Column()
  position!: string;

  @Column({ type: 'float', default: 0 })
  experienceYears!: number;

  @Column()
  location!: string;

  @Column({ default: false })
  relocate!: boolean;

  @Column({ nullable: true })
  salaryExpectation?: string;

  @Column({ type: 'simple-array', default: '' })
  employmentTypes!: EmploymentType[];

  @Column({ type: 'simple-array', default: '' })
  workSchedules!: WorkSchedule[];

  @Column({ type: 'simple-array', default: '' })
  skills!: string[];

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ type: 'jsonb', default: [] })
  languages!: { language: string; level: string }[];

  @Column({ nullable: true })
  cvFileUrl?: string;

  @Column({ default: true })
  available!: boolean;

  @Column({ default: true })
  profileVisible!: boolean;

  @Column({ default: true })
  showSalary!: boolean;

  @Column({ default: true })
  showContacts!: boolean;

  @OneToMany(() => WorkExperience, (w) => w.candidate, { cascade: true })
  workHistory!: WorkExperience[];

  @OneToMany(() => Education, (e) => e.candidate, { cascade: true })
  education!: Education[];

  @OneToMany(() => CandidateProject, (p) => p.candidate, { cascade: true })
  projects!: CandidateProject[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
