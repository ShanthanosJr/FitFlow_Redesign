import { IsEnum, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FitnessGoal } from '../entities/workout-plan.entity';

export class GeneratePlanDto {
  @ApiProperty({ enum: FitnessGoal }) @IsEnum(FitnessGoal) goal: FitnessGoal;

  @ApiPropertyOptional({ description: 'Available equipment list' })
  @IsOptional() @IsArray() @IsString({ each: true })
  equipment?: string[];

  @ApiPropertyOptional({ description: 'Any injuries or contraindications' })
  @IsOptional() @IsString()
  injuries?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  experience?: 'beginner' | 'intermediate' | 'advanced';
}
