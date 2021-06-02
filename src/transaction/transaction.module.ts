import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { TransactionRepository } from './transaction.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([TransactionRepository]),
        CategoryModule,
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
