import { Model, ObjectID } from '@tsed/mongoose';
import { Nullable, Property } from '@tsed/schema';
import { Provider, Image } from './types';

@Model()
export class NewsModel {
  @ObjectID('_id')
  _id: string;

  @Property()
  description: string;

  @Property()
  title: string;

  @Property()
  url: string;

  // @Property()
  // body: string;

  // @Property()
  // snippet: string;

  @Property()
  keywords: string;

  @Property()
  language: string;

  @Property()
  isSafe: boolean;

  @Property()
  datePublished: string;

  @Property()
  @Nullable(String)
  imageWebSearchUrl: string;

  @Property()
  webpageUrl: string;

  @Property()
  provider: Provider;

  @Property()
  image: Image;
}
