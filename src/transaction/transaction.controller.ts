import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { ListTransactionsDto } from './dto/list-transactions.dto';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @UsePipes(ValidationPipe)
    @Post()
    public create(
        @Body() createTransactionDto: CreateTransactionDto,
    ): Promise<Transaction> {
        return this.transactionService.create(createTransactionDto);
    }

    @Get('')
    public async findAll(): Promise<ListTransactionsDto[]> {
        return this.transactionService.findAll();
    }

    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<Transaction> {
        return this.transactionService.findOne(id);
    }

    @UsePipes(ValidationPipe)
    @Patch(':id')
    public async update(
        @Param('id') id: string,
        @Body() updateTransactionDto: UpdateTransactionDto,
    ): Promise<void> {
        return this.transactionService.update(id, updateTransactionDto);
    }

    @Delete(':id')
    public async remove(@Param('id') id: string): Promise<void> {
        return this.transactionService.remove(id);
    }
}
