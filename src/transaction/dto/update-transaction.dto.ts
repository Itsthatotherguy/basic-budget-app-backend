import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsNotEmpty } from 'class-validator';
import { TransactionErrors } from '../transaction.errors';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsNotEmpty({ message: TransactionErrors.MISSING_ID })
    id: string;
}
