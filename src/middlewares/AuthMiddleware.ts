import { Unauthorized } from '@tsed/exceptions';
import { Middleware } from '@tsed/platform-middlewares';
import { Context } from '@tsed/platform-params';
import { SettingsService } from '../services';

@Middleware()
export class AuthMiddleware {
  private rapidApiKey?: string;
  private rapidApiHost?: string;

  constructor(private settingsService: SettingsService) {}

  async $onInit() {
    this.rapidApiKey = (
      await this.settingsService.findByKey('x-rapidapi-key')
    )?.value;
    this.rapidApiHost = (
      await this.settingsService.findByKey('x-rapidapi-host')
    )?.value;
  }

  async use(@Context() $ctx: Context) {
    const req = $ctx.getRequest();
    const rapidApiKey = req.get('x-rapidapi-key');
    const rapidApiHost = req.get('x-rapidapi-host');

    if (rapidApiKey !== this.rapidApiKey || rapidApiHost !== this.rapidApiHost)
      throw new Unauthorized('Invalid API key.');
  }
}
