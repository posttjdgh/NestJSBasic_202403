import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/requesttest')
  getHello2(@Req() req: Request): string {
    console.log(req);
    return this.appService.getHello();
  }

  //@Get()
  @Get()
  @Get('/hello')
  getHello(): string {
    console.log("inner home url process");
    return process.env.DATABASE_HOST;
  }


  @Get('/he*lo')
  getHello1(): string {
    return this.appService.getHello();
  }



}
