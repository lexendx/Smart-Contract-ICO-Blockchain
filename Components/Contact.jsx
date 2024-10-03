import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "@formspree/react";

const Contact = () => {

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [state, handleSubmit] = useForm("mzbnzpqr");

  useEffect(() => {
    if (state.succeeded) {
      notifySuccess("Successfully submitted the contact form");
    }
    if (state.errors && state.errors.length > 0) { // Added null/undefined check
      notifyError("An error occurred. Please try again.");
    }
  }, [state.succeeded, state.errors]);

  return (
    <section id="contact" className="ico-contact pos-rel">
      <div className="container">
        <div className="ico-contact__wrap">
          <h2 className="title">Contact with CoinDox</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="col-lg-6">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="col-lg-12">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter Message"
                  required
                />
              </div>

              <div className="ico-contact__btn text-center mt-10">
                <button
                  className="thm-btn"
                  type="submit"
                  disabled={state.submitting}
                >
                  Send Message
                </button>
              </div>
            </div>
          </form>

          <div className="ico-contact__shape-img">
            <div className="shape shape--1">
              <div data-parallax='{"y" : -50}'>
                <img src="assets/img/shape/c_shape1.png" alt="Decorative Shape 1" />
              </div>
            </div>
            <div className="shape shape--2">
              <div data-parallax='{"y" : 60}'>
                <img src="assets/img/shape/c_shape2.png" alt="Decorative Shape 2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
