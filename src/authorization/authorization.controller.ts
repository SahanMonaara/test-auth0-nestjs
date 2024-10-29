import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

@Controller('auth')
export class AuthorizationController {
  constructor(private authorization: AuthorizationService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const token = await this.authorization.generateAuth0Token(
      username,
      password,
    );
    return { access_token: token };
  }

  @Post('signup')
  async signUp(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.authorization.signUp(username, password);
    return { user };
  }
}
