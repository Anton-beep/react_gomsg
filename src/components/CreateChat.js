import React, { useState } from 'react';
import Modal from 'react-modal';
import '../style/CreateChat.css';
import '../style/Modal.css'; // Import the Modal.css file
import add from '../assets/add.svg';
import config from '../config';
import axios from "axios";
import {useCookies} from "react-cookie";

Modal.setAppElement('#root'); // This line is needed for accessibility reasons

export function CreateChat() {
    const [cookies] = useCookies(['user'])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatName, setChatName] = useState('');
    const [userInputs, setUserInputs] = useState(['']);
    const [warnings, setWarnings] = useState([]);

    const handleChatNameChange = (event) => {
        setChatName(event.target.value);
    }

    const handleUserInputChange = (index, event) => {
        const newUserInputs = [...userInputs];
        newUserInputs[index] = event.target.value;
        setUserInputs(newUserInputs);

        // Here you can check if the entered username exists
        if (event.target.value === '') {
            warnings[index] = null
            return
        }
        let sendData = {...cookies.user};
        sendData.username = event.target.value;
        axios.post(config.goUrl + '/private/isUserExists', sendData)
            .then(response => {
                if (!response.data.exist) {
                    warnings[index] = "User " + event.target.value + " doesn't exist"
                    setWarnings([...warnings])
                } else {
                    warnings[index] = null
                    setWarnings([...warnings])
                }
            })
    }

    const handleAddUser = () => {
        setUserInputs([...userInputs, '']);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let sendData = {...cookies.user};
        sendData.chatName = chatName;
        sendData.usernames = userInputs;
        axios.post(config.goUrl + '/private/createChatByUsernames', sendData)
            .then(response => {
                if (response.data.chatID !== null) {
                    setIsModalOpen(false)
                }
            })
    }

    return (
        <div>
            <div className="createChat" onClick={() => {setIsModalOpen(true)}}>
                <img src={add} alt="addChat" className="addButton"/>
                <h1 className="conversation-title">Create a new chat</h1>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => {setIsModalOpen(false)}}
                contentLabel="Create Chat Modal"
                className="modal-content" // Apply the modal-content class
                overlayClassName="modal-overlay" // Apply the modal-overlay class
            >
                <h1>Create a new chat</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Chat Name:
                        <input type="text" value={chatName} onChange={handleChatNameChange} />
                    </label>
                    <div>
                        {userInputs.map((username, index) => (
                            <label key={index}>
                                User:
                                <input type="text" value={username} onChange={event => handleUserInputChange(index, event)} />
                            </label>
                        ))}
                    </div>
                    <button type="button" onClick={handleAddUser}>Add User</button>
                    <input type="submit" value="Create Chat" disabled={chatName === ""}/>
                </form>
                {warnings.map(el => {
                    return <div className="warning-text" key={el}>{el}</div>
                })}
                <button onClick={() => {setIsModalOpen(false)}}>Close Modal</button>
            </Modal>
        </div>
    );
}