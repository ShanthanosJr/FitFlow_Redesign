import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WorkoutPlan, PlanStatus } from './entities/workout-plan.entity';
import { WorkoutSession, SessionStatus } from './entities/workout-session.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { GeneratePlanDto } from './dto/generate-plan.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(WorkoutPlan) private readonly planRepo: Repository<WorkoutPlan>,
    @InjectRepository(WorkoutSession) private readonly sessionRepo: Repository<WorkoutSession>,
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async listPlans(cognitoSub: string): Promise<WorkoutPlan[]> {
    const user = await this.usersService.findBySub(cognitoSub);
    return this.planRepo.find({ where: { userId: user!.id }, order: { createdAt: 'DESC' } });
  }

  async createPlan(cognitoSub: string, dto: CreatePlanDto): Promise<WorkoutPlan> {
    const user = await this.usersService.findBySub(cognitoSub);
    return this.planRepo.save(this.planRepo.create({ ...dto, userId: user!.id }));
  }

  async getPlan(id: string): Promise<WorkoutPlan> {
    return this.planRepo.findOneOrFail({ where: { id } });
  }

  async archivePlan(id: string): Promise<WorkoutPlan> {
    await this.planRepo.update(id, { status: PlanStatus.ARCHIVED });
    return this.getPlan(id);
  }

  async generatePlan(cognitoSub: string, dto: GeneratePlanDto): Promise<{ jobId: string }> {
    const aiUrl = this.config.get<string>('AI_SERVICE_URL', 'http://ai-service:8000');
    // Fire-and-forget to AI service; real impl uses SQS.
    // TODO: publish plan.requested event to SQS
    const { data } = await firstValueFrom(
      this.http.post(`${aiUrl}/v1/workouts/generate`, { cognitoSub, ...dto }),
    );
    return { jobId: data.jobId ?? 'placeholder-job-id' };
  }

  async listSessions(cognitoSub: string): Promise<WorkoutSession[]> {
    const user = await this.usersService.findBySub(cognitoSub);
    return this.sessionRepo.find({ where: { userId: user!.id }, order: { scheduledDate: 'DESC' } });
  }

  async completeSession(id: string, body: any): Promise<WorkoutSession> {
    await this.sessionRepo.update(id, {
      status: SessionStatus.COMPLETED,
      completedAt: new Date(),
      exerciseLogs: body.exerciseLogs,
      durationMinutes: body.durationMinutes,
      rating: body.rating,
      notes: body.notes,
    });
    return this.sessionRepo.findOneOrFail({ where: { id } });
  }
}
