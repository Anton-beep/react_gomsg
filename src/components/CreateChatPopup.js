import React from 'react';

export default function CreateChatPopup({ toggleModal }) {
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <h1>Popup Content</h1>
                <button onClick={toggleModal}>Close Popup</button>
            </div>
        </div>
    );
}