import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";


describe("Component Check - Navbar", () => {

  describe("<Navbar /> is active?", () => {
    it("renders the zoneTwo div text", () => {
      render(<Navbar />, {wrapper: BrowserRouter});
      const message = screen.getByText('zoneTwo');
      expect(message).to.exist;
    })
  });

});


