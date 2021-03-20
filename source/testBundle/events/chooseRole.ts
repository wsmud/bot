import { State } from '@wsmud/botcore/bundle/types/State';

export = {
  name: 'chooseRole',
  event: 'roles',
  listener: (state: State) => (data: any) => {
    const user = data.roles.find((role: any) => role.name === state.Config.get('name'));
    state.Socket?.send(`login ${user.id}`);
  },
};
