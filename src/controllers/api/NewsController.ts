import { Controller } from '@tsed/di';
import { UseBefore } from '@tsed/platform-middlewares';
import { QueryParams } from '@tsed/platform-params';
import { Get } from '@tsed/schema';
import { AuthMiddleware } from '../../middlewares';
import { NewsService } from '../../services';

@Controller('/search')
@UseBefore(AuthMiddleware)
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/NewsSearchApi')
  async get(
    @QueryParams('q') q: string,
    @QueryParams('pageNumber') page: string,
    @QueryParams('pageSize') size: string
  ) {
    const res = await this.newsService.find({ q, page, pageSize: size });

    return res;
  }
}
