import "./profileLoading.scss";
import PostsLoading from "../Posts/PostsLoading";

const ProfileLoading = () => {
  return (
    <div className="profileLoading">
      <div className="profileLoading-top">
        <div className="profileLoading-user-info">
          <div className="profileLoading-user-img"></div>
          <div className="profileLoading-user-details">
            <div className="profileLoading-display_name"></div>
            <div className="profileLoading-user-name"></div>
            <div className="profileLoading-follow-btn"></div>
          </div>
        </div>
        <div className="profileLoading-activities">
          <div className="profileLoading-activities-children"></div>
          <div className="profileLoading-activities-children"></div>
          <div className="profileLoading-activities-children"></div>
        </div>
      </div>

      <PostsLoading/>
    </div>
  );
};

export default ProfileLoading;
