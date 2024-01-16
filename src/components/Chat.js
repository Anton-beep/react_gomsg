import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Message from './Message';
import config from '../config';
import {useCookies} from "react-cookie";
import plane from '../assets/paper-plane.svg'
import '../style/Chat.css'
import info from '../assets/info.svg';
import Modal from 'react-modal';


export default function Chat({chatID}) {
    const [cookies] = useCookies(['user', 'opened']);
    const [messages, setMessages] = useState([]);
    const [delay, setDelay] = useState(100);
    const [text, setText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatInfo, setChatInfo] = useState(null);
    const [newUser, setNewUser] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setDelay(1500)
            let sendData = {...cookies.user}
            sendData.chatID = chatID
            axios.post(config.goUrl + "/private/getMessagesByChatID", sendData)
                .then(response => {
                    setMessages(response.data.messages)
                })
        }, delay);

        return () => clearInterval(timer);
    })

    const renderMessages = () => {
        if (messages === undefined || messages === null) {
            return <h1 className="whiteText">No messages in this chat</h1>
        }
        return messages.map(msg =>
            <Message key={msg.messageID} text={msg.text} sender={msg.senderName} timestamp={msg.timestamp}
                     isMine={cookies.user.userID === msg.senderID}/>
        )
    }

    const sendMessage = () => {
        let sendData = {...cookies.user};
        sendData.chatID = chatID;
        sendData.text = text;
        axios.post(config.goUrl + "/private/createMessage", sendData)
            .then(() => {
                setText("")
                setDelay(100)
            })
    }

    const handleInfoClick = () => {
        // Fetch chat information
        let sendData = {...cookies.user};
        sendData.chatID = chatID;
        axios.post(config.goUrl + "/private/getInfoChat", sendData)
            .then(response => {
                setChatInfo(response.data);
                setIsModalOpen(true);
            })
    }

    const handleInviteUser = () => {
        // Invite new user to chat
        let sendData = {...cookies.user};
        sendData.chatID = chatID;
        sendData.newUser = newUser;
        axios.post(config.goUrl + "/private/inviteUser", sendData)
            .then(() => {
                setIsModalOpen(false);
            })
    }

    return (
        <div>
            <div className="chatHeader">
                <img src={info} alt="infoButton" className="infoButton" onClick={handleInfoClick}/> {/* Add info button */}
            </div>
            {renderMessages()}
            <div className="chatWindow">
                <img src={plane} alt="sendButton" className="sendButton" onClick={sendMessage}/>
                <input type="text" className="chatInput" placeholder="Type a message" onKeyUp={event => {
                    if (event.key === "Enter") {
                        sendMessage()
                    }
                }} onChange={(event) => setText(event.target.value)} value={text}/>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => {setIsModalOpen(false)}}
                contentLabel="Chat Info Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h1>Chat Info</h1>
                <p>Users: {chatInfo ? chatInfo.users.join(', ') : 'Loading...'}</p>
                <input type="text" value={newUser} onChange={event => setNewUser(event.target.value)} placeholder="Enter username to invite"/>
                <button onClick={handleInviteUser}>Invite User</button>
            </Modal>
        </div>
    )
};

