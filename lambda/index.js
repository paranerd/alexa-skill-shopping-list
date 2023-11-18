const Alexa = require('ask-sdk-core');
require('dotenv').config();

let api;
const maxNoOfItemsReported = 5;

if (process.env.BACKEND === 'hass') {
  const HomeAssistant = require('./backends/home-assistant');
  api = new HomeAssistant();
} else {
  const ToDoList = require('./backends/to-do-list');
  api = new ToDoList();
}

let wasOpened = false;

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    );
  },
  handle(handlerInput) {
    wasOpened = true;
    const speakOutput = 'Hier ist deine Einkaufsliste, was möchstest du tun?';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const AddItemIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddItemIntent'
    );
  },
  async handle(handlerInput) {
    // Response container
    let speakOutput;

    // Get item name from request
    let item = Alexa.getSlotValue(handlerInput.requestEnvelope, 'item');
    item = item.charAt(0).toUpperCase() + item.slice(1); // Make first letter uppercase

    try {
      // Add item to list
      await api.create(item);
      speakOutput = `Ich habe ${item} hinzugefügt.`;
      speakOutput += wasOpened ? ' Noch etwas?' : '';
    } catch (err) {
      speakOutput = 'Sorry, da ist etwas schief gelaufen';
      console.error('Error adding item');
      console.error(err);
    }

    // Prepare response builder
    let rb = handlerInput.responseBuilder.speak(speakOutput);

    // Ask for more if opened
    if (wasOpened) {
      rb = rb.reprompt('Noch etwas?');
    }

    return rb.getResponse();
  },
};

const ListItemsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListItemsIntent'
    );
  },
  async handle(handlerInput) {
    // Fallback response
    let speakOutput;

    try {
      // Get all items
      const items = await api.list();

      const noOfItemsReported =
        items.length < maxNoOfItemsReported
          ? items.length
          : maxNoOfItemsReported;

      const itemsToReport = items
        .slice(0, maxNoOfItemsReported)
        .map((item) => item.name);

      // Output
      if (noOfItemsReported == 1) {
        speakOutput = `Es ist ein Artikel auf deiner Liste: ${itemsToReport.join(', ')}`;
      } else {
        const itemList = itemsToReport.slice(0, -1).join(', ') + ' und ' + itemsToReport.slice(-1);
        if (items.length > maxNoOfItemsReported) {
          speakOutput = `Es sind ${items.length} Artikel auf deiner Liste. Die letzten ${noOfItemsReported} sind: ${itemList}`;
        } else {
          speakOutput = `Es sind ${noOfItemsReported} Artikel auf deiner Liste: ${itemList}`;
        }
      }
      
    } catch (err) {
      speakOutput = 'Sorry, da ist etwas schief gelaufen';
      console.error(err);
    }

    let rb = handlerInput.responseBuilder.speak(speakOutput);

    // Ask for more if opened
    if (wasOpened) {
      rb = rb.reprompt('Noch etwas?');
    }

    return rb.getResponse();
  },
};

const ClearCompletedItemsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'ClearCompletedItemsIntent'
    );
  },
  async handle(handlerInput) {
    // Response container
    let speakOutput;

    try {
      // Add item to list
      await api.clear();
      speakOutput = 'Liste aufgeräumt';
    } catch (err) {
      speakOutput = 'Sorry, da ist etwas schief gelaufen';
      console.error('Error clearing list');
      console.error(err);
    }

    // Prepare response builder
    let rb = handlerInput.responseBuilder.speak(speakOutput);

    // Ask for more if opened
    if (wasOpened) {
      rb = rb.reprompt('Noch etwas?');
    }

    return rb.getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const speakOutput =
      'Aktuell kann ich dir leider noch nicht helfen. Tut mir Leid.';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'AMAZON.StopIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent')
    );
  },
  handle(handlerInput) {
    const speakOutput = 'Bis bald!';
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      'SessionEndedRequest'
    );
  },
  handle(handlerInput) {
    // Any cleanup logic goes here.
    wasOpened = false;
    return handlerInput.responseBuilder.getResponse();
  },
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AddItemIntentHandler,
    ListItemsIntentHandler,
    ClearCompletedItemsIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
