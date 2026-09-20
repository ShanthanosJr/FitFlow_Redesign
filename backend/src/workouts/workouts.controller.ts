import {
  Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { WorkoutsService } from './workouts.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { GeneratePlanDto } from './dto/generate-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('workouts')
@ApiBearerAuth('cognito-jwt')
@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('plans')
  @ApiOperation({ summary: 'List all workout plans for the current user' })
  listPlans(@Req() req: any) {
    return this.workoutsService.listPlans(req.user.sub);
  }

  @Post('plans')
  @ApiOperation({ summary: 'Create a manual workout plan' })
  createPlan(@Req() req: any, @Body() dto: CreatePlanDto) {
    return this.workoutsService.createPlan(req.user.sub, dto);
  }

  @Get('plans/:id')
  @ApiOperation({ summary: 'Get a workout plan by ID' })
  getPlan(@Param('id') id: string) {
    return this.workoutsService.getPlan(id);
  }

  @Delete('plans/:id')
  @ApiOperation({ summary: 'Archive a workout plan' })
  archivePlan(@Param('id') id: string) {
    return this.workoutsService.archivePlan(id);
  }

  @Post('plans/generate')
  @ApiOperation({
    summary: 'Request an AI-generated workout plan (async, returns 202 + jobId)',
  })
  generatePlan(@Req() req: any, @Body() dto: GeneratePlanDto) {
    return this.workoutsService.generatePlan(req.user.sub, dto);
  }

  @Get('sessions')
  @ApiOperation({ summary: 'List workout sessions for the current user' })
  listSessions(@Req() req: any) {
    return this.workoutsService.listSessions(req.user.sub);
  }

  @Post('sessions/:id/complete')
  @ApiOperation({ summary: 'Mark a session as completed with exercise logs' })
  completeSession(@Param('id') id: string, @Body() body: any) {
    return this.workoutsService.completeSession(id, body);
  }
}
