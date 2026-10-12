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
import { EmployerProfile } from '../employers/employer-profile.entity';
import { CandidateProfile } from '../candidates/candidate-profile.entity';
import { ChatMessage } from './chat-message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  employerId!: string;

  @ManyToOne(() => EmployerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employerId' })
  employer!: EmployerProfile;

  @Column()
  candidateId!: string;

  @ManyToOne(() => CandidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate!: CandidateProfile;

  @Column({ nullable: true })
  vacancyId?: string;

  @Column({ nullable: true })
  vacancyTitle?: string;

  @Column({ type: 'int', default: 0 })
  unreadCount!: number;

  @OneToMany(() => ChatMessage, (m) => m.chat, { cascade: true })
  messages!: ChatMessage[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
