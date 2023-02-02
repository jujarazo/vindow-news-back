import { $log, PlatformLoggerSettings } from '@tsed/common';
import { isProduction } from '../envs/index';

if (isProduction) {
  $log.appenders.set('stdout', {
    type: 'stdout',
    levels: ['info', 'debug'],
    layout: { type: 'colored' },
  });

  $log.appenders.set('stderr', {
    levels: ['trace', 'fatal', 'error', 'warn'],
    type: 'stderr',
    layout: { type: 'colored' },
  });
}

export default <PlatformLoggerSettings>{
  disableRoutesSummary: isProduction,
};
