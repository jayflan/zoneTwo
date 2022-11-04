import React from "react";
import { Provider } from "react-redux";
import store from "../../_store";
import { BrowserRouter } from "react-router-dom";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";


describe("Component Check - Navbar", () => {

  describe("<Navbar /> is active?", () => {
    it("renders the zoneTwo div text", () => {
      render(
        <Provider store={store}>
          <Navbar />
        </Provider>
      , {wrapper: BrowserRouter}
      );
      const message = screen.getByText('zoneTwo');
      expect(message).to.exist;
    })
  });

});


