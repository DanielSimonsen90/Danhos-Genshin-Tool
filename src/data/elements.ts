import { Element } from "@/common/types";

export const Elements: Array<Element> = [
  'Anemo',
  'Cryo',
  'Dendro',
  'Electro',
  'Geo',
  'Hydro',
  'Pyro',
];

export default Elements;

const Regexex = Elements.map(element => new RegExp(element));
export function getElement(str: string) {
  const index = Regexex.findIndex(regex => regex.test(str));
  return Elements[index];
}