let actualKey = 0;

export class KeyGenerator {
  static getKeyFromDate = () => {
    const date = new Date()
    const time = date.getTime()
    return time.toString(36)
  }

  static getKeyFromRandom = (seed) => {
    const rndNumber = Math.random(seed);
    return rndNumber.toString(36).substring(2, 15)
  }

  static generate = (word) => {
    const fromDate = this.getKeyFromDate()
    const fromRandom = this.getKeyFromRandom(actualKey)

    const optionalWord = word 
      ? `${word}-` 
      : ""

    const uniqueSeed = 
      optionalWord
      + fromDate 
      + "-" 
      + fromRandom 
      + "-" 
      + actualKey

    actualKey++;
    return uniqueSeed
  }
}