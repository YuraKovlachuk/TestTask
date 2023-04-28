import { Injectable } from '@nestjs/common';
import { StationDto } from './station.dto';
import { StationEntity } from './station.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(StationEntity)
    private stationRepository: Repository<StationEntity>,
  ) {}

  async createStation({ name }: StationDto): Promise<StationEntity> {
    return await this.stationRepository.save({ name });
  }

  async getStations(): Promise<StationEntity[]> {
    return await this.stationRepository.find();
  }

  async getStationById(id: string): Promise<StationEntity> {
    return await this.stationRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteStationById(id: string): Promise<DeleteResult> {
    return await this.stationRepository.delete({ id });
  }

  async updateStationById(
    stationDto: StationDto,
    id: string,
  ): Promise<StationEntity> {
    const station = await this.stationRepository.findOne({
      where: {
        id,
      },
    });
    return await this.stationRepository.save({ ...station, ...stationDto });
  }
}
