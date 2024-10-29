import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationService } from './authorization/authorization.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs_tutorial'),
    UsersModule,
    AuthorizationModule,
    ConfigModule.forRoot(),
    JwtModule,
  ],
  controllers: [],
  providers: [AuthorizationService],
})
export class AppModule {}
