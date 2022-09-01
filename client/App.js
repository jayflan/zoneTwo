import React from "react";
import Navbar from "./_components/Navbar";
import Routes from "./_components/Routes";
import Footer from "./_components/Footer";

const App = () => {
  return(
    <div className="main">
      <nav>
        <Navbar />
      </nav>
      <div>
        <Routes />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;