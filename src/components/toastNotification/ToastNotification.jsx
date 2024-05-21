import "./toastNotification.scss";

const ToastNotification = (props) => {
  return (
    <div className="toastNotification">
      <div className="notification">
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default ToastNotification;
