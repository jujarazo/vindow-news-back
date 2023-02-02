import { Nullable, Property } from '@tsed/schema';
import { Provider } from './Provider';

export class Image {
  @Property()
  url: string;

  @Property()
  height: number;

  @Property()
  width: number;

  @Property()
  thumbnail: string;

  @Property()
  thumbnailHeight: number;

  @Property()
  thumbnailWidth: number;

  @Property()
  @Nullable(String)
  base64Encoding: string;

  @Property()
  @Nullable(String)
  name: string;

  @Property()
  @Nullable(String)
  title: string;

  @Property()
  provider: Provider;

  @Property()
  @Nullable(String)
  imageWebSearchUrl: string;

  @Property()
  webpageUrl: string;
}
