import { TeamSpeakClient } from 'ts3-nodejs-library';

export const isAdmin = (client: TeamSpeakClient) => {
  const adminGroupId = '6';

  return client.servergroups.includes(adminGroupId);
};

export const isModerator = (client: TeamSpeakClient) => {
  const adminGroupId = '9';

  return client.servergroups.includes(adminGroupId);
};
