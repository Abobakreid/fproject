import React from "react";
import faceb from "../../../assets/facebook.png";
import insta from "../../../assets/instagram.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row content">
          <div className="links">
            <div className="address">
              <h3>Address</h3>
              <ul className="list-style">
                <li>Arab Republic of Egypt - Assiut</li>
                <li>01024922866</li>
                <li>
                  <a
                    href="https://a7gezly.azurewebsites.net"
                    className={"Log_btn"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://a7gezly.azurewebsites.net
                  </a>
                </li>
              </ul>
            </div>
            <div className="work_hours">
              <h3>Work Hours</h3>
              <ul className="list-style">
                <li>All Week</li>
                <li>24 hours</li>
              </ul>
            </div>
          </div>
          <div className="social">
            <h3>Get in touch</h3>
            <h3>Find us on social media</h3>
            <div className="s_icons">
              <span>
                <a href="/#" target={"_blank"}>
                  <img src={insta} alt="" />
                </a>
              </span>
              <span>
                <a href="/#" target={"_blank"}>
                  <img src={faceb} alt="" />
                </a>
              </span>
              <span>
                <a href="/#" target={"_blank"}>
                  <img src={insta} alt="" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
