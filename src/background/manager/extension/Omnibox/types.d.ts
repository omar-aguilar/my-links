export type Handlers = {
  [Key in OmniboxWrapper.OmniboxEvent]: OmniboxWrapper.OmniboxHandler<Key>[];
};
