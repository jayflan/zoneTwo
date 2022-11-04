import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import LogIn from "../LogIn";
import { Provider } from "react-redux";
import store from "../../_store";


describe("Component Check - LogIn", () => {

  describe("<LogIn /> is active?", () => {
    it("renders Google OAuth button text", () => {
      render(
        <Provider store={store}>
          <LogIn />
        </Provider>, 
        {wrapper: BrowserRouter}
      );
      const message = screen.getByText(`Login with Google`);
      expect(message).to.exist;
    });
  });

});


