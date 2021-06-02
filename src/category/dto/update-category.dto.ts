import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty } from 'class-validator';
import { CategoryErrors } from '../category.errors';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsNotEmpty({ message: CategoryErrors.MISSING_ID })
    id: string;
}
