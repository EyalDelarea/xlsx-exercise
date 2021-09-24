const XLSX = require("xlsx");
const { userSchema } = require("./Schemas/userSchema");
const { membershipSchema } = require("./Schemas/membershipSchema");
const { exit } = require("process");
const { xlsxToArray } = require("./Utils/xlsxToArray");
var prompt = require("prompt");


/**
 * Created By Eyal Delarea
 * 
 * Input - Excel file with specifc schema
 * Output - Excel file ready to be imported to SQL 
 */

/**
 * Error prune:
 * 1.Different date foramts and nulls
 * 2.Table placemnt inside the file
 * 3.phone number formats
 * 4.empty fields in the xls table
 */

const DEFAULT_FILE_PATH = "./files/jimalaya.xlsx";
const DEFAULT_CLUBID = 2400;
const DEFAULT_OUTPUTNAME = "output";
const users = [];
const memberships = [];
var path;
var clubID;
var outputName;

prompt.start();
console.log("Please enter the following infomration : ");
console.log("Leave values blank for default assignemt values");
console.log(`File: ${DEFAULT_FILE_PATH} , ClubID:${DEFAULT_CLUBID}
 , outputname: ${DEFAULT_OUTPUTNAME}`);
prompt.get(["path", "clubID", "outputName"], async function (err, result) {
  if (err) throw err;

  //Get user input
  path = result.path === "" ? DEFAULT_FILE_PATH : result.path;
  clubID = result.clubID || DEFAULT_CLUBID;
  outputName = result.outputName || DEFAULT_OUTPUTNAME;

  //init workbook instance
  var wb = XLSX.utils.book_new();

  //Parse the sheet file
  var sheetArray;
  try {
    //Get xlsx file for client with list of users
    var sheet = XLSX.readFile(path);
    //Work on the first sheet found in the file
    const workSheet = sheet.Sheets[sheet.SheetNames[0]];
    sheetArray = xlsxToArray(workSheet);
  } catch (e) {
    console.log("There was an error trying to read the file\n", e);
    exit(0);
  }

  //preparing the file
  const data = sheetArray.rows;
  data.forEach((user, index) => {
    //index == table ID
    var userArray = userSchema(user, clubID,index);
    //Foreign key
    var userID = userArray[1]
    var membersip = membershipSchema(userID, user, index);
    users.push(userArray);
    memberships.push(membersip);
  });

  var usersSheet = await XLSX.utils.aoa_to_sheet(users);
  var membershipSheet = await XLSX.utils.aoa_to_sheet(memberships);
  await XLSX.utils.book_append_sheet(wb, usersSheet, "Users");
  await XLSX.utils.book_append_sheet(wb, membershipSheet, "Memberhips");
  //write the ouputfile
  await XLSX.writeFile(wb, outputName + ".xlsx");
});
