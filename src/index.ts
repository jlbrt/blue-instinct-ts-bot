import teamspeak from './teamspeakConnection';
import * as waitingForSupportNotifyModule from './modules/waitingForSupportNotify';
import * as afkMoveModule from './modules/afkMove';

const main = async () => {
  await teamspeak.connect();

  waitingForSupportNotifyModule.registerWaitingForSupportNotify();
  afkMoveModule.registerAfkMove();
};

main();
