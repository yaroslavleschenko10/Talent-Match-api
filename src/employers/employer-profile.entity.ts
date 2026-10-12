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
import { User } from '../auth/user.entity';
import { Vacancy } from '../vacancies/vacancy.entity';

@Entity('employer_profiles')
export class EmployerProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userId!: string;

  @OneToOne(() => User, (u) => u.employerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  companyName!: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  logoUrl?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  contactPerson!: string;

  @Column({ nullable: true })
  phone?: string;

  @OneToMany(() => Vacancy, (v) => v.employer)
  vacancies!: Vacancy[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
