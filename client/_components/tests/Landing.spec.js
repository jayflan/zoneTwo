import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import Landing from "../Landing";
import store from "../../_store"

describe("Component Check - Landing", () => {

  describe("<Landing /> is active?", () => {
    it("renders main heading", () => {
      render(<Provider store={store}><Landing /></Provider>, {wrapper: BrowserRouter});
      const message = screen.getByText(`The #1 app for this cyclist`);
      expect(message).to.exist;
    });
  });

});


