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
    HttpCode,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @UsePipes(ValidationPipe)
    @Post()
    public async create(
        @Body() createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    public async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findOne(id);
    }

    @UsePipes(ValidationPipe)
    @Patch(':id')
    @HttpCode(204)
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<void> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string): Promise<void> {
        return this.categoryService.remove(id);
    }
}
