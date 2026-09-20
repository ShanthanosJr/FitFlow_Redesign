import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  COACH = 'coach',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Amazon Cognito subject identifier — globally unique. */
  @Index({ unique: true })
  @Column({ name: 'cognito_sub', length: 128 })
  cognitoSub: string;

  @Index({ unique: true })
  @Column({ length: 255 })
  email: string;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'avatar_url', length: 512, nullable: true })
  avatarUrl: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  /** Calorie / macro targets set during onboarding. */
  @Column({ name: 'calorie_target', type: 'int', nullable: true })
  calorieTarget: number | null;

  @Column({ name: 'protein_target_g', type: 'int', nullable: true })
  proteinTargetG: number | null;

  @Column({ name: 'timezone', length: 64, default: 'UTC' })
  timezone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
