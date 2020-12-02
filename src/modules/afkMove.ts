import { ClientType } from 'ts3-nodejs-library';
import teamspeak from '../teamspeakConnection';
import logger from '../utils/logger';

export const registerAfkMove = () => {
  const moveAfkClients = async () => {
    const ignoredChannels = ['10', '11', '59', '60', '61'];
    const afkChannelCid = '60';
    const maxAfkTime = 45 * 60 * 1000;

    const clients = await teamspeak.clientList({
      clientType: ClientType.Regular,
    });

    clients.forEach(async (client) => {
      if (ignoredChannels.includes(client.cid)) return;
      if (client.idleTime < maxAfkTime) return;

      await client.move(afkChannelCid);
      client.message(
        '😴 Ich habe dich in den AFK Channel verschoben, weil du schon länger als 45 Minuten AFK bist.'
      );
    });
  };

  try {
    moveAfkClients();
    setInterval(moveAfkClients, 30 * 1000);
  } catch (err) {
    logger.log('Error while moving AFK clients', err);
  }
};
