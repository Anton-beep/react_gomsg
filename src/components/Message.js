import React from 'react';
import '../style/Message.css';

const Message = ({text, sender, timestamp, isMine}) => {
    function formatTimestamp(timestamp) {
        let date = new Date(timestamp * 1000);

        let day = ("0" + date.getDate()).slice(-2); // Day of the month
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Month of the year
        let hours = ("0" + date.getHours()).slice(-2); // Hours
        let minutes = ("0" + date.getMinutes()).slice(-2); // Minutes

        return day + '.' + month + ' ' + hours + ':' + minutes;
    }

    return (
        <div className={"message" + (isMine ? " mine" : "")}>
            <div className="bubble-container">
                <div className="bubble">
                    <span className="senderName"> {!isMine && sender} </span> {!isMine && <br/>} {text} <span
                    className="timestamp"> {formatTimestamp(timestamp)} </span>
                </div>
            </div>
        </div>
    );
};

export default Message;
