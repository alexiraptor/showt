import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { ConcertsSchema } from './concerts.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Concert', schema: ConcertsSchema }])],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}
