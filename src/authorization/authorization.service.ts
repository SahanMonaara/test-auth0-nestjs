import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthorizationService {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;
  private AUTH0_CLIENT_ID: string;
  private AUTH0_CLIENT_SECRET: string;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE');
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN');
    this.AUTH0_CLIENT_ID = this.configService.get('AUTH0_CLIENT_ID');
    this.AUTH0_CLIENT_SECRET = this.configService.get('AUTH0_CLIENT_SECRET');
  }

  async generateAuth0Token(
    username: string,
    password: string,
  ): Promise<string> {
    const url = `${this.AUTH0_DOMAIN}/oauth/token`;

    const data = {
      client_id: 'APPALp9OXu5lJvTziz54tiVWlbfuEFMc',
      client_secret:
        'ERUR06mqe4XJM1xApnDjpAEu37oHAv2PPI-KgRJ9ZDXBMcsAfU_5M8_qVPQy4684',
      audience: 'https://dev-003numgdgo2itx5k.us.auth0.com/api/v2/',
      grant_type: 'password',
      username: username,
      password: password,
      scope: 'openid profile email',
      connection: 'Username-Password-Authentication',
    };

    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Response:', response.data);
      return response.data.access_token;
    } catch (error) {
      console.error(
        'Error obtaining Auth0 token:',
        error?.response?.data || error.message,
      );
      throw new HttpException(
        error?.response?.data || 'Error generating token',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async signUp(username: string, password: string): Promise<any> {
    const url = `https://dev-003numgdgo2itx5k.us.auth0.com/api/v2/users`;
    const token = await this.getManagementApiToken();

    const data = {
      email: username,
      password: password,
      connection: 'Username-Password-Authentication',
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Error signing up',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getManagementApiToken() {
    const url = `https://dev-003numgdgo2itx5k.us.auth0.com/oauth/token`;

    const data = {
      client_id: `${this.AUTH0_CLIENT_ID}`,
      client_secret: `${this.AUTH0_CLIENT_SECRET}`,
      audience: `${this.AUTH0_AUDIENCE}`,
      grant_type: 'client_credentials',
    };

    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data.access_token;
    } catch (error) {
      console.error(
        'Error obtaining Management API token:',
        error.response.data,
      );
    }
  }
}
