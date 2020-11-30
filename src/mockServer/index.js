import { Server, Model } from 'miragejs';
import addRoutesToMockServer from './addRoutesToMockServer';
import getUsers from './users';

const mockServer = new Server({
  models: {
    users: Model,
  },

  seeds(server) {
    getUsers.data.forEach((user) => {
      server.schema.users.create(user);
    });
  },
});

addRoutesToMockServer(mockServer);

export default mockServer;
