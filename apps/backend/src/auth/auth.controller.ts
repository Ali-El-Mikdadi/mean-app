import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string; name: string }) {
    console.log('Received body:', body); // Log the received body
    if (!body.email || !body.password || !body.name) {
      throw new Error('Missing required fields');
    }
    return this.authService.signup(body.email, body.password, body.name);
  }

  @Post('signin')
  async signin(@Body() body: { email: string; password: string }) {
    return this.authService.signin(body.email, body.password);
  }
}