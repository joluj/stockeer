import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BarcodeEntity {
  @PrimaryColumn()
  barcode: string;

  @Column()
  name: string;
}
