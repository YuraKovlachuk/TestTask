import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StationEntity } from '../station/station.entity';

@Entity()
export class RideEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @ManyToOne(() => StationEntity, (station) => station.departures)
  departureStation: StationEntity;

  @ManyToOne(() => StationEntity, (station) => station.arrivals)
  arrivalStation: StationEntity;
}
