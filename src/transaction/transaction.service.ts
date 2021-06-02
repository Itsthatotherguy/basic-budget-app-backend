import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsDto } from './dto/list-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionErrors } from './transaction.errors';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionRepository)
        private transactionRepository: TransactionRepository,
        private categoryService: CategoryService,
    ) {}

    public async create(
        createTransactionDto: CreateTransactionDto,
    ): Promise<Transaction> {
        const { categoryId } = createTransactionDto;

        const category = await this.categoryService.findOne(categoryId);

        return this.transactionRepository.create(
            createTransactionDto,
            category,
        );
    }

    public async findAll(): Promise<ListTransactionsDto[]> {
        return this.transactionRepository.findAll();
    }

    public async findOne(id: string): Promise<Transaction> {
        const found = await this.transactionRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(TransactionErrors.NOT_FOUND);
        }

        return found;
    }

    public async update(
        id: string,
        updateTransactionDto: UpdateTransactionDto,
    ): Promise<void> {
        const transaction = await this.findOne(id);

        await this.transactionRepository.update(
            transaction,
            updateTransactionDto,
        );
    }

    public async remove(id: string): Promise<void> {
        const success = await this.transactionRepository.remove(id);

        if (!success) {
            throw new NotFoundException(TransactionErrors.NOT_FOUND);
        }
    }
}
