import { State } from '@wsmud/botcore/bundle/types/State';

export = {
  name: 'chatLogger',
  event: 'msg',
  listener: (state: State) => (data: any) => {
    const msg = data.content.replace(/<.+?>/g, '');
    state.DataBase.setMsg({
      id: data.uid,
      type: data.ch,
      name: data.name,
      message: msg,
    });
  },
};
