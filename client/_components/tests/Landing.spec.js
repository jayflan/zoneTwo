import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import Landing from "../Landing";


describe("Component Check - Landing", () => {

  describe("<Landing /> is active?", () => {
    it("renders main heading", () => {
      render(<Landing />, {wrapper: BrowserRouter});
      const message = screen.getByText(`The #1 app for this cyclist`);
      expect(message).to.exist;
    });
  });

});


