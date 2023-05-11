import shortLinkExpanderBuilder from './shortLinkExpanderBuilder';
import defaultShortLinkExpander from './defaultShortLinkExpander';

const defaultExpander = shortLinkExpanderBuilder(defaultShortLinkExpander);

export default defaultExpander;
