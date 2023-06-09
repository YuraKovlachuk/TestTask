import { IsNotEmpty, IsString } from 'class-validator';

export class StationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
