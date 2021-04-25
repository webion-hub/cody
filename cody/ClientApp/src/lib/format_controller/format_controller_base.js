export class FormatControllerBase {
  static canSkip = (data, skip) => {
    const areNotData = data.length === 0
    return skip && areNotData 
  }
}