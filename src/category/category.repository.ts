import { AbstractRepository, EntityRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryType } from './entities/category.entity';
import { v4 as uuid } from 'uuid';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { CategoryErrors } from './category.errors';
import { UpdateCategoryDto } from './dto/update-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends AbstractRepository<Category> {
    public async create(
        createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        const category = this.repository.create({
            id: uuid(),
            ...createCategoryDto,
        });

        try {
            await this.repository.save(category);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return category;
    }

    public async findAll(): Promise<Category[]> {
        try {
            return this.repository.find();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    public async findOne(id: string): Promise<Category> {
        try {
            return this.repository.findOne(id);
        } catch (error) {
            throw new InternalServerErrorException('Oops');
        }
    }

    public async findByNameAndType(
        name: string,
        categoryType: CategoryType,
    ): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                name,
                categoryType,
            },
        });

        return count > 0;
    }

    public async update(
        category: Category,
        updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category> {
        const updatedCategory = this.repository.create({
            ...category,
            ...updateCategoryDto,
        });

        try {
            await this.repository.save(updatedCategory);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return updatedCategory;
    }

    public async remove(id: string): Promise<boolean> {
        try {
            const result = await this.repository.delete(id);

            return result.affected > 0;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
