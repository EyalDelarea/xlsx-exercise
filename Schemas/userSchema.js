/**
 * init user object according to the schema
 * @param {} row user data
 * @param {*} clubID assigned clubID
 * @param {*} index in the table
 * @returns
 *
 * Array of values
 *
 * -Table Index
 * -Unique userID
 * -First name
 * -Last name
 * -Phone
 * -Email
 * -Club ID
 */

//holds unique ID map
const map = new Map();

module.exports.userSchema = (row, clubID, index) => {
  const { first_name, last_name, phone, email } = row;
  let userID = validateUnique(generateRandomID());
  return [index, userID, first_name, last_name, phone, email, clubID];
};
/**
 * Validating by the 0.000% we generated duplicate ID
 * if ID already taken,recursive call untill ID is not found in the map.
 * @param {*} userID
 * @returns
 */
const validateUnique = (userID) => {
  if (!map.has(userID)) {
    map.set(userID, true);
    return userID;
  } else {
    validateUnique(generateRandomID());
  }
};
const generateRandomID = () => {
  return "_" + (Math.random() + 1).toString(36).substring(7);
};
