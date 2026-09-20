import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { NutritionController } from './nutrition.controller';
import { NutritionService } from './nutrition.service';
import { MealLog } from './entities/meal-log.entity';
import { FoodItem } from './entities/food-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MealLog, FoodItem]),
    HttpModule, // For USDA / Open Food Facts + AI recognition
  ],
  controllers: [NutritionController],
  providers: [NutritionService],
  exports: [NutritionService],
})
export class NutritionModule {}
