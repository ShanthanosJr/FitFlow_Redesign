import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Challenge } from './challenge.entity';
import { User } from '../../users/entities/user.entity';

@Entity('challenge_entries')
export class ChallengeEntry {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => Challenge, { onDelete: 'CASCADE' }) @JoinColumn({ name: 'challenge_id' }) challenge: Challenge;
  @Column({ name: 'challenge_id' }) challengeId: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) @JoinColumn({ name: 'user_id' }) user: User;
  @Column({ name: 'user_id' }) userId: string;
  @Column({ name: 'current_value', type: 'numeric', precision: 10, scale: 2, default: 0 }) currentValue: number;
  @Column({ name: 'rank', type: 'int', nullable: true }) rank: number | null;
  @CreateDateColumn({ name: 'joined_at' }) joinedAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
