import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { FoodItem } from './food-item.entity';

@Entity('meal_logs')
export class MealLog {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' }) userId: string;

  @ManyToOne(() => FoodItem, { nullable: true })
  @JoinColumn({ name: 'food_item_id' })
  foodItem: FoodItem | null;

  @Column({ name: 'food_item_id', nullable: true }) foodItemId: string | null;

  /** breakfast | lunch | dinner | snack */
  @Column({ name: 'meal_time', length: 32 }) mealTime: string;

  @Column({ name: 'quantity_g', type: 'numeric', precision: 8, scale: 2 }) quantityG: number;
  @Column({ name: 'calories_kcal', type: 'numeric', precision: 8, scale: 2 }) caloriesKcal: number;
  @Column({ name: 'protein_g', type: 'numeric', precision: 8, scale: 2 }) proteinG: number;
  @Column({ name: 'carbs_g', type: 'numeric', precision: 8, scale: 2 }) carbsG: number;
  @Column({ name: 'fat_g', type: 'numeric', precision: 8, scale: 2 }) fatG: number;
  @Column({ name: 'logged_at', type: 'timestamptz' }) loggedAt: Date;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
