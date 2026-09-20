import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/**
 * AuthService — delegates authentication to Amazon Cognito.
 * All token handling (sign-up, sign-in, refresh, revocation) uses
 * the Cognito USER_POOLS flow via the AWS SDK (Amplify server-side).
 * JWT verification in guards uses the Cognito JWKS endpoint.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<{ message: string }> {
    // TODO: call CognitoIdentityProviderClient.SignUp
    // After Cognito confirms the user, create a local User row.
    await this.usersService.createFromCognito({
      cognitoSub: 'placeholder-sub',
      email: dto.email,
      name: dto.name,
    });
    return { message: 'Confirmation code sent to email.' };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    // TODO: call CognitoIdentityProviderClient.InitiateAuth (USER_PASSWORD_AUTH)
    return {
      accessToken: 'cognito-access-token-placeholder',
      refreshToken: 'cognito-refresh-token-placeholder',
      expiresIn: 900,
    };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; expiresIn: number }> {
    // TODO: call CognitoIdentityProviderClient.InitiateAuth (REFRESH_TOKEN_AUTH)
    return { accessToken: 'new-access-token-placeholder', expiresIn: 900 };
  }

  async logout(cognitoSub: string): Promise<{ message: string }> {
    // TODO: call CognitoIdentityProviderClient.GlobalSignOut
    return { message: 'Signed out.' };
  }
}
