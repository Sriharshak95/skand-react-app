# Tasks List

### Frontend basics

1. Implement a Login page that uses `Formik` to implement the forms and `Yup` to do basic form validation
2. Implement a Users Index page by fetching data from `GET /api/v2/users`

   - This page should have a table
     - The columns of this table should be: `ID`, `Email`, `Jobs Count`, and `Active` status
     - Each row should have action buttons to `View`, `Edit` and `Delete` user
   - This page should have a button to redirect to the user creation page

3. Implement a User Details page that shows all the data of a single user
4. Implement a Create / Edit page to create or update the data of a single user. You will also need to use `Formik` to implement the forms in this page
5. Implement pagination in your `Users Index` page
6. Implement filters in your `Users Index` page which allows the users to filter the list by `email` and `active` status

### Notes

- Take a look at `react-redux` and apply it for state management
- Take a look at `redux-saga` and apply it in your work
- You will need to use `react-router` / `react-router-dom` to set up different routes
- Feel free to use any CSS frameworks (Bootstrap / Reactstrap / CoreUI / MateiralizeCSS)
- Use CSS-in-JS libraries (`styled-components` / `emotion` e.t.c.)

### Devops/Cloud Infra

1. Research about `AWS S3 Static Hosting` and the way to deploy your ReactJS application on S3.
2. Set up the cloud infrastructure on AWS S3 to host the static built React app on it.
3. Learn what `SSL certificates` and `HTTPS` are and why they are essential in modern websites
4. Find the way to redirect your React App from S3 to `AWS Cloudfront` and enable `HTTPS` in Cloudfront
5. Learn what `CI/CD` means and why we need it
6. Find the way to set up a `CircleCI` pipeline to build your React app and deploy the production version onto AWS S3
7. Set up a CircleCI CI/CD pipeline
