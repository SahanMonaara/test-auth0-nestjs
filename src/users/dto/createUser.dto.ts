import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsString()
  displayName?: string;

  @IsString()
  avatarUrl?: string;
}
