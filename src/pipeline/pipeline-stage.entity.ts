import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EmployerProfile } from '../employers/employer-profile.entity';
import { PipelineCandidate } from './pipeline-candidate.entity';

@Entity('pipeline_stages')
export class PipelineStage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  employerId!: string;

  @ManyToOne(() => EmployerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employerId' })
  employer!: EmployerProfile;

  @Column()
  name!: string;

  @Column({ type: 'int' })
  order!: number;

  @Column({ default: '#8B5CF6' })
  color!: string;

  @OneToMany(() => PipelineCandidate, (pc) => pc.stage)
  candidates!: PipelineCandidate[];
}
