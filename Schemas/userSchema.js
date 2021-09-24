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
  //generate a random string as userID
  let userID = validateUnique(generateRandomID());
  return [index, userID, first_name, last_name, phone, email, clubID];
};

const validateUnique = (userID) => {
  if (!map.has(userID)) {
    map.set(userID, true);
    return true;
  } else {
    validateUnique(generateRandomID());
  }
};
const generateRandomID = () => {
  return "_" + (Math.random() + 1).toString(36).substring(7);
};
