import "./sendEmail.scss";
import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";

const SendEmail = () => {
  const { authToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    const mailData = {
      subject,
      mailBody,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/emails/sendEmailBroadcast`,
        mailData,
        {
          withCredentials: true,

          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(res.data);
      navigate("/email-broadcast")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sendMail">
      <div className="page-title">Broadcast an email to all users</div>
      <div className="add-new-page-card">
        {/* Left side */}
        <div className="left">
          <input
            type="text"
            placeholder="Mail subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={mailBody}
              onChange={setMailBody}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="right">
          <h3>Publish</h3>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>

          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file">Upload Image</label>

          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={sendEmail}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
