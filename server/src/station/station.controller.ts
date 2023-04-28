import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StationService } from './station.service';
import { StationDto } from './station.dto';
import { StationEntity } from './station.entity';

@Controller('station')
export class StationController {
  constructor(private stationService: StationService) {}

  @Post()
  createStation(@Body() station: StationDto): Promise<StationEntity> {
    return this.stationService.createStation(station);
  }

  @Get()
  getStations(): Promise<StationEntity[]> {
    return this.stationService.getStations();
  }

  @Get(':id')
  getStationById(@Param() param: { id: string }): Promise<StationEntity> {
    return this.stationService.getStationById(param.id);
  }

  @Delete(':id')
  async deleteStation(
    @Param() params: { id: string },
  ): Promise<{ message: string }> {
    await this.stationService.deleteStationById(params.id);
    return { message: 'Success' };
  }

  @Put(':id')
  updateStation(@Body() body: StationDto, @Param() params: { id: string }) {
    return this.stationService.updateStationById(body, params.id);
  }
}
