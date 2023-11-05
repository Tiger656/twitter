import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthnGuard } from './guards/authn.guard';
import { AuthzGuard } from './guards/authz.guard';
import { conf } from 'src/conf';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: conf.auth.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthnGuard, AuthzGuard],
})
export class AuthModule {}
