import "./resetPassword.scss";
//import LOGO from '../../../media/images/logo.png';

import {Link} from 'react-router-dom'

const ResetPassword = () => {
  return (
    <div className="reset-password">
      <div className="reset-password-card">
        <div className="top">
          {/* <img src={LOGO} alt="" /> */}
          <p>Reset your password</p>
        </div>
        <div className="form">
          <form action="/dashboard">
            <div className="input">
              <label htmlFor="">Email</label>
              <input type="email" required/>
            </div>
            <button type="submit">Reset password</button>
            <Link to="/admin" className="link">Login to your account</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword