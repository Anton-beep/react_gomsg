import config from "../config";
import axios from "axios";
import {useCookies} from "react-cookie";
import ChatCard from "./ChatCard"
import {useEffect, useState} from "react";
import {CreateChat} from "./CreateChat";

export function ViewChats() {
    const [cookies] = useCookies(['user']);
    const [chats, setChats] = useState([])
    useEffect(
        () => {
            axios.post(config.goUrl + "/private/getChats", cookies.user)
                .then(response => {
                    setChats(response.data.chats)
                })
        }, [cookies.user]);

    return (
        <div>
            <CreateChat/>
            {
                chats !== null && chats.map(
                    chat => <ChatCard
                        key={chat.chatName}
                        name={chat.chatName}
                        chatID={chat.chatID}
                    />
                )
            }
        </div>
    )
}