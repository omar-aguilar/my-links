export type MessageHandlersMap<Handlers extends Record<string, Message.MessageHandlerConfig>> = {
  [Key in keyof Handlers]: Handlers[Key]['handler'];
};

export type MessageCreatorsMap<Handlers extends Record<string, Message.MessageHandlerConfig>> = {
  [Key in keyof Handlers]: Handlers[Key]['getMessage'];
};

export type EntryMessageHandler = [string, MessageHandler][];
