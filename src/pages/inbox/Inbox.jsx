import "./inbox.scss";
import { Link } from "react-router-dom";

import USER1 from "../../media/images/user1.jpg";
import USER2 from "../../media/images/user2.jpg";
import USER3 from "../../media/images/user3.jpg";
import USER4 from "../../media/images/user4.jpg";
import USER5 from "../../media/images/user5.jpg";
import USER6 from "../../media/images/team1.jpg";
import USER7 from "../../media/images/team2.jpg";

import { useRef, useEffect } from "react";

const Inbox = () => {
  const chatContentRef = useRef(null);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="support-inbox">
      <div className="page-title">Support Inbox</div>
      <div className="support-inbox-card">
        <div className="support-inbox-top">
          <div className="left">All messages</div>
          <div className="right">Close Chat</div>
        </div>

        <div className="support-inbox-bottom">
          <div className="support-inbox-left">
            <Link to="/personal-chat/1" className="link">
              <img src={USER1} alt="" />

              <div className="highlight">
                <h3>Mary Phiri</h3>
                <p>Hi baby!</p>
              </div>
            </Link>
            <Link to="/personal-chat/2" className="link">
              <img src={USER2} alt="" />

              <div className="highlight">
                <h3>John Doe</h3>
                <p>You: We'll meet in the club tonight.</p>
              </div>
            </Link>
            <Link to="/personal-chat/3" className="link">
              <img src={USER3} alt="" />

              <div className="highlight">
                <h3>Mary Jane</h3>
                <p>You: Will you be in church this evening</p>
              </div>
            </Link>
            <Link to="/personal-chat/4" className="link">
              <img src={USER4} alt="" />

              <div className="highlight">
                <h3>Samuel Obanijesu</h3>
                <p>Hi there.</p>
              </div>
            </Link>
            <Link to="/personal-chat/5" className="link">
              <img src={USER5} alt="" />

              <div className="highlight">
                <h3>Samuel Johnson</h3>
                <p>On my way to the lecture room.</p>
              </div>
            </Link>
            <Link to="/personal-chat/6" className="link">
              <img src={USER6} alt="" />

              <div className="highlight">
                <h3>Menorah Samuel</h3>
                <p>You: You are doing well</p>
              </div>
            </Link>
            <Link to="/profile/7" className="link">
              <img src={USER7} alt="" />

              <div className="highlight">
                <h3>Menorah Jane</h3>
                <p>You good</p>
              </div>
            </Link>
            <Link to="/personal-chat/2" className="link">
              <img src={USER2} alt="" />

              <div className="highlight">
                <h3>John Doe</h3>
                <p>You: We'll meet in the club tonight.</p>
              </div>
            </Link>
            <Link to="/personal-chat/3" className="link">
              <img src={USER3} alt="" />

              <div className="highlight">
                <h3>Mary Jane</h3>
                <p>You: Will you be in church this evening</p>
              </div>
            </Link>
            <Link to="/personal-chat/4" className="link">
              <img src={USER4} alt="" />

              <div className="highlight">
                <h3>Samuel Obanijesu</h3>
                <p>Hi there.</p>
              </div>
            </Link>
            <Link to="/personal-chat/5" className="link">
              <img src={USER5} alt="" />

              <div className="highlight">
                <h3>Samuel Johnson</h3>
                <p>On my way to the lecture room.</p>
              </div>
            </Link>
            <Link to="/personal-chat/6" className="link">
              <img src={USER6} alt="" />

              <div className="highlight">
                <h3>Menorah Samuel</h3>
                <p>You: You are doing well</p>
              </div>
            </Link>
            <Link to="/profile/7" className="link">
              <img src={USER7} alt="" />

              <div className="highlight">
                <h3>Menorah Janet</h3>
                <p>You good</p>
              </div>
            </Link>
          </div>

          <div className="support-inbox-right">
            <div ref={chatContentRef} className="support-inbox-content">
              <div className="incoming-msgs">
                <img src={USER1} alt="" />
                <div className="msg-details">
                  <p>How are you doing today?</p>
                  <small>14:02pm</small>
                </div>
              </div>

              <div className="outgoing-msgs">
                <div className="msg-details">
                  <p>How are you doing today?</p>
                  <small>14:02pm</small>
                </div>
              </div>

              <div className="incoming-msgs">
                <img src={USER1} alt="" />
                <div className="msg-details">
                  <p>How are you doing today?</p>
                  <small>14:02pm</small>
                </div>
              </div>

              <div className="outgoing-msgs">
                <div className="msg-details">
                  <p>How are you doing today?</p>
                  <small>14:02pm</small>
                </div>
              </div>

              <div className="incoming-msgs">
                <img src={USER1} alt="" />
                <div className="msg-details">
                  <p>How are you doing today?</p>
                  <small>14:02pm</small>
                </div>
              </div>

              <div className="outgoing-msgs">
                <div className="msg-details">
                  <p>How are you doing today?</p>
                  <small>14:02pm</small>
                </div>
              </div>

              <div className="incoming-msgs">
                <img src={USER1} alt="" />
                <div className="msg-details">
                  <p>Thanks for the suggestions?</p>
                  <small>14:02pm</small>
                </div>
              </div>

              <div className="outgoing-msgs">
                <div className="msg-details">
                  <p>Hope I was able to help?</p>
                  <small>14:02pm</small>
                </div>
              </div>
            </div>

            <form action="">
              <input type="text" placeholder="Type something..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
