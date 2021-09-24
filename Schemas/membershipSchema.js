const moment = require('moment')

const SQL_DATE_FORMAT = "YYYY-MM-DD";
module.exports.membershipSchema = (forignKey, row, index) => {
    const { membershp_start_date, membership_end_date, membership_name } = row;

    //covert dates into accetable formats (YYYY-MM-DD)
    function validateDate(date) {
        //replace / with -
        var slashToComma = date.replace(/[/]/g, "-");
        //build date object
        var dateObject = new Date(slashToComma);
        //format to sql format
        var formated = new moment(dateObject).format(SQL_DATE_FORMAT);
        if (formated !== "Invalid date") return formated;
        else {
            console.warn(
                "WARNING! - Invalid Date, Inserted dummy date at row: ",
                index
            );
            console.warn(row);
            return new moment("0000/01/01", SQL_DATE_FORMAT).format(SQL_DATE_FORMAT);
        }
    }

    return [
        index,
        forignKey,
        validateDate(membershp_start_date),
        validateDate(membership_end_date),
        membership_name,
    ];
};