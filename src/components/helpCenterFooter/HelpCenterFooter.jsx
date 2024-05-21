import { Link } from "react-router-dom";
import "./helpCenterFooter.scss";

const HelpCenterFooter = () => {
  return (
    <div className="links-card">
      <div className="top">
        <div className="left">
          <div className="title">About Yurrim</div>
          <div className="footer-links">
            <Link to="/about-us" className="links">
              About Us
            </Link>
            <Link to="/contact-us" className="links">
              Contact Us
            </Link>
            <Link to="/terms-of-use" className="links">
              Terms of Use
            </Link>
            <Link to="/adverts-and-ads-policy" className="links">
              Advertisement and Ads Policy
            </Link>
            <Link to="/privacy-policy" className="links">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="links">
              Cookie Policy
            </Link>
            <Link to="/help-center" className="links">
              Help Center
            </Link>
            <Link to="/contents-policy" className="links">
              Content Policy
            </Link>
          </div>
        </div>

        <div className="middle">
          <div className="title">Careers</div>
          <div className="footer-links">
            <Link to="/job-and-recruitment" className="links">
              Jobs
            </Link>
            <Link to="/internship" className="links">
              Internship
            </Link>
            <Link to="/certification" className="links">
              Certifications
            </Link>
          </div>
        </div>

        <div className="middle">
          <div className="title">Developers Tools</div>
          <div className="footer-links">
            <Link to="/developer-terms" className="links">
              Developer terms
            </Link>
            <Link to="/documentation" className="links">
              Documentation
            </Link>
            <Link to="/usage-policy" className="links">
              Usage Policy
            </Link>
          </div>
        </div>

        <div className="right">
          <div className="title">Business Resources</div>
          <div className="footer-links">
            <Link to="/advertise" className="links">
              Advertise
            </Link>
            <Link to="/resources-and-guides" className="links">
              Resources and guide
            </Link>
            <Link to="/marketing-insight" className="links">
              Marketing insight
            </Link>
          </div>
        </div>
      </div>

      <div className="bottom">
        <p>Yurrim Inc &copy; 2023. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HelpCenterFooter;
