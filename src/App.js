import './App.css';
import {useCookies} from 'react-cookie';
import {Auth} from './components/Auth';
import {ViewChats} from './components/ViewChats';
import '../src/style/Messenger.css'
import Chat from "./components/Chat";
import Message from "./components/Message";

function App() {
    const [cookies] = useCookies(['user', 'opened']);
    let content;

    if (!cookies.user) {
        // need to auth user
        content = <Auth/>
    } else if (cookies.opened === undefined) {
        content = (
            <div className="messenger">
                <ViewChats/>
                <div className="message-list-container">
                    <h1 className="whiteText">
                        No chat opened
                    </h1>
                </div>
            </div>
        )
    } else {
        console.log("app")
        content = (
            <div className="messenger">
                <ViewChats/>
                <div className="message-list-container">
                    <Chat chatID={cookies.opened} key={Date.now()}/>
                </div>
            </div>
            /*
            <div className="messenger">
                <ViewChats/>
                <div className="message-list-container">
                    <Message text={"bib"} sender={"bib"} timestamp={1704244003} isMine={false}/>
                    <Message text={"bib"} sender={"bib"} timestamp={1704244003} isMine={true}/>
                </div>
            </div>
             */
        )
    }

    // show chats
    return (
        <div>
            {content}
        </div>
    );
}

export default App;
