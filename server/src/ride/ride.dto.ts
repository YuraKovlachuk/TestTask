import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RideDto {
  @IsString()
  @IsNotEmpty()
  departureStation: string;

  @IsString()
  @IsNotEmpty()
  arrivalStation: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  departureTime: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  arrivalTime: Date;
}
