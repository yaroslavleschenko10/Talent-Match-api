import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandidateProfile } from './candidate-profile.entity';

@Entity('educations')
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, (c) => c.education, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column()
  institution!: string;

  @Column()
  degree!: string;

  @Column()
  field!: string;

  @Column({ type: 'int' })
  year!: number;
}
