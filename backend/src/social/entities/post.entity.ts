import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum PostVisibility {
  PRIVATE = 'private',
  FRIENDS = 'friends',
  PUBLIC = 'public',
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' }) userId: string;
  @Column({ type: 'text' }) caption: string;
  @Column({ name: 'media_url', length: 512, nullable: true }) mediaUrl: string | null;
  @Column({ type: 'enum', enum: PostVisibility, default: PostVisibility.FRIENDS }) visibility: PostVisibility;
  @Column({ name: 'like_count', default: 0 }) likeCount: number;
  @Column({ name: 'comment_count', default: 0 }) commentCount: number;
  @Column({ name: 'workout_session_id', nullable: true }) workoutSessionId: string | null;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
