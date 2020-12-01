import { ClientType } from 'ts3-nodejs-library';
import { ClientMoved } from 'ts3-nodejs-library/lib/types/Events';
import { isAdmin } from '../helpers';
import teamspeak from '../teamspeakConnection';
import logger from '../utils/logger';

const notifyOnWaitingForSupport = async (event: ClientMoved) => {
  try {
    const waitingForSupportChannelCid = '10';

    if (
      event.channel.cid !== waitingForSupportChannelCid ||
      isAdmin(event.client)
    ) {
      return;
    }

    const clients = await teamspeak.clientList({
      clientType: ClientType.Regular,
    });
    const adminClients = clients.filter(isAdmin);

    adminClients.forEach((adminClient) => {
      adminClient.message(
        `✋ ${event.client.nickname} wartet auf einen Supporter.`
      );
    });
  } catch (err) {
    logger.log('Error in notifyOnWaitingForSupport', err);
  }
};

export const registerWaitingForSupportNotify = () => {
  teamspeak.on('clientmoved', notifyOnWaitingForSupport);
};
