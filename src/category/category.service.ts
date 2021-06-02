import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryErrors } from './category.errors';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository,
    ) {}

    public async create(
        createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        // check that category doesn't already exist
        if (
            await this.categoryRepository.findByNameAndType(
                createCategoryDto.name,
                createCategoryDto.categoryType,
            )
        ) {
            throw new ConflictException(CategoryErrors.CATEGORY_ALREADY_EXISTS);
        }

        // create category entity
        return this.categoryRepository.create(createCategoryDto);
    }

    public async findAll(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    public async findOne(id: string): Promise<Category> {
        const found = await this.categoryRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(CategoryErrors.NOT_FOUND);
        }

        return found;
    }

    public async update(
        id: string,
        updateCategoryDto: UpdateCategoryDto,
    ): Promise<void> {
        const category = await this.findOne(id);

        // check that category doesn't already exist
        if (
            (category.name !== updateCategoryDto.name ||
                category.categoryType !== updateCategoryDto.categoryType) &&
            (await this.categoryRepository.findByNameAndType(
                updateCategoryDto.name,
                updateCategoryDto.categoryType,
            ))
        ) {
            throw new ConflictException(CategoryErrors.CATEGORY_ALREADY_EXISTS);
        }

        await this.categoryRepository.update(category, updateCategoryDto);
    }

    public async remove(id: string): Promise<void> {
        const success = await this.categoryRepository.remove(id);

        if (!success) {
            throw new NotFoundException(CategoryErrors.NOT_FOUND);
        }
    }
}
