import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Concert } from './concerts.model';

@Injectable()
export class ConcertsService {
  constructor(@InjectModel('Concert') private readonly concertModel: Model<Concert>) {}

  async insertConcert(title: string, desc: string, genre: string, artiste: string, date: string, price: string) {
    const newConcert = new this.concertModel({
      title,
      description: desc,
      genre,
      artiste,
      date,
      price,
    });
    const result = await newConcert.save();
    return result
  }

  async getConcerts() {
    const concerts = await this.concertModel.find().exec();
    return concerts.map(concert => ({
      id: concert.id,
      title: concert.title,
      description: concert.description,
      genre: concert.genre,
      artiste: concert.artiste,
      date: concert.date,
      price: concert.price,
    }));
  }

  async getSingleConcert(concertId: string) {
    const concert = await this.findConcert(concertId);
    return {
      id: concert.id,
      title: concert.title,
      description: concert.description,
      genre: concert.genre,
      artiste: concert.artiste,
      date: concert.date,
      price: concert.price,
    };
  }

  async updateConcert(concertId: string, title: string, desc: string, genre: string, artiste: string, date: string, price: string) {
    const updatedConcert = await this.findConcert(concertId);
    if (title) {
      updatedConcert.title = title;
    }
    if (desc) {
      updatedConcert.description = desc;
    }
    if (genre) {
      updatedConcert.genre = genre;
    }
    if (artiste){
      updatedConcert.artiste = artiste;
    }
    if (date){
      updatedConcert.date = date;
    }
    if (price){
      updatedConcert.price = price;
    }
    updatedConcert.save();
    return updatedConcert;
  }

  async deleteConcert(concertId: string) {
    const result = await this.concertModel.deleteOne({ _id: concertId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find concert.');
    }
    return true;
  }

  private async findConcert(id: string): Promise<Concert> {
    let concert;
    try {
      concert = await this.concertModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find concert.');
    }
    if (!concert) {
      throw new NotFoundException('Could not find concert.');
    }
    return concert;
  }
}