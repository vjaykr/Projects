import { useState } from "react";
import "./Support.css"; // Import external CSS file
import './bikesearch.css';
function Support() {
  const [faqs, setFaqs] = useState([
    { question: "How do I rent a bike or car?", answer: "Go to the Vehicles page, select a vehicle, and complete the booking.", open: false },
    { question: "What payment methods are accepted?", answer: "We accept UPI, credit/debit cards, and net banking.", open: false },
    { question: "How do I contact customer support?", answer: "You can call +1 234 567 890 or email support@rentrider.com.", open: false },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(faqs.map((faq, i) => (i === index ? { ...faq, open: !faq.open } : faq)));
  };

  return (
    <div className="support-container">
      <div><h1>Support</h1>
      </div>

      <div className="faq-section">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${faq.open ? "open" : ""}`} onClick={() => toggleFAQ(index)}>
            <h3>{faq.question}</h3>
            <p>{faq.open ? faq.answer : ""}</p>
          </div>
        ))}
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>📧 Email: support@rentrider.com</p>
        <p>📞 Phone: +1 234 567 890</p>

        <h3>Submit a Query</h3>
        <form className="support-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Describe your issue..." required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Support;
