import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus } from '@nestjs/common';

import { ConcertsService } from './concerts.service';

@Controller('concerts')
export class ConcertsController {
    constructor(private readonly concertsService: ConcertsService) { }

    @Post()
    async addConcert(
        @Body('title') concertTitle: string,
        @Body('description') concertDesc: string,
        @Body('genre') concertGenre: string,
        @Body('artiste') concertArtiste: string,
        @Body('date') concertDate: string,
        @Body('price') concertPrice: string,
    ) {
        const concert = await this.concertsService.insertConcert(
            concertTitle,
            concertDesc,
            concertGenre,
            concertArtiste,
            concertDate,
            concertPrice,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Concert added successfully',
            data: concert,
        };
    }

    @Get()
    async getAllConcerts() {
        const concerts = await this.concertsService.getConcerts();
        return concerts;
    }

    @Get(':id')
    getConcert(@Param('id') concertId: string) {
        return this.concertsService.getSingleConcert(concertId);
    }

    @Patch(':id')
    async updateConcert(
        @Param('id') concertId: string,
        @Body('title') concertTitle: string,
        @Body('description') concertDesc: string,
        @Body('genre') concertGenre: string,
        @Body('artiste') concertArtiste: string,
        @Body('date') concertDate: string,
        @Body('price') concertPrice: string,
    ) {
        const concert = await this.concertsService.updateConcert(
            concertId,
            concertTitle,
            concertDesc,
            concertGenre,
            concertArtiste,
            concertDate,
            concertPrice,
        );
        console.log(concert)
        return {
            statusCode: HttpStatus.OK,
            message: 'Concert updated successfully',
            concert: concert,
        };
    }
    
    
    @Delete(':id')
    async removeConcert(@Param('id') concertId: string) {
        const isDeleted = await this.concertsService.deleteConcert(concertId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Concert deleted successfully',
            };
        }
    }
}
