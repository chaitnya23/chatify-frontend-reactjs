export const getOtherUser = (loggedUser, users) => {

    return users && loggedUser._id === users[0]._id ? users[1] : users[0];
}


export const isSameSender = (sender, user) => {

    if (sender._id === user._id) {
        return true;
    }

    return false;
}


export const isFirstMessage = (messages, i, sender, user) => {


    if (i > 0) {


        if (sender._id !== messages[i - 1].user._id) {
            return true;
        }
        return false;
    }
    return true;
}

export const chatlastMessage = (messages, user) => {

    if (messages.length > 0) {

        var idx = messages.length - 1;
        if (user._id === messages[idx].user._id) {
            return "You" + " : " + messages[idx].message;
        }
        return messages[idx].user.userName + " : " + messages[idx].message;
    }
    return ""
}

export const isContains = (users, user) => {

    var flag = 0;

    users.forEach(element => {

        if (element._id == user._id) {
       
            flag = 1;

        }

    });

    if (flag === 1) {
        return true;
    } else {
        return false;
    };
}