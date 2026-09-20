import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { Post } from './entities/post.entity';
import { Challenge } from './entities/challenge.entity';
import { ChallengeEntry } from './entities/challenge-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Challenge, ChallengeEntry])],
  controllers: [SocialController],
  providers: [SocialService],
  exports: [SocialService],
})
export class SocialModule {}
