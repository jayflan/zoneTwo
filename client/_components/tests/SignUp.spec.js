import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import SignUp from "../SignUp";


describe("Component Check - SignUp", () => {

  describe("<SignUp /> is active?", () => {
    it("renders the Sign up today heading", () => {
      render(<SignUp />, {wrapper: BrowserRouter});
      const message = screen.getByText(`Sign up today, it's Free`);
      expect(message).to.exist;
    });
  });

});


