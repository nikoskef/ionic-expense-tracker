import { Injectable } from '@angular/core';

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
  constructor() {}

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
}
