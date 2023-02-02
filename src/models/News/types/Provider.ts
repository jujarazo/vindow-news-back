import { Property } from '@tsed/schema';

export class Provider {
  @Property()
  name: string;

  @Property()
  favIcon: string;

  @Property()
  favIconBase64Encoding: string;
}
