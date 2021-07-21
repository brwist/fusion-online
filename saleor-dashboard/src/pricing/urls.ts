import { stringifyQs } from "../utils/urls";


export const pricingListPath = "/pricing/"
export const pricingListUrl = (params?): string =>
pricingListPath + "?" + stringifyQs(params);