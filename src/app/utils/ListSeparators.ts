export class ListSeparators {
  public static getIsFirstItem(index: number) {
    return index === 0;
  }

  public static getIsLastItem(index: number, array: Array<unknown>) {
    return index + 1 === array.length;
  }

  public static getHasSeparator(index: number, array: Array<unknown>) {
    return array.length > index + 1;
  }
}
