import Logo from "../../assets/icons/logo";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <h6>
              <Logo /> <span>VENFURNEER</span>
            </h6>
            <p>
              VENFURNEER offers premium perfumes, fragrance oils, and luxury scents
              for discerning customers. Discover our exclusive collection of fine fragrances
              that define elegance and sophistication.
            </p>
            <ul className="site-footer__social-networks">
              <li>
                <a href="#">
                  <i className="icon-facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-linkedin" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-instagram" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-youtube-play" />
                </a>
              </li>
            </ul>
          </div>

          <div className="site-footer__links">
            <ul>
              <li>Shopping online</li>
              <li>
                <a href="#">Order Status</a>
              </li>
              <li>
                <a href="#">Shipping and Delivery</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Payment options</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
            <ul>
              <li>Information</li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
              <li>
                <a href="#">Find a store</a>
              </li>
              <li>
                <a href="#">Newsletter</a>
              </li>
              <li>
                <a href="#">Become a member</a>
              </li>
              <li>
                <a href="#">Site feedback</a>
              </li>
            </ul>
            <ul>
              <li>Contact</li>
              <li>
                <a href="mailto:info@venfurneer.com">info@venfurneer.com</a>
              </li>
              <li>
                <a href="tel:+919630083631">Hotline: +91 96300 83631</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>© 2025 VENFURNEER. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
