import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from './Chat';
import config from '../config.json';

const Chats = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        axios.get(config.goUrl + '/getChats')
            .then(response => setChats(response.data))
            .catch(error => console.error('Error fetching chats:', error));
    }, []);

    return (
        <div>
            {chats.map((chat, index) => (
                <Chat key={index} chatID={chat.id} />
            ))}
        </div>
    );
};

export default Chats;