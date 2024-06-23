export function makeUrl(...list: Array<unknown>) {
  return list.filter(item => !!item).join('/');
}
