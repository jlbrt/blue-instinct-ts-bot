import logger from '../utils/logger';
import teamspeak from '../teamspeakConnection';
import { ClientConnect } from 'ts3-nodejs-library/lib/types/Events';
import { ClientType } from 'ts3-nodejs-library';
import { isAdmin, isModerator } from '../helpers';
import { tsDBConnection } from '../db';
import { sleep } from '../utils';

interface DBClient {
  client_id: number;
  client_totalconnections: number;
}

async function notifyOnFirstVisit(event: ClientConnect) {
  try {
    if (event.client.type !== ClientType.Regular) return;

    // this is sleep is here to
    // 1) avoid user confusion that might occur when messsaging the user instantly on connect
    // 2) avoid a race condition in which the user might not have been created in the database yet
    await sleep(3000);

    const client = await tsDBConnection<DBClient>('clients')
      .select(['client_id', 'client_totalconnections'])
      .where('client_unique_id', event.client.uniqueIdentifier)
      .first();

    if (!client || client.client_totalconnections > 1) return;

    const message = `Hey ${event.client.nickname}! Sieht so aus, als wärst du das erste mal auf unserem Teamspeak Server. Wenn du dich für die Community bewerben möchtest, schau doch mal auf [URL=https://blueinstinct.de/]unserer Webseite[/URL] vorbei. Solltest du vorher noch Fragen haben, gehe einfach in den Channel [URL=channelid://10]╚● Warte auf Moderator[/URL].`;
    event.client.message(message);

    const connectedClients = await teamspeak.clientList({
      clientType: ClientType.Regular,
    });
    const clientsToNotify = connectedClients.filter((client) => {
      return isAdmin(client) || isModerator(client);
    });

    clientsToNotify.forEach((clientToNotify) => {
      clientToNotify.message(
        `[URL=client://${event.client.clid}/${event.client.uniqueIdentifier}]${event.client.nickname}[/URL] ist zum ersten Mal auf dem Teamspeak Server. Ich habe ihm diese Nachricht geschickt:\n"${message}"`
      );
    });
  } catch (err) {
    logger.log('Error in FirstVisit module', err);
  }
}

export function registerFirstVisit() {
  teamspeak.on('clientconnect', notifyOnFirstVisit);
}
