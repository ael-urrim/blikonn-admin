import { useEffect, useRef, useState } from "react";
import "./messaging.scss";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
  MdNotifications,
  MdAttachFile,
} from "react-icons/md";
import { HiMail } from "react-icons/hi";
import DEFAULTPIC from "../../media/images/default.jpg";
import EMOJI from "../../media/icons/blush.png";

const Messaging = () => {
  const chatContentRef = useRef(null);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, []);

  const [openChat, setOpenChat] = useState(false);

  const toggleChatBody = () => {
    setOpenChat(!openChat);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    //todo
  };

  return (
    <div
      className="messaging"
      style={{
        height: openChat ? "calc(100vh - 9em)" : "calc(100vh - 34.8em)",
        transition: "0.5s ease",
      }}
    >
      <div className="messaging-header">
        <div className="messaging-header-left">
          <p>Messages</p>
        </div>
        <div className="messaging-header-right">
          <div className="notification">
            <HiMail className="icon" />
            <div className="notification-count">15</div>
          </div>
          <div className="switch">
            {!openChat ? (
              <MdKeyboardDoubleArrowUp
                className="icon"
                onClick={toggleChatBody}
              />
            ) : (
              <MdKeyboardDoubleArrowDown
                className="icon"
                onClick={toggleChatBody}
              />
            )}
          </div>
        </div>
      </div>
      <div className="messaging-body">
        <div className="messaging-body-left">
          <div className="searchUser">
            <input type="text" placeholder="Search user" />
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory Joshua</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
          <div className="useList">
            <div className="useList-left">
              <img src={DEFAULTPIC} alt="" />
            </div>
            <div className="useList-right">
              <div className="userName">John Gregory</div>
              <div className="lastMessage">This is the last...</div>
            </div>
          </div>
        </div>
        <div ref={chatContentRef} className="messaging-body-right">
          <div className="chat-screen">
            <div className="incoming-msg">
              First message. This is an incoming message. Every day is a new
              opportunity to chase your dreams and make them a reality.
            </div>
            <div className="outgoing-msg">
              This is an outgoing message. Believe in yourself and all that you
              are. You have the power to achieve greatness.
            </div>
            <div className="incoming-msg">
              This is an incoming message. Every day is a new opportunity to
              chase your dreams and make them a reality.
            </div>
            <div className="outgoing-msg">
              This is an outgoing message. Believe in yourself and all that you
              are. You have the power to achieve greatness.
            </div>
            <div className="incoming-msg">
              This is an incoming message. Every day is a new opportunity to
              chase your dreams and make them a reality.
            </div>
            <div className="outgoing-msg">
              This is an outgoing message. Believe in yourself and all that you
              are. You have the power to achieve greatness.
            </div>
            <div className="incoming-msg">
              This is an incoming message. Every day is a new opportunity to
              chase your dreams and make them a reality.
            </div>
            <div className="outgoing-msg">
              This is an outgoing message. Believe in yourself and all that you
              are. You have the power to achieve greatness.
            </div>
            <div className="incoming-msg">
              This is an incoming message. Every day is a new opportunity to
              chase your dreams and make them a reality.
            </div>
            <div className="outgoing-msg">
              This is an outgoing message. Believe in yourself and all that you
              are. You have the power to achieve greatness.
            </div>
            <div className="incoming-msg">
              This is an incoming message. Every day is a new opportunity to
              chase your dreams and make them a reality.
            </div>
            <div className="outgoing-msg">
              This is an outgoing message. Believe in yourself and all that you
              are. You have the power to achieve greatness.
            </div>
            <div className="incoming-msg">
              This is an incoming message. Every day is a new opportunity to
              chase your dreams and make them a reality.
            </div>
            <div className="outgoing-msg">
              This is an outgoing message. Believe in yourself and all that you
              are. You have the power to achieve greatness.
            </div>
            <div className="incoming-msg">
              This is an incoming message. Every day is a new opportunity to
              chase your dreams and make them a reality.
            </div>
            <div className="outgoing-msg">
              Last message. This is an outgoing message. Believe in yourself and
              all that you are. You have the power to achieve greatness.
            </div>
          </div>
          <form encType="multipart/form-data">
            <div className="left">
              <textarea name="" id="" cols="30" rows="1" placeholder="Type a message..."></textarea>
              {/* <input type="text" /> */}
            </div>
            <div className="right">
              <label htmlFor="addFile">
                <MdAttachFile className="icon" />
              </label>
              <input type="file" id="addFile" />
              <img src={EMOJI} alt="" />
              <button onClick={sendMessage}>Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
