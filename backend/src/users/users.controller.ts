import {
  Controller, Get, Patch, Delete, Param, Body, UseGuards, Req,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth('cognito-jwt')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: "Get the current user's profile" })
  getMe(@Req() req: any) {
    return this.usersService.findBySub(req.user.sub);
  }

  @Patch('me')
  @ApiOperation({ summary: "Update the current user's profile" })
  updateMe(@Req() req: any, @Body() dto: UpdateUserDto) {
    return this.usersService.findBySub(req.user.sub).then((user) =>
      this.usersService.update(user!.id, dto),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user profile by ID (coach/admin only)' })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Request account deletion (GDPR erasure)' })
  deleteMe(@Req() req: any) {
    return this.usersService.findBySub(req.user.sub).then((user) =>
      this.usersService.softDelete(user!.id),
    );
  }
}
