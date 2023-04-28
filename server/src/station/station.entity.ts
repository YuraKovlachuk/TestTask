import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RideEntity } from '../ride/ride.entity';

@Entity()
export class StationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => RideEntity, (ride) => ride.departureStation)
  departures: RideEntity[];

  @OneToMany(() => RideEntity, (ride) => ride.departureStation)
  arrivals: RideEntity[];
}
