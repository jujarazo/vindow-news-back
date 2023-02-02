import { Inject, Service } from '@tsed/common';
import { $log } from '@tsed/logger';
import { MongooseModel } from '@tsed/mongoose';
import { NewsModel } from '../models';

type QueryParams = {
  q: string;
  page: string;
  pageSize: string;
};

type Query = {
  title?: RegExp;
};

type SearchNews = {
  _type: string;
  totalCount: number;
  value: NewsModel[];
};

@Service()
export class NewsService {
  @Inject(NewsModel)
  private News: MongooseModel<NewsModel>;

  $onInit() {
    this.reload();
  }

  // async reload() {
  //   const news = await this.News.find({});

  //   if (news.length === 0) {
  //     const promises = require('../../resources/news.json').map(
  //       (news: NewsModel) => this.save(news)
  //     );
  //     await Promise.all(promises);
  //   }
  // }

  async reload() {
    const promises = require('../../resources/news.json').map(
      (news: NewsModel) => this.save(news)
    );
    await Promise.all(promises);
  }

  /**
   * Find news.
   * @returns {undefined|NewsModel}
   */
  async find(params: QueryParams): Promise<SearchNews> {
    $log.debug('Search news');

    const filter: Query = {};

    if (params.q?.length) {
      filter.title = new RegExp(params.q, 'i');
    }

    const pageSize = Number(params.pageSize || 10);
    const page = Number(params.page || 1) - 1;

    const options = {
      limit: pageSize,
      skip: page * pageSize,
    };

    const news = await this.News.find(filter, null, options);

    const count = await this.News.count(filter);

    const res = {
      _type: 'news',
      totalCount: count,
      value: news,
    };

    $log.debug('Found', news);
    return res;
  }

  /**
   *
   * @param news
   * @returns {Promise<TResult|TResult2|NewsModel>}
   */
  async save(news: NewsModel): Promise<NewsModel> {
    $log.debug({ message: 'Validate news', news });

    const model = new this.News(news);
    $log.debug({ message: 'Save news', news });
    await model.updateOne(news, { upsert: true });

    $log.debug({ message: 'News saved', model });

    return model;
  }
}
