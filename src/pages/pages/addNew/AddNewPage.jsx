import "./addNewPage.scss";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

const AddNewPage = () => {
  const [value, setValue] = useState("");
  const [pageLink, setPageLink] = useState("");

  const handlePageLink = (e) => {
    setPageLink(e.target.value);
  };

  return (
    <div className="add-new-page">
      <div className="page-title">Add new page</div>
      <div className="add-new-page-card">
        {/* Left side */}
        <div className="left">
          <input
            type="text"
            placeholder="Page title"
            onChange={handlePageLink}
          />
          <p>
            Page link:{" "}
            <Link
              target="_blank"
              to={`http://localhost:3000/${pageLink
                .replace(/\s+/g, "-")
                .toLocaleLowerCase()}`}
              className="link"
            >
              http://localhost:3000/
              {pageLink.replace(/\s+/g, "-").toLocaleLowerCase()}
            </Link>
          </p>
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
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
            <button>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPage;
