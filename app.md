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


## User signup

User will give name, email and set a new password.

Password will be hashed (bcrypt) before saving user into database (using beforeSave hook).

## User signin (creating and storing a new session)

User gives email and his password.

First, check the password with bcrypt compare.

If password doesn't match, we return an error.

If password match, we create a jsonwebtoken  and store the userId in the requistion.

## Updating user info

User will provide the info he wants to upload.

Name, email and password

Password requires other things:

  - The current password
  - The new password
  - He must confirm the new password

We then check if password informed is correct
