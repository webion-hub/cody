import { FormatLengthController } from "./utilities/format_length_controller";

export class FormatControllerBase {
  static canSkip = (data, skip) => {
    const areNotData = data.length === 0
    return skip && areNotData 
  }

  static wrongLength= (val, what, skip = false) => {
    return FormatLengthController
      .set(what)
      .wrongFormat(val, {skippable: skip});
  }
}