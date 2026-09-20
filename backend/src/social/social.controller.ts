import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SocialService } from './social.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('social')
@ApiBearerAuth('cognito-jwt')
@UseGuards(JwtAuthGuard)
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('feed')
  @ApiOperation({ summary: 'Get the personalized social feed' })
  getFeed(@Req() req: any, @Query('cursor') cursor?: string) {
    return this.socialService.getFeed(req.user.sub, cursor);
  }

  @Post('posts')
  @ApiOperation({ summary: 'Create a workout post' })
  createPost(@Req() req: any, @Body() body: any) {
    return this.socialService.createPost(req.user.sub, body);
  }

  @Post('posts/:id/like')
  @ApiOperation({ summary: 'Like a post' })
  likePost(@Req() req: any, @Param('id') id: string) {
    return this.socialService.likePost(req.user.sub, id);
  }

  @Delete('posts/:id/like')
  @ApiOperation({ summary: 'Unlike a post' })
  unlikePost(@Req() req: any, @Param('id') id: string) {
    return this.socialService.unlikePost(req.user.sub, id);
  }

  @Get('challenges')
  @ApiOperation({ summary: 'List active challenges' })
  getChallenges() {
    return this.socialService.getChallenges();
  }

  @Post('challenges/:id/join')
  @ApiOperation({ summary: 'Join a challenge' })
  joinChallenge(@Req() req: any, @Param('id') id: string) {
    return this.socialService.joinChallenge(req.user.sub, id);
  }

  @Get('challenges/:id/leaderboard')
  @ApiOperation({ summary: 'Get the challenge leaderboard' })
  getLeaderboard(@Param('id') id: string) {
    return this.socialService.getLeaderboard(id);
  }
}
