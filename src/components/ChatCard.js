import React, {useEffect, useState} from 'react';
import config from "../config";
import axios from "axios";
import '../style/ChatButton.css';
import {useCookies} from "react-cookie";

export default function ChatCard({name, chatID}) {
    const [cookies, setCookies] = useCookies(['user', 'opened']);
    const [lastMessage, setLastMessage] = useState("")
    const [lastUser, setLastUser] = useState("")

    useEffect(() => {
        let sendData = {...cookies.user}
        sendData.quantity = 1
        sendData.chatID = chatID
        axios.post(config.goUrl + '/private/getMessagesByChatID', sendData)
            .then(response => {
                if (response.data.messages === null) {
                    return
                }
                setLastMessage(response.data.messages[0].text)
                setLastUser(response.data.messages[0].senderName)
            }).catch(error => {
            console.log(error)
        })
    })

    const renderLastMessage = () => {
        if (lastUser !== "") {
            return (<>
                    <span className="senderText"> {lastUser + ": "}</span> {lastMessage}
                </>)
        }
        return <></>
    }

    return (<div className="conversation-list-item" onClick={() => {
            setCookies('opened', chatID)
        }}>
            <div className="conversation-info">
                <div className="conversation-title">{name}</div>
                <p className="conversation-snippet">{renderLastMessage()}</p>
            </div>
        </div>);
}