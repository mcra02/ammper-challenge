import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CONFIG } from '../utils/config/enviroment.config';
import * as moment from 'moment';

@Injectable()
export class BelvoService {

  public apiBelvo: AxiosInstance;

  constructor () {
    this.apiBelvo = axios.create({
      baseURL: CONFIG.integrations.belvo.apiUrl,
      auth: {
        username: CONFIG.integrations.belvo.secret,
        password: CONFIG.integrations.belvo.password
      }
    });
  }

  async findAllInstitutions () {
    try {
      const res = await this.apiBelvo.get( '/institutions/', {
        params: {
          page_size: 100,
          type: 'bank'
        }
      });
      return res.data;
    } catch ( error ) {
      console.warn( error );
    }
  }

  async registerLink ( data: any ) {
    try {
      const res = await this.apiBelvo.post( '/links/', data );
      console.warn( res );
      return res.data.id;
    } catch ( error ) {
      if ( error.response.data[0].code ) {
        await this.getFmaSession({
          session: error.response.data[0].session,
          link: error.response.data[0].link,
          token: data.token
        });
        return error.response.data[0].link;
      }
      throw new InternalServerErrorException( error );
    }

  }

  async getFmaSession ( data: any ) {
    const res = await this.apiBelvo.patch( '/links/', data );
    return res.data;
  }

  async generateTransactionsByLink ( linkId: string ) {
    const dateFrom = moment( );
    const dateTo = moment( ).subtract( 10, 'years' );
    const res = await this.apiBelvo.post( '/transactions/', {
      link: linkId,
      'date_from': dateTo.format( 'YYYY-MM-DD' ),
      'date_to': dateFrom.format( 'YYYY-MM-DD' ),
      'save_data': true
    });
    console.warn( res.data );
    return res.data;
  }

  async findTransactions ( params: any ) {
    try {
      const res = await this.apiBelvo.get( '/transactions/', {
        params
      });
      return res.data;
    } catch ( error ) {
      throw new InternalServerErrorException( error );
    }
  }

  findTransactionById () {}
}
