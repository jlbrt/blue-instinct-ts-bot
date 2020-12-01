import { ClientType } from 'ts3-nodejs-library';
import teamspeak from '../teamspeakConnection';
import logger from '../utils/logger';

export const registerAfkMove = () => {
  const moveAfkClients = async () => {
    // TODO 10 is not the actual afk channel
    const afkChannelCid = '10';
    const maxAfkTime = 45 * 60 * 1000;

    const clients = await teamspeak.clientList({
      clientType: ClientType.Regular,
    });

    clients.forEach(async (client) => {
      if (client.idleTime > maxAfkTime && client.cid !== afkChannelCid) {
        await client.move(afkChannelCid);
        client.message(
          '😴 Ich habe dich in den AFK Channel verschoben, weil du schon länger als 45 Minuten AFK bist.'
        );
      }
    });
  };

  try {
    moveAfkClients();
    setInterval(moveAfkClients, 30 * 1000);
  } catch (err) {
    logger.log('Error while moving AFK clients', err);
  }
};
