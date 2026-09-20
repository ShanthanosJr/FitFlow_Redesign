import { IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FitnessGoal } from '../entities/workout-plan.entity';

export class CreatePlanDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty({ enum: FitnessGoal }) @IsEnum(FitnessGoal) goal: FitnessGoal;
  @ApiProperty({ minimum: 1, maximum: 52 }) @IsInt() @Min(1) @Max(52) durationWeeks: number;
  @ApiProperty({ minimum: 1, maximum: 7 }) @IsInt() @Min(1) @Max(7) sessionsPerWeek: number;
}
