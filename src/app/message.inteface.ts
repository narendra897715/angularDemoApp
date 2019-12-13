export interface Imessage {
    messageContent : string;
    sentById : number;
    sendToId : number;
}

export interface IuserData {
    id : number;
    firstName : string;
    lastName : string;
    emailId : string;
    imagePath : string;
}

export interface IfriendsList {
    id : number;
    imagePath : string;
    name : string;
    emailId : string;
}