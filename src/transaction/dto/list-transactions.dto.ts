export class ListTransactionsDto {
    id: string;
    date: Date;
    description: string;
    category: {
        id: string;
        name: string;
    };
    amount: number;
    balance: number;
}
