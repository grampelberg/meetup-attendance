# Setup

- Clone this repo locally via. git:

    ```bash
    git clone git://github.com/pyronicide/meetup-attendance.git && cd shout
    ```

- Create an account on heroku: [sign up](https://api.heroku.com/signup)

- Install [heroku toolbelt](https://toolbelt.heroku.com/)

- Login to heroku

    ```bash
    heroku login
    ```

- Create a server

    ```bash
    heroku create
    ```

- Upload your ssh key

    ```bash
    heroku keys:add ~/.ssh/id_rsa.pub
    ```

- Push the code

    ```bash
    git push heroku master
    ```
- Configure your group name

    ```bash
    heroku config:add GROUP_NAME=My-Group
    ```

- Configure your API Key

    ```bash
    heroku config:add KEY=12345
    ```

- Force heroku to use only one dyno

    ```bash
    heroku ps:scale web=1
    ```

- Make sure the server is in production mode

    ```bash
    heroku config:add NODE_ENV=production
    ```

- Check the status, should be "up"

    ```bash
    heroku ps
    ```

- To watch the logs, first run

    ```bash
    heroku logs --tail
    ```

- Now, go to your site and register attendance for an event. The url will be something like: https://my-heroku-site.heroku.com/register/:event-id
