import Link from "next/link";

import Layout from "../layouts/Main";

const RegisterPage = () => (
  <Layout>
    <section className="form-page">
      <div className="container">
        <div className="back-button-section">
          <Link href="/products">
            <i className="icon-left" />
            Back to store
          </Link>
        </div>

        <div className="form-block">
          <h2 className="form-block__title">
            Join VenFurner Family
          </h2>
          <p className="form-block__description">
            Create your account to unlock exclusive access to premium fragrances,
            personalized recommendations, early access to new collections, and member-only discounts.
            Start your fragrance journey today.
          </p>

          <form className="form">
            <div className="form__input-row">
              <input
                className="form__input"
                placeholder="First Name"
                type="text"
              />
            </div>

            <div className="form__input-row">
              <input
                className="form__input"
                placeholder="Last Name"
                type="text"
              />
            </div>

            <div className="form__input-row">
              <input className="form__input" placeholder="Email" type="text" />
            </div>

            <div className="form__input-row">
              <input
                className="form__input"
                type="Password"
                placeholder="Password"
              />
            </div>

            <div className="form__info">
              <div className="checkbox-wrapper">
                <label
                  htmlFor="check-signed-in"
                  className="checkbox checkbox--sm"
                >
                  <input
                    name="signed-in"
                    type="checkbox"
                    id="check-signed-in"
                  />
                  <span className="checkbox__check" />
                  <p>
                    I agree to the VenFurner Terms of Service and Privacy Policy
                  </p>
                </label>
              </div>
            </div>

            <button
              type="button"
              className="btn btn--rounded btn--yellow btn-submit"
            >
              Create Account
            </button>

            <p className="form__signup-link">
              <Link href="/login">Are you already a member?</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  </Layout>
);

export default RegisterPage;
