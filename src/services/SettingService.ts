import { Inject, Service } from '@tsed/common';
import { $log } from '@tsed/logger';
import { MongooseModel } from '@tsed/mongoose';
import { SettingModel } from '../models';

@Service()
export class SettingsService {
  @Inject(SettingModel)
  private Settings: MongooseModel<SettingModel>;

  $onInit() {
    this.reload();
  }

  async reload() {
    const promises = require('../../resources/settings.json').map(
      (settings: SettingModel) => this.save(settings)
    );
    await Promise.all(promises);
  }

  /**
   * Find settings.
   * @returns {undefined|SettingModel}
   */
  async findByKey(key: string): Promise<SettingModel | null> {
    $log.debug('Search settings');

    return await this.Settings.findOne({ key });
  }

  /**
   *
   * @param settings
   * @returns {Promise<TResult|TResult2|SettingModel>}
   */
  async save(settings: SettingModel): Promise<SettingModel> {
    $log.debug({ message: 'Validate settings', settings });

    const model = new this.Settings(settings);
    $log.debug({ message: 'Save settings', settings });
    await model.updateOne(settings, { upsert: true });

    $log.debug({ message: 'Settings saved', model });

    return model;
  }
}
