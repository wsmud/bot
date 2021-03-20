/* eslint @typescript-eslint/no-unused-vars: 'off' */

import { State } from '@wsmud/botcore/bundle/types/State';
import { Logger } from '@wsmud/botcore';

const logger: Logger = new Logger('Tip');

export = {
  name: 'tipLogger',
  event: 'tip',
  listener: (state: State) => (data: any) => {
    logger.log(data.message.replace(/<.+?>/g, ''));
  },
};
