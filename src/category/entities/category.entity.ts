import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryColumn()
    id: string;

    @Column()
    
}
