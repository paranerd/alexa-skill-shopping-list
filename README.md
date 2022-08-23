# Alexa Shopping List Companion
This is an extensible Alexa Companion Skill.

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

    Rename `lambda/.env.sample` to `lambda/.env`

    Fill in `lambda/.env`

    OR

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

## Deployment
### New skill
1. Run
    ```
    ask deploy
    ```

### Existing skill
1. Add the `/.ask/ask-states.json` you saved from your last deployment
1. Run
    ```
    ask deploy
    ```

## Debugging
```
ask dialog --locale de-DE
```

## Backend support
- [Home Assistant Shopping List](https://www.home-assistant.io/integrations/shopping_list/)
- [To-Do-List](https://github.com/paranerd/to-do-list)

## Language support
- German
