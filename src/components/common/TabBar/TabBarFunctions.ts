import { Tab } from './TabBarTypes'

export function createTabItem<TTabKey extends string>(
  key: TTabKey,
  title: Tab['title'],
  content: Tab['content']
): [TTabKey, Tab] {
  return [key, { title, content }];
}