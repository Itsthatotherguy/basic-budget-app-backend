import { IsNotEmpty, IsEnum } from 'class-validator';
import { CategoryErrors } from '../category.errors';
import { CategoryType } from '../entities/category.entity';

export class CreateCategoryDto {
    @IsNotEmpty({ message: CategoryErrors.MISSING_NAME })
    name: string;

    @IsEnum(CategoryType, { message: CategoryErrors.MISSING_CATEGORY_TYPE })
    categoryType: CategoryType;
}
