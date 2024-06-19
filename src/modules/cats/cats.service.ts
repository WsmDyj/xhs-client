import { Inject, Injectable } from '@nestjs/common';
import { Cat, FilterCats } from './interface.ts/cat.interface';
import { AppConfig, IAppConfig } from '~/config/app.config';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{ id: 1, name: 'tom', age: 2 }];

  constructor(
    // 基于属性的注入
    @Inject(AppConfig.KEY) private appConfig: IAppConfig,
  ) {}

  create(cat: Cat) {
    console.log(this.appConfig.name);
    this.cats.push(cat);
  }

  async findOne(id: number) {
    const cats = this.cats.filter((it) => it.id === id);
    return cats;
  }

  findAll(filterCats: FilterCats): Cat[] {
    if (filterCats) {
      return this.cats;
    }
    return this.cats;
  }
}
