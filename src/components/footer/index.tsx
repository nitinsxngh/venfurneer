import Link from "next/link";

// Logo import removed - using image instead

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <h6>
              <img
                src="/logo-venfurneer.png"
                alt="venfurneer Logo"
                className="footer-logo"
              />
              <span>venfurneer</span>
            </h6>
            <p>
              Venfurneer offers premium diffusers and fragrance oils designed to elevate any environment from offices to homes.
              Explore our exclusive collection of luxury scents crafted to bring elegance, comfort, and sophistication to your spaces.
            </p>
            <ul className="site-footer__social-networks">
              <li>
                <a href="https://www.facebook.com/61565767013358/about/?_rdr" target="_blank" rel="noopener noreferrer">
                  <i className="icon-facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/venfurneeraroma/?igsh=d3d0cTAzNjNrNjlm&utm_source=qr#" target="_blank" rel="noopener noreferrer">
                  <i className="icon-instagram" />
                </a>
              </li>
            </ul>
          </div>

          <div className="site-footer__links">
            <ul>
              <li>Shopping online</li>
              <li>
                <Link href="/help#order-status">Order status</Link>
              </li>
              <li>
                <Link href="/help#shipping-delivery">Shipping and delivery</Link>
              </li>
              <li>
                <Link href="/help#returns">Returns</Link>
              </li>
              <li>
                <Link href="/help#payment-options">Payment options</Link>
              </li>
              <li>
                <Link href="/help#contact-us">Contact us</Link>
              </li>
            </ul>
            <ul>
              <li>Information</li>
              <li>
                <Link href="/help">Help & support</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/terms">Terms & conditions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy policy</Link>
              </li>
            </ul>
            <ul>
              <li>Contact</li>
              <li>
                <a href="mailto:info@venfurneer.com">info@venfurneer.com</a>
              </li>
              <li>
                <a href="tel:+919630083631">Contact: +91 96300 83631</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>© 2025 Get digital tech. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
