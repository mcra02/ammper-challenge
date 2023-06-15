import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as moment from 'moment';

@Controller()
export class AppController {
  constructor ( private readonly appService: AppService ) {}

  @Get()
  getHello (): any {
    const dateFrom = moment( );
    const dateTo = moment( ).subtract( 10, 'years' );
    return {
      'date_from': dateFrom.format( 'YYYY-MM-DD' ),
      'date_to': dateTo.format( 'YYYY-MM-DD' )
    };
  }
}
