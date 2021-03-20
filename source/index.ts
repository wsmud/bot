import { Util, Config, Logger } from '@wsmud/botcore';
import * as core from '@wsmud/botcore';
import { State } from '@wsmud/botcore/bundle/types/State';

const myConfig: Config = new Config('config.yml');
const server = myConfig.get('server');
const account = myConfig.get('account');
const password = myConfig.get('password');
const bundlesPath = myConfig.get('bundlesPath', 'bundles');

if (
  !server ||
  !account ||
  !password ||
  typeof server !== 'number' ||
  typeof account !== 'string' ||
  typeof password !== 'string' ||
  typeof bundlesPath !== 'string'
) {
  throw new Error('配置文件错误。');
}

(async () => {
  const wsUrl = await Util.getServer(server);
  const token = await Util.getToken(account, password);
  const Socket = new core.Socket(wsUrl, token);
  const state: State = {
    Socket,
    Config: myConfig,
    Logger: new Logger(),
    DataBase: new core.DataBase(),
    CommandManager: new core.CommandManager(),
    EventManager: new core.EventManager(Socket),
    HelpManager: new core.HelpManager(),
  };

  await core.BundleLoader.loadBundles(bundlesPath, state);
  state.EventManager.attachAll();
})();
