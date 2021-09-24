module.exports.userSchema = (row, clubID,id) => {
    const { first_name, last_name, phone, email } = row;
    //generate a random string as userID
    let userID = "_"+(Math.random() + 1).toString(36).substring(7);
    return [id,userID,first_name, last_name, phone, email, clubID];
};
