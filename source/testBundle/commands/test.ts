import { State } from '@wsmud/botcore/bundle/types/State';
import { User } from '@wsmud/botcore/bundle/types/User';

export = {
  name: 'testCommand',
  command: (state: State) => (data: User, args: any[]) => {
    state.Logger.log(`${data.id} used testCommand, args: ${args.join(' ')}`);
  },
};
