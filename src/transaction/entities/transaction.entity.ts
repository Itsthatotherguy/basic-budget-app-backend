import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryColumn({ name: 'transaction_id' })
    id: string;

    @Column()
    date: string;

    @Column()
    description: string;

    @ManyToOne((type) => Category, { eager: true })
    category: Category;

    @Column('money')
    amount: number;
}
