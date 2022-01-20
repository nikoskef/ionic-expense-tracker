import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const TRANSACTION_KEY = 'transactions';

export enum CashFlow {
  expense = 0,
  income = 1
}

interface Category {
  name: string;
  icon: string;
}
export interface Transaction {
  createdAt: number;
  title: string;
  value: number;
  notes: string;
  type: CashFlow;
  category: Category;
}

@Injectable({ providedIn: 'root' })
export class CashService {
  constructor(private storage: Storage) {}

  getCategories(): Category[] {
    return [
      { name: 'Food', icon: 'pizza' },
      { name: 'Rent', icon: 'business' },
      { name: 'Shopping', icon: 'cart' },
      { name: 'Sports', icon: 'fitness' },
      { name: 'Education', icon: 'school' },
      { name: 'Travel', icon: 'airplane' }
    ];
  }

  async addTransaction(transaction: Transaction) {
    const transactions = await this.getTransactions();
    transactions.push(transaction);
    console.log('SAVE THIS: ', transactions);
    return this.storage.set(TRANSACTION_KEY, transactions);
  }

  async getTransactions(): Promise<Transaction[]> {
    const transactions: Transaction[] | null = await this.storage.get(TRANSACTION_KEY);

    if (transactions) {
      return transactions.sort((trans, trans2) => trans2.createdAt - trans.createdAt);
    }
    return [];
  }

  async getSelectedCurrency(): Promise<string> {
    return this.storage.get('selected-currency');
  }

  async getGroupedTransactions() {
    const transactions = await this.getTransactions();

    const resultObject = {};

    for (const transaction of transactions) {
      if (resultObject[transaction.category.name]) {
        resultObject[transaction.category.name].transactions.push(transaction);
      } else {
        resultObject[transaction.category.name] = { icon: transaction.category.icon, transactions: [transaction] };
      }
    }

    const result = [];
    Object.keys(resultObject).forEach((category) => {
      result.push({
        category,
        icon: resultObject[category].icon,
        transactions: resultObject[category].transactions
      });
    });

    return result;
  }
}
