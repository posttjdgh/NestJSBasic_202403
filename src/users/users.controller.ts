import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, BadRequestException, Header, Redirect, Query, HostParam } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './itf/user-info.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {

    const { name, email, password } = dto;
    console.log(dto);
    await this.usersService.createUser(name, email, password);
  }


  @Post('/email-verify') //왜 Post를 하는지 의문 오타 같은....
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string>{

    const { signupVerifyToken } = dto;
    
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string>{
    
    console.log( dto );
    const { email, password} = dto;
    return await this.usersService.login( email, password);
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<string>{
    console.log( userId );
    return await this.usersService.getUserInfo(userId);
  }



  //정말 기초 Create User 코드
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  findAll(@Body() getUserDto: GetUserDto, @Res() res) {

    const users = this.usersService.findAll(getUserDto);

    return res.status(200).send(users);

    //return this.usersService.findAll();
  }

  //Redirection condition Test

  @Get('redirect/docs')
  @Redirect('https://nestjs.com', 302)
  getDocs(@Query('version') version) {
    
    if( version && version === '5'){
      return { url: 'https://docs.nestjs.com/v5/'};
    }
  }


  //Redirection Test
  // @Redirect('https://nestjs.com', 301)
  // @Get(':id')
  // findOneWithHeader(@Param('id') id: string) {
    
  //   if( +id < 1){
  //     throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
  //   }
    
  //   return this.usersService.findOne(+id);
  // }

  //Custom Header Test
  // @Header('Custom', 'Test Header')
  // @Get(':id')
  // findOneWithHeader(@Param('id') id: string) {
    
  //   if( +id < 1){
  //     throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
  //   }
    
  //   return this.usersService.findOne(+id);
  // }

  //Exception Process
  // @Get(':id')
  // findOne(@Param('id') id: string) {
    
  //   if( +id < 1){
  //     throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
  //   }
    
  //   return this.usersService.findOne(+id);
  // }

  //완전 Basic
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }


  @HttpCode(202)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

}
