function updateOneuserProp(user, newInfo) {
    const updatedUser = {}
    Object.keys(user).forEach(key => updatedUser[key] = key in newInfo ? newInfo[key] : user[key]);
    return updatedUser;
}

module.exports = {
    updateOneuserProp
}