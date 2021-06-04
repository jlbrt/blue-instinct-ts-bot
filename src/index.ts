import teamspeak from './teamspeakConnection';
import * as waitingForSupportNotifyModule from './modules/waitingForSupportNotify';
import * as afkMoveModule from './modules/afkMove';
import * as firstVisitModule from './modules/firstVisit';

const main = async () => {
  await teamspeak.connect();

  waitingForSupportNotifyModule.registerWaitingForSupportNotify();
  afkMoveModule.registerAfkMove();
  firstVisitModule.registerFirstVisit();
};

main();
