import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Message sent successfully! 🎉");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <section
      id="contact"
      className="contact-section"
    >

      <div className="contact-heading">

        <span>GET IN TOUCH</span>

        <h2>Contact Us</h2>

        <p>
          Have a question or need help?
          We're here to help.
        </p>

      </div>


      <div className="contact-container">

        {/* Contact Information */}

        <div className="contact-details">

          <h3>
            We'd love to hear from you
          </h3>

          <p className="contact-description">
            Whether you have a question about our products,
            your order, or anything else, feel free to reach
            out to us.
          </p>


          <div className="contact-detail">

            <span>📧</span>

            <div>
              <small>Email</small>
              <p>support@shopsphere.com</p>
            </div>

          </div>


          <div className="contact-detail">

            <span>📞</span>

            <div>
              <small>Phone</small>
              <p>+92 300 1234567</p>
            </div>

          </div>


          <div className="contact-detail">

            <span>📍</span>

            <div>
              <small>Location</small>
              <p>Pakistan</p>
            </div>

          </div>

        </div>


        {/* Contact Form */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <h3>Send us a message</h3>


          <label>
            Your Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />


          <label>
            Your Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />


          <label>
            Your Message
          </label>

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          />


          {error && (
            <p className="contact-error">
              ⚠️ {error}
            </p>
          )}


          {success && (
            <p className="contact-success">
              ✅ {success}
            </p>
          )}


          <button type="submit">
            Send Message →
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;