import * as mongoose from 'mongoose';

export const ConcertsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  artiste: { type: String, required: true},
  date: {type : String, required: true},
  price: {type: String, required: true},
});

export interface Concert extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  genre: string;
  artiste: string;
  date: string;
  price: string;

}