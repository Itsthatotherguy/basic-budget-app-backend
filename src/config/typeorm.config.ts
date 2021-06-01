import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'budgetapp',
    autoLoadEntities: true,
    synchronize: true,
};
