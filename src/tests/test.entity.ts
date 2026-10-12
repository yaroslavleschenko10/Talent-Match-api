import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TestType } from '../common/enums';
import { EmployerProfile } from '../employers/employer-profile.entity';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  employerId!: string;

  @ManyToOne(() => EmployerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employerId' })
  employer!: EmployerProfile;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: TestType })
  type!: TestType;

  @Column({ type: 'int' })
  duration!: number;

  @Column({ type: 'int' })
  questionsCount!: number;

  @Column({ type: 'int' })
  passingScore!: number;

  @Column({ nullable: true })
  link?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
