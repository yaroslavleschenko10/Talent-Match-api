import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import {
  EmploymentType,
  WorkSchedule,
  VacancyStatus,
} from '../common/enums';
import { EmployerProfile } from '../employers/employer-profile.entity';
import { VacancyCandidate } from './vacancy-candidate.entity';

@Entity('vacancies')
export class Vacancy {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  employerId!: string;

  @ManyToOne(() => EmployerProfile, (e) => e.vacancies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employerId' })
  employer!: EmployerProfile;

  @Column()
  title!: string;

  @Column({ nullable: true })
  department?: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'jsonb', default: [] })
  requirements!: { id: string; name: string; required: boolean; weight: number }[];

  @Column({ type: 'simple-array', default: '' })
  skills!: string[];

  @Column({ type: 'int', default: 0 })
  experienceMin!: number;

  @Column({ type: 'int', default: 10 })
  experienceMax!: number;

  @Column({ type: 'int', nullable: true })
  salaryMin?: number;

  @Column({ type: 'int', nullable: true })
  salaryMax?: number;

  @Column({ type: 'enum', enum: EmploymentType, default: EmploymentType.FULL_TIME })
  employmentType!: EmploymentType;

  @Column({ type: 'enum', enum: WorkSchedule, default: WorkSchedule.HYBRID })
  workSchedule!: WorkSchedule;

  @Column()
  location!: string;

  @Column({ default: false })
  isRemote!: boolean;

  @Column({ type: 'enum', enum: VacancyStatus, default: VacancyStatus.ACTIVE })
  status!: VacancyStatus;

  @OneToMany(() => VacancyCandidate, (vc) => vc.vacancy, { cascade: true })
  candidates!: VacancyCandidate[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
