# Skand

To the developer who received this take home challenge. Congratulations on reaching this stage of Skand's frontend developer recruitment process. In this stage, you will receive a series of tasks. The purpose and goals of this process is for you to:

1. Get you familiar with the basic tools Skand's dev team are using
2. Assert your skill in implementing the functionalities required by the team / clients
3. Assert your ability to learn new technologies as some of the tools required for this challenge may be new to you

## Before starting the app

1. `$ yarn install` to install the `node_modules`
2. `$ yarn start` to execute the project and run on http://localhost:3000 by default
3. `$ yarn build` to build the static version application, which stores in `./build/` directory

### To fetch data from the mock server

- Example call to the mock server `fetch('/api/v2/users')` to GET all users
- You will need to login first with the `POST /users/tokens` route. In `response.headers.map.authorization`, you can find the token required to call all other routes
- Store the token in either the Cookies or LocalStorage and put the token in the headers when you are calling other routes. For instance:
  ```
  const token = TOKEN_STORED_IN_THE_COOKIES;
  fetch('/api/v2/users', {
    headers: {
      Authorization: token,
    }
  })
  ```

### Available mock server routes

- `POST /users/tokens` to login and get the token used to fetch other routes. If the token is not provided in the headers, the request will fail with `401 Unauthorized`
  - The request body of the login route should be:
    ```
    {
      email: 'test@skand.io',
      password: 'password'
    }
    ```
- `DELETE /users/tokens` to logout
- `GET /users` to fetch all users
- `GET /users/:id` to fetch the single user with the specified id
- `POST /users` to create a new user
  - The request body of the new user creation route looks like this:
    ```
    {
      "email": "test1@skand.io",
      "first_name": "Test",
      "last_name": "User 1",
      "jobs_count": 1,
      "active": true,
      "slack_username": "U57V3NH8W"
    }
    ```
- `PATCH /users/:id` to update the user with the specified id
- `DELETE /users/:id` to delete the user with the specified id
- If any part of this short documentation appears to be unclear, take a look at the files under `/src/mockServer/`

### Any questions?

Don't hesitate to ask! We're happy to guide you to succeed on this stage and soon become our potential team / family member.
