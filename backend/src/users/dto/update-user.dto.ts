import { PartialType } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() avatarUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() timezone?: string;

  @ApiPropertyOptional({ minimum: 500, maximum: 10000 })
  @IsOptional() @IsInt() @Min(500) @Max(10000)
  calorieTarget?: number;

  @ApiPropertyOptional({ minimum: 10, maximum: 500 })
  @IsOptional() @IsInt() @Min(10) @Max(500)
  proteinTargetG?: number;
}
