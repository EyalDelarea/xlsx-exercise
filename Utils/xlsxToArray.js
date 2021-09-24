/**
 * Converts xlsx file into a JS object

 * @param {*} workSheet object from xlsx libary
 * @returns file as an object.
 *  Schema:
 *      Attribues array
 *      Rows array
 *      each item is an object
 */
module.exports.xlsxToArray = (workSheet) => {
  //Bonus feature chcking for duplicated emails
  const duplicatesMap = new Map();

  /**
   * This function return an array of 2 chars indicating the range
   * of the sheet
   * @param {*} ref attribute from the xlsx
   */
  function extaractange(ref) {
    const rangesArray = [];
    const temp = ref.split(":");

    rangesArray.push(temp[0][0]);
    rangesArray.push(temp[1][0]);
    return rangesArray;
  }

  //save range and delete it from the object
  const range = extaractange(workSheet["!ref"]);
  delete workSheet["!ref"];
  workSheet.delete;

  var sheetAsArray = [];
  var attributes = [];
  var currentRowObject = {};

  //extract meta data and delete
  for (const [cell, data] of Object.entries(workSheet)) {
    attributes.push(data.w);
    delete workSheet[cell];
    //reader is at the end of the row
    if (cell[0] === range[1]) break;
  }
  delete workSheet["!margins"];

  //convert each row to an object
  var valuesArray = [];
  var prev_validater;
  for (const [cell, data] of Object.entries(workSheet)) {
    //Gather row data
    valuesArray.push(data.w);
    prev_validater = validateNonEmptyFields(range, cell, prev_validater);
    //Reached the end of the row
    if (cell[0] === range[1]) {
      valuesArray.forEach((val, index) => {
        if (attributes[index] === "email") {
          if (!duplicatesMap.get(val)) {
            duplicatesMap.set(val, true);
          } else {
            throw new Error(
              "Duplicated email found,Emails must be a primary key!"
            );
          }
        }
        //build the object
        currentRowObject[attributes[index]] = val;
      });
      //save the obejct and reset
      sheetAsArray.push(currentRowObject);
      currentRowObject = {};
      valuesArray = [];
      prev_validater = undefined;
    }
  }

  return (sheet = {
    attributes: attributes,
    rows: sheetAsArray,
  });
};

/**
 * This function will validate there are no missing fields
 * in the XLSX sheet.
 *
 * Missing fields are presented as a gap between the cells
 * empty strings do not gets read by the xlsx parser
 *
 * In order to detect them
 *
 * In the case of an error,throw error with the corsponding cell
 *
 * @param {*} range : Table range Ex. -A to G;
 * @param {*} cell  current cell
 * @param {*} prev_validater previous cell to compare to next cell
 * @returns
 */
const validateNonEmptyFields = (range, cell, prev_validater) => {
  const start = range[0].charCodeAt(0);
  const end = range[1].charCodeAt(0);
  const modulo = end - start - 1;

  validater = cell.charCodeAt(0) % modulo;
  //first row
  if (prev_validater === undefined) {
    //validate cell start with the range
    if (cell[0] !== range[0]) {
      throw new Error(
        `Empty cell found in ${range[0]}${cell.substring(1, cell.length)}`
      );
    } else {
      return validater;
    }
  } else {
    //validate there are no gaps
    var nextChar = (prev_validater + 1) % modulo;
    //corrsponding next char
    if (nextChar === validater) {
      return validater;
    } else {
      var charCode = cell[0].charCodeAt(0);
      var prevChar = String.fromCharCode(charCode - 1);
      throw new Error(
        `Missing field found in ${prevChar}${cell.substring(1, cell.length)}`
      );
    }
  }
};
