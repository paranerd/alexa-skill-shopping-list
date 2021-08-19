# Alexa Skill for the To-Do-List
This is the Alexa Skill companion for the [To-Do-List Server](https://github.com/paranerd/to-do-list).

## Prerequisites
1. You will need an Amazon Developer account as well as an AWS account
1. Clone the repository
1. [Create AWS credentials](https://developer.amazon.com/de-DE/docs/alexa/smapi/manage-credentials-with-ask-cli.html#create-aws-credentials)
1. Install the Alexa Skill Kit
    ```
    npm i -g ask-cli
    ```
1. Configure the Alexa Skill Kit
    ```
    ask configure
    ```

1. Set the correct region (i.e. region=eu-west-1)
    ```
    nano ~/.aws/credentials
    ```

1. Set up config

    Rename `lambda/config/env.sample` to `lambda/config/env`

    Fill in API_URL and API_TOKEN in `lambda/config/env`

    You may also set those in the AWS UI as "Environment Variables"

1. Update `skill.json`

    Rename `skill-package/skill.sample.json` to `skill.json`

1. Install dependencies

    ```
    cd lambda/
    ```

    ```
    npm i
    ```

1. Deploy
    ```
    ask deploy
    ```

### Debugging
```
ask dialog --locale de-DE
```

## Language support
- German
