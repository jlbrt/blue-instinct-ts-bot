import { TeamSpeak, QueryProtocol } from 'ts3-nodejs-library';

const teamspeakConnection = new TeamSpeak({
  host: process.env.TEAMSPEAK_HOST as string,
  protocol: QueryProtocol.RAW,
  queryport: parseInt(process.env.TEAMSPEAK_QUERYPORT as string, 10),
  serverport: parseInt(process.env.TEAMSPEAK_SERVERPORT as string, 10),
  username: process.env.TEAMSPEAK_USERNAME as string,
  password: process.env.TEAMSPEAK_PASSWORD as string,
  nickname: 'Blue Instinct Bot',
});

export default teamspeakConnection;
