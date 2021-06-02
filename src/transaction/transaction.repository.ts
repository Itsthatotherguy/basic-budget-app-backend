import { InternalServerErrorException } from '@nestjs/common';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsDto } from './dto/list-transactions.dto';
import { Transaction } from './entities/transaction.entity';
import { v4 as uuid } from 'uuid';
import { Category } from 'src/category/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryService } from 'src/category/category.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@EntityRepository(Transaction)
export class TransactionRepository extends AbstractRepository<Transaction> {
    constructor(private categoryService: CategoryService) {
        super();
    }

    public async create(
        createTransactionDto: CreateTransactionDto,
        category: Category,
    ): Promise<Transaction> {
        const { categoryId, amount, ...createData } = createTransactionDto;

        const transaction = this.repository.create({
            ...createData,
            id: uuid(),
            category,
            amount: category.categoryType === 'Income' ? amount : -amount,
        });

        try {
            await this.repository.save(transaction);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return transaction;
    }

    public async findAll(): Promise<ListTransactionsDto[]> {
        try {
            const query = await this.repository.query(
                `
                SELECT
                    t.transaction_id,
                    t.date,
                    t.description,
                    json_build_object(
                        'category_id', c.category_id,
                        'name', c.name,
                        'category_type', c.category_type
                    ) AS category,
                    t.amount,
                    SUM (amount) OVER (
                        ORDER BY t.date, t.transaction_id
                    ) AS balance
                FROM transaction t                            

                LEFT JOIN category c ON t.category_id = c.category_id;
                `,
            );

            return query;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async findOne(id: string): Promise<Transaction> {
        try {
            return this.repository.findOne(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async update(
        transaction: Transaction,
        updateTransactionDto: UpdateTransactionDto,
    ): Promise<Transaction> {
        const { categoryId, ...updateData } = updateTransactionDto;
        const updatedTransaction: Transaction = {
            ...transaction,
            ...updateData,
        };

        // get new category if needed
        if (categoryId) {
            if (transaction.category.id !== categoryId) {
                updatedTransaction.category =
                    await this.categoryService.findOne(categoryId);
            }

            if (
                transaction.category.categoryType !==
                updatedTransaction.category.categoryType
            ) {
                updatedTransaction.amount *= -1;
            }
        }

        try {
            await this.repository.save(updatedTransaction);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return updatedTransaction;
    }

    public async remove(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);

        return result.affected > 0;
    }
}
