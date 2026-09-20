import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MealLog } from './entities/meal-log.entity';
import { FoodItem } from './entities/food-item.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(MealLog) private readonly mealRepo: Repository<MealLog>,
    @InjectRepository(FoodItem) private readonly foodRepo: Repository<FoodItem>,
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async getLogs(cognitoSub: string, date?: string) {
    const user = await this.usersService.findBySub(cognitoSub);
    const qb = this.mealRepo
      .createQueryBuilder('m')
      .where('m.user_id = :userId', { userId: user!.id })
      .orderBy('m.logged_at', 'DESC');
    if (date) qb.andWhere('DATE(m.logged_at) = :date', { date });
    return qb.getMany();
  }

  async logMeal(cognitoSub: string, body: any) {
    const user = await this.usersService.findBySub(cognitoSub);
    return this.mealRepo.save(this.mealRepo.create({ ...body, userId: user!.id }));
  }

  async searchFood(query: string) {
    return this.foodRepo
      .createQueryBuilder('f')
      .where('f.name ILIKE :q', { q: `%${query}%` })
      .limit(20)
      .getMany();
  }

  async recognizeFood(s3Key: string) {
    const aiUrl = this.config.get<string>('AI_SERVICE_URL', 'http://ai-service:8000');
    const { data } = await firstValueFrom(
      this.http.post(`${aiUrl}/v1/nutrition/recognize`, { s3Key }),
    );
    return data;
  }

  async getDailySummary(cognitoSub: string, date: string) {
    const user = await this.usersService.findBySub(cognitoSub);
    return this.mealRepo
      .createQueryBuilder('m')
      .select([
        'SUM(m.calories_kcal) AS "totalCalories"',
        'SUM(m.protein_g) AS "totalProtein"',
        'SUM(m.carbs_g) AS "totalCarbs"',
        'SUM(m.fat_g) AS "totalFat"',
      ])
      .where('m.user_id = :userId AND DATE(m.logged_at) = :date', {
        userId: user!.id,
        date,
      })
      .getRawOne();
  }
}
