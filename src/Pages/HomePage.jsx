import React from 'react';
import Header from "../components/Headers";
import Footer from "../components/Footer";
import TypingBox from "../components/typingBox";

const HomePage = () => {
  return (
    <div className="canvas">
      <Header />
      <TypingBox />
      <Footer />
    </div>
  )
}

export default HomePage