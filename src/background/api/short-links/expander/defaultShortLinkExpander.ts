import { parseShortLink } from '@/shared/utils';
import { LinkExpander } from './types';

const hasDynamicValue = (value: string) => value.includes('{*}');

const resolveDynamicValues = (shortLinkParams: string[], dynamicPart: string) => {
  const paramsCopy = [...shortLinkParams];
  const dynamicValues = dynamicPart.matchAll(/\{\*\}/g);
  const dynamicValuesArray = [...dynamicValues];

  return dynamicValuesArray.reduce((result, dynamicValue) => {
    const [fullMatch] = dynamicValue;
    const nextParam = paramsCopy.shift();
    if (!nextParam) {
      return result;
    }
    return result.replace(fullMatch, nextParam);
  }, dynamicPart);
};

const resolveOptionalValues = (link: string) => {
  const optionalParams = link.matchAll(/\{\{(.*?)\}\}/g);
  return [...optionalParams].reduce((result, param) => {
    const [fullMatch, paramMatch] = param;
    const [paramDynamicValue, paramDefault] = paramMatch.split('|');
    const useDefault = hasDynamicValue(paramDynamicValue);
    const paramValue = useDefault ? paramDefault : paramDynamicValue;
    return result.replace(fullMatch, paramValue);
  }, link);
};

const defaultShortLinkExpander: LinkExpander = {
  build({ shortLink, link }) {
    const parsedShortLink = parseShortLink(shortLink);
    const { params: shortLinkParams } = parsedShortLink;
    const dynamicLinksResolved = resolveDynamicValues(shortLinkParams, link);
    const realLink = resolveOptionalValues(dynamicLinksResolved);
    return realLink.replace(/\{\*\}/g, '');
  },
};

export default defaultShortLinkExpander;
