import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user via Cognito' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate and receive JWT tokens' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  @ApiBearerAuth('cognito-jwt')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Revoke the current session' })
  logout(@Req() req: any) {
    return this.authService.logout(req.user.sub);
  }

  @Get('me')
  @ApiBearerAuth('cognito-jwt')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Return the authenticated user identity' })
  me(@Req() req: any) {
    return req.user;
  }
}
