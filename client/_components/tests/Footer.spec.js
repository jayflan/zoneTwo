import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Component Check - Footer", () => {

  describe("<Footer /> is active?", () => {
    it("renders #footer element", () => {
      render(<Footer />, {wrapper: BrowserRouter});
      const message = screen.getByText('zoneTwo');
      expect(message).to.exist;
    });
  });

});


