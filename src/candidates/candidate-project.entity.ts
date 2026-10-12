import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

@Entity('candidate_projects')
export class CandidateProject {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, (c) => c.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  role?: string;

  @Column({ type: 'simple-array', default: '' })
  technologies!: string[];

  @Column({ nullable: true })
  link?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ type: 'date', nullable: true })
  startDate?: string;

  @Column({ type: 'date', nullable: true })
  endDate?: string;

  @Column({ default: false })
  isCurrent!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
