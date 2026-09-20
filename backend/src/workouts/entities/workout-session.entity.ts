import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn,
} from 'typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { User } from '../../users/entities/user.entity';

export enum SessionStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
}

@Entity('workout_sessions')
export class WorkoutSession {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => WorkoutPlan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  plan: WorkoutPlan;

  @Column({ name: 'plan_id' }) planId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' }) userId: string;

  @Column({ name: 'scheduled_date', type: 'date' }) scheduledDate: string;
  @Column({ name: 'started_at', type: 'timestamptz', nullable: true }) startedAt: Date | null;
  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true }) completedAt: Date | null;
  @Column({ name: 'duration_minutes', type: 'smallint', nullable: true }) durationMinutes: number | null;
  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.PLANNED }) status: SessionStatus;

  /** Per-exercise logs: [{exerciseId, sets: [{reps, weightKg, rpe}]} ] */
  @Column({ name: 'exercise_logs', type: 'jsonb', nullable: true }) exerciseLogs: any[] | null;

  @Column({ name: 'rating', type: 'smallint', nullable: true }) rating: number | null;
  @Column({ type: 'text', nullable: true }) notes: string | null;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
