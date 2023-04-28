import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RideDto } from './ride.dto';
import { RideEntity } from './ride.entity';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {
  constructor(private rideService: RideService) {}

  @Post()
  createRide(@Body() body: RideDto): Promise<RideEntity> {
    return this.rideService.createRide(body);
  }

  @Get()
  getRides(): Promise<RideEntity[]> {
    return this.rideService.getRides();
  }

  @Get('filter')
  getFilteredRides(
    @Query('dayRange') days: string,
    @Query('departureStationId') departureStationId: string,
    @Query('arrivalStationId') arrivalStationId: string,
  ): Promise<RideEntity[]> {
    return this.rideService.getFilteredRides(
      days,
      departureStationId,
      arrivalStationId,
    );
  }

  @Get(':id')
  getRideById(@Param() params: { id: string }): Promise<RideEntity> {
    return this.rideService.getRideById(params.id);
  }

  @Delete(':id')
  async deleteRideById(
    @Param() params: { id: string },
  ): Promise<{ message: string }> {
    await this.rideService.deleteRideById(params.id);
    return { message: 'success' };
  }

  @Put(':id')
  async updateRideById(
    @Body() ride: RideDto,
    @Param() params: { id: string },
  ): Promise<RideEntity> {
    return this.rideService.updateRideById(ride, params.id);
  }
}
