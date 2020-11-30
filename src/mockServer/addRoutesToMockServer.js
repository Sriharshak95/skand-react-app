import { Response } from 'miragejs';
import isEqual from 'lodash/isEqual';

const addRoutesToMockServer = (mockServer) => {
  // eslint-disable-next-line no-param-reassign
  mockServer.namespace = '/api/v2';

  // Users CRUD
  mockServer.get('/users', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }
    return schema.users.all();
  });
  mockServer.get('/users/:id', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    const user = schema.users.find(request.params.id);
    if (!user) {
      return new Response(500, {}, { message: `No user with id: ${request.params.id} found` });
    }

    return user;
  });
  mockServer.post('/users', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    const attributes = JSON.parse(request.requestBody);
    const idAppendedAttributes = { ...attributes, id: 1000 };
    return schema.users.create(idAppendedAttributes);
  });
  mockServer.patch('/users/:id', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    const user = schema.users.find(request.params.id);
    if (!user) {
      return new Response(500, {}, { message: `No user with id: ${request.params.id} found` });
    }

    const attributes = JSON.parse(request.requestBody);
    return user.update(attributes);
  });
  mockServer.delete('/users/:id', (schema, request) => {
    const jwt = request.requestHeaders.authorization;
    if (jwt === 'null' || !jwt) {
      return new Response(401, {}, { message: 'Please Login' });
    }

    const user = schema.users.find(request.params.id);
    if (!user) {
      return new Response(500, {}, { message: `No user with id: ${request.params.id} found` });
    }

    user.destroy();
    return new Response(200, {}, {});
  });

  // Session Login / Logout
  mockServer.post('/users/tokens', (schema, request) => {
    const acceptedParam = { email: 'test@skand.io', password: 'password' };
    const requestBody = JSON.parse(request.requestBody);
    const headers = { Authorization: '123abc456def789ghi' };
    const errorMessage = { message: 'Email does not match the password' };
    const responseData = 'ok';

    const expectedParamMatchesRequest = !!acceptedParam && isEqual(requestBody, acceptedParam);

    if (!expectedParamMatchesRequest) {
      return new Response(401, {}, errorMessage);
    }

    return new Response(200, headers, responseData);
  });

  mockServer.delete('/users/tokens', () => {
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const responseData = {};

    return new Response(200, headers, responseData);
  });
};

export default addRoutesToMockServer;
