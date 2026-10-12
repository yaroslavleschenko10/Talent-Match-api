import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserRole } from '../common/enums';
import { CandidateProfile } from '../candidates/candidate-profile.entity';
import { EmployerProfile } from '../employers/employer-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;

  @OneToOne(() => CandidateProfile, (p) => p.user, { nullable: true })
  candidateProfile?: CandidateProfile;

  @OneToOne(() => EmployerProfile, (p) => p.user, { nullable: true })
  employerProfile?: EmployerProfile;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
