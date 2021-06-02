import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { typeOrmOptions } from './config/typeorm.config';
import { TransactionModule } from './transaction/transaction.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmOptions), CategoryModule, TransactionModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
