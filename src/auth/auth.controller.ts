import { Controller, Get, Post, Body, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';
import { AuthService } from './auth.service';
import { RawHeaders, GetUser, Auth } from './decorators';
import { RoleProtected } from './decorators/role-protected.decorator';
import { LoginUserDto, CreateUserDto  } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ){
    // console.log({user: request.user});
    // console.log({user});
    // console.log(request);
    return {
      ok: true,
      message: 'Hola Mundo private',
      user,
      userEmail,
      rawHeaders,
      headers,
    }
  }
  
  @Get('private2')
  @RoleProtected( ValidRoles.User)
  @UseGuards( AuthGuard(), UserRoleGuard )
  PrivateRoute2(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      message: 'Hola Mundo private',
      user,
    }
  }
  
  @Get('private3')
  @Auth( 
    ValidRoles.superUser,
    ValidRoles.admin,
    ValidRoles.User
  )
  PrivateRoute3(
    @GetUser() user: User,
  ){
    return {
      ok: true,
      message: 'Hola Mundo private',
      user,
    }
  }

}
