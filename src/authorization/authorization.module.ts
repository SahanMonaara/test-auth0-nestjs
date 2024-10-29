import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret:
        '03fe01105aa4fb9f4413b7a550fcc27b5d41622128ccf630b695480e56c94fc5cfdf2044d2f982af9aeec146462e87337134ef288ce7d793070865d966f9e4004aad9926e0b05333886b1530c60adadef86a2b6f1078084c2dacfaba59348a5d23192cfee67c6657441e5214d8c095748484fa2b79ac9192cdd49356cdf99a4da89de9c5b14c0b597de28ce207dc49b9c6a9c1f4ac16a98c495f2597429fd5ee64c9082ab030495c9c34a9fa75b0b3e52aee260292876264918816427d000d4c911c98c8371473e778bff7ab64f2a7f252ef1fda3429ad7446a436e588ee2ff679f81202ab49bc2e3aad5a69701f8249d263cc4616224be83056caf0abdfa86f',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthorizationService, ConfigService],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
