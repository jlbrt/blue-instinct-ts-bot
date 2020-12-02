import { ClientType } from 'ts3-nodejs-library';
import { ClientMoved } from 'ts3-nodejs-library/lib/types/Events';
import { isAdmin, isModerator } from '../helpers';
import teamspeak from '../teamspeakConnection';
import logger from '../utils/logger';

const notifyOnWaitingForSupport = async (event: ClientMoved) => {
  try {
    const waitingForSupportChannelCid = '10';
    const waitingForAdminChannelCid = '11';

    if (
      ![waitingForSupportChannelCid, waitingForAdminChannelCid].includes(
        event.channel.cid
      )
    ) {
      return;
    }

    if (isAdmin(event.client) || isModerator(event.client)) return;

    const clients = await teamspeak.clientList({
      clientType: ClientType.Regular,
    });

    const clientsToNotify = clients.filter((client) => {
      if (event.channel.cid === waitingForSupportChannelCid) {
        return isAdmin(client) || isModerator(client);
      }

      if (event.channel.cid === waitingForAdminChannelCid) {
        return isAdmin(client);
      }
    });

    clientsToNotify.forEach((clientToNotify) => {
      const waitingFor =
        event.channel.cid === waitingForAdminChannelCid ? 'Admin' : 'Supporter';

      clientToNotify.message(
        `✋ ${event.client.nickname} wartet auf einen ${waitingFor}.`
      );
    });
  } catch (err) {
    logger.log('Error in notifyOnWaitingForSupport', err);
  }
};

export const registerWaitingForSupportNotify = () => {
  teamspeak.on('clientmoved', notifyOnWaitingForSupport);
};
