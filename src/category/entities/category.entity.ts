import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum CategoryType {
    Income = 'Income',
    Expenses = 'Expenses',
}

@Entity()
export class Category {
    @PrimaryColumn({ name: 'category_id' })
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: CategoryType,
    })
    categoryType: CategoryType;
}
