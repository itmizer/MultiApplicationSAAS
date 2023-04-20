import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Codigo Empresa',
})
@Controller('login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}



  @Get(':email')
  findOne(@Headers() headers, @Param('email') email: string) {
    return this.loginService.findEmail(email, +headers.tenant_id);
  }



}
