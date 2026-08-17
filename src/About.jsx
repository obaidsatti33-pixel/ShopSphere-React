import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="about-section">

      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >

        <span className="about-label">
          ABOUT US
        </span>

        <h2>
          About ShopSphere
        </h2>

        <p className="about-intro">
          Welcome to ShopSphere — your simple and reliable
          destination for quality products at affordable prices.
        </p>

        <p>
          We created ShopSphere to make online shopping
          easier, faster and more enjoyable. From electronics
          and fashion to shoes, beauty and sports products,
          everything is available in one convenient place.
        </p>


        <div className="about-features">

          <motion.div
            className="about-feature"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span>🛍️</span>
            <div>
              <h3>Quality Products</h3>
              <p>
                Carefully selected products for everyday needs.
              </p>
            </div>
          </motion.div>


          <motion.div
            className="about-feature"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span>⚡</span>
            <div>
              <h3>Simple Shopping</h3>
              <p>
                A smooth and easy shopping experience.
              </p>
            </div>
          </motion.div>


          <motion.div
            className="about-feature"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span>🔒</span>
            <div>
              <h3>Secure Checkout</h3>
              <p>
                Safe and straightforward order processing.
              </p>
            </div>
          </motion.div>

        </div>

      </motion.div>

    </section>
  );
}

export default About;