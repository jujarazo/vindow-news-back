import { Model } from '@tsed/mongoose';
import { Property } from '@tsed/schema';

@Model()
export class SettingModel {
  @Property()
  name: string;

  @Property()
  key: string;

  @Property()
  value: string;
}
