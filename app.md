# The APP

## App functionalities

Someone will be able to create an account informing name, email and password.

This person will be able to, then, authenticate informing email and password.

This person can also update it's info:

-   name
-   email
-   password (inform the actual password and confirm new password)

## Database description

### User

Will require:

-   id (number) | unique, auto increment, primary key | required
-   name (string) | required
-   email (string) | required, unique
-   password (string) | required
-   created_at
-   updated_at
