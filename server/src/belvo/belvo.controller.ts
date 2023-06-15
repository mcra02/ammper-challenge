import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { BelvoService } from './belvo.service';
import { BelvoPagination } from './models/belvo.model';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthJWT } from '../auth/decorators/auth.user.decorator';
import { CurrentUser } from '../auth/decorators/current.user.decorator';
import { OnEvent } from '@nestjs/event-emitter';

@Controller( 'belvo' )
export class BelvoController {

  constructor ( private readonly belvoService: BelvoService ) {}

  @Get( 'institutions' )
  @ApiResponse({
    type: BelvoPagination
  })
  async getInstitutions (): Promise<BelvoPagination> {
    return await this.belvoService.findAllInstitutions();
  }

  @Get( 'transactions' )
  @UseGuards( AuthJWT )
  @ApiBearerAuth()
  async getTransactions (
    @CurrentUser( ) user: any,
    @Query() query: any
  ): Promise<any> {
    return await this.belvoService.findTransactions({ link: user.belvoLink, ...query });
  }

  @OnEvent( 'link.registered' )
  handleOrderCreatedEvent ( payload: any ) {
    console.warn( 'GENERATED DATA: ', payload.length );
    this.belvoService.generateTransactionsByLink( payload.belvoLink );
  }
}
