import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { typeOrmOptions } from './config/typeorm.config';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmOptions), CategoryModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
