import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NutritionService } from './nutrition.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('nutrition')
@ApiBearerAuth('cognito-jwt')
@UseGuards(JwtAuthGuard)
@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Get('logs')
  @ApiOperation({ summary: 'List meal logs for the current user' })
  getLogs(@Req() req: any, @Query('date') date?: string) {
    return this.nutritionService.getLogs(req.user.sub, date);
  }

  @Post('logs')
  @ApiOperation({ summary: 'Log a meal' })
  logMeal(@Req() req: any, @Body() body: any) {
    return this.nutritionService.logMeal(req.user.sub, body);
  }

  @Get('food/search')
  @ApiOperation({ summary: 'Search food items by name' })
  searchFood(@Query('q') query: string) {
    return this.nutritionService.searchFood(query);
  }

  @Post('food/recognize')
  @ApiOperation({ summary: 'Recognize food from a photo via AI service' })
  recognizeFood(@Body() body: { s3Key: string }) {
    return this.nutritionService.recognizeFood(body.s3Key);
  }

  @Get('summary')
  @ApiOperation({ summary: "Get the current user's daily macro summary" })
  getDailySummary(@Req() req: any, @Query('date') date: string) {
    return this.nutritionService.getDailySummary(req.user.sub, date);
  }
}
