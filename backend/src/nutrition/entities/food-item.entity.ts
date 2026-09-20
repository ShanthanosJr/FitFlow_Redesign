import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('food_items')
export class FoodItem {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Index()
  @Column({ length: 255 }) name: string;

  @Column({ name: 'brand_name', length: 128, nullable: true }) brandName: string | null;
  @Column({ name: 'calories_per_100g', type: 'numeric', precision: 8, scale: 2 }) caloriesPer100g: number;
  @Column({ name: 'protein_per_100g', type: 'numeric', precision: 8, scale: 2 }) proteinPer100g: number;
  @Column({ name: 'carbs_per_100g', type: 'numeric', precision: 8, scale: 2 }) carbsPer100g: number;
  @Column({ name: 'fat_per_100g', type: 'numeric', precision: 8, scale: 2 }) fatPer100g: number;

  @Column({ name: 'barcode', length: 64, nullable: true, unique: true }) barcode: string | null;
  @Column({ name: 'external_id', length: 128, nullable: true }) externalId: string | null;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
