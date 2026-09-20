import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { WorkoutPlan } from './entities/workout-plan.entity';
import { WorkoutSession } from './entities/workout-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutPlan, WorkoutSession]),
    HttpModule, // For delegating plan generation to AI service
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
