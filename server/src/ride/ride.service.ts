import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Repository } from 'typeorm';
import { RideEntity } from './ride.entity';
import { RideDto } from './ride.dto';
import { StationService } from '../station/station.service';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(RideEntity)
    private rideRepository: Repository<RideEntity>,
    private stationService: StationService,
  ) {}

  async createRide({
    arrivalTime,
    arrivalStation,
    departureTime,
    departureStation,
  }: RideDto): Promise<RideEntity> {
    const arrivalSt = await this.stationService.getStationById(arrivalStation);
    const departureSt = await this.stationService.getStationById(
      departureStation,
    );

    return await this.rideRepository.save({
      arrivalTime,
      departureTime,
      departureStation: departureSt,
      arrivalStation: arrivalSt,
    });
  }

  async getRides(): Promise<RideEntity[]> {
    return this.rideRepository.find({
      relations: {
        departureStation: true,
        arrivalStation: true,
      },
    });
  }

  async getFilteredRides(
    dayRange: string,
    departureStationId: string,
    arrivalStationId: string,
  ): Promise<RideEntity[]> {
    const rangeDate = new Date();

    rangeDate.setDate(rangeDate.getDate() + +dayRange);
    const departureStation = await this.stationService.getStationById(
      departureStationId,
    );

    const arrivalStation = await this.stationService.getStationById(
      arrivalStationId,
    );

    return await this.rideRepository.find({
      where: {
        departureTime: Between(new Date(), rangeDate),
        departureStation,
        arrivalStation,
      },
      relations: {
        departureStation: true,
        arrivalStation: true,
      },
    });
  }

  async getRideById(id: string): Promise<RideEntity> {
    return await this.rideRepository.findOne({
      where: {
        id,
      },
      relations: {
        departureStation: true,
        arrivalStation: true,
      },
    });
  }

  async deleteRideById(id: string): Promise<DeleteResult> {
    return await this.rideRepository.delete({ id });
  }

  async updateRideById(
    { arrivalTime, arrivalStation, departureTime, departureStation }: RideDto,
    id: string,
  ): Promise<RideEntity> {
    const ride = await this.rideRepository.findOne({
      where: {
        id,
      },
    });
    const arrivalSt = await this.stationService.getStationById(arrivalStation);
    const departureSt = await this.stationService.getStationById(
      departureStation,
    );

    return await this.rideRepository.save({
      ...ride,
      arrivalStation: arrivalSt,
      departureTime,
      arrivalTime,
      departureStation: departureSt,
    });
  }
}
