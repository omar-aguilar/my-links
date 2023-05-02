import { Handlers } from './types';

const Omnibox = (browserAPIs: BrowserAPIs) => {
  const handlers: Handlers = {
    inputChanged: [],
    inputEntered: [],
  };

  const init = () => {
    browserAPIs.omnibox.onInputChanged(async (input, suggest) => {
      handlers.inputChanged.forEach((handler) => handler(input, suggest));
    });

    browserAPIs.omnibox.onInputEntered(async (input) => {
      handlers.inputEntered.forEach((handler) => handler(input));
    });
  };

  const register = <Event extends OmniboxWrapper.OmniboxEvent>(
    event: Event,
    handler: OmniboxWrapper.OmniboxHandler<Event>
  ) => {
    const handlerList = handlers[event];
    handlerList.push(handler as never);
  };

  init();

  return { register };
};

export default Omnibox;
