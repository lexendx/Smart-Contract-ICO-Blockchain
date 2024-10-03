import React, { useState } from "react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="faq" className="faq pos-rel pt-140 pb-105">
      <div className="container">
        <div className="sec-title text-center mb-35">
          <h5 className="sec-title__subtitle">FAQ</h5>
          <h2 className="sec-title__title">Frequently Ask Question</h2>
        </div>

        <div className="faq__wrap">
          <ul className="accordion_box clearfix">
            {[
              { question: "Type your question about your projects of ICO?", answer: "Lorem ipsum dolor sit amet..." },
              { question: "Type your question about your projects of ICO?", answer: "Lorem ipsum dolor sit amet..." },
              { question: "Type your question about your projects of ICO?", answer: "Lorem ipsum dolor sit amet..." },
              { question: "Type your question about your projects of ICO?", answer: "Lorem ipsum dolor sit amet..." },
            ].map((item, index) => (
              <li
                className={`accordion block ${activeIndex === index ? "active-block" : ""}`}
                key={index}
              >
                <div className="acc-btn" onClick={() => toggleAccordion(index)}>
                  <span>QA : {index + 1}</span> {item.question}
                </div>
                <div className={`acc_body ${activeIndex === index ? "current" : ""}`}>
                  <div className="content">
                    <p>{item.answer}</p>
                    <ul>
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, dolorem!</li>
                      <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium provident libero at nam iusto?</li>
                      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, odit.</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos expedita libero vero adipisci iure!</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="faq__sec-shape">
        <div className="shape shape-1">
          <img src="assets/img/shape/s_shape1.png" alt="FAQ Decorative Shape 1" />
        </div>
      </div>
    </section>
  );
};

export default Faq;
