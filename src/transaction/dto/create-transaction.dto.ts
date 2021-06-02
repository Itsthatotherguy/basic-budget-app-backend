import { IsNotEmpty } from 'class-validator';
import { TransactionErrors } from '../transaction.errors';

export class CreateTransactionDto {
    @IsNotEmpty({ message: TransactionErrors.MISSING_DATE })
    date: string;

    @IsNotEmpty({ message: TransactionErrors.MISSING_DESCRIPTION })
    description: string;

    @IsNotEmpty({ message: TransactionErrors.MISSING_CATEGORY })
    categoryId: string;

    @IsNotEmpty({ message: TransactionErrors.MISSING_AMOUNT })
    amount: number;
}
