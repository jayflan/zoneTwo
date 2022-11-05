import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../_store";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import SignUp from "../SignUp";


describe("Component Check - SignUp", () => {

  describe("<SignUp /> is active?", () => {
    it("renders the Sign up today heading", () => {
      render(
        <Provider store={store}><SignUp /></Provider>, 
        {wrapper: BrowserRouter}
      );
      const message = screen.getByText(`Sign up today, it's Free`);
      expect(message).to.exist;
    });
  });

});


