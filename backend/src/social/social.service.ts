import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Challenge } from './entities/challenge.entity';
import { ChallengeEntry } from './entities/challenge-entry.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(Challenge) private readonly challengeRepo: Repository<Challenge>,
    @InjectRepository(ChallengeEntry) private readonly entryRepo: Repository<ChallengeEntry>,
    private readonly usersService: UsersService,
  ) {}

  async getFeed(cognitoSub: string, cursor?: string) {
    // TODO: implement Redis-backed fan-out feed
    return this.postRepo.find({
      order: { createdAt: 'DESC' },
      take: 20,
    });
  }

  async createPost(cognitoSub: string, body: any) {
    const user = await this.usersService.findBySub(cognitoSub);
    return this.postRepo.save(this.postRepo.create({ ...body, userId: user!.id }));
  }

  async likePost(cognitoSub: string, postId: string) {
    await this.postRepo.increment({ id: postId }, 'likeCount', 1);
    return { postId, liked: true };
  }

  async unlikePost(cognitoSub: string, postId: string) {
    await this.postRepo.decrement({ id: postId }, 'likeCount', 1);
    return { postId, liked: false };
  }

  async getChallenges() {
    return this.challengeRepo.find({ order: { startDate: 'DESC' } });
  }

  async joinChallenge(cognitoSub: string, challengeId: string) {
    const user = await this.usersService.findBySub(cognitoSub);
    const entry = this.entryRepo.create({ challengeId, userId: user!.id });
    return this.entryRepo.save(entry);
  }

  async getLeaderboard(challengeId: string) {
    return this.entryRepo.find({
      where: { challengeId },
      order: { currentValue: 'DESC' },
      take: 50,
      relations: ['user'],
    });
  }
}
