import React from "react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import LogIn from "../LogIn";


describe("Component Check - LogIn", () => {

  describe("<LogIn /> is active?", () => {
    it("renders Google OAuth button text", () => {
      render(<LogIn />, {wrapper: BrowserRouter});
      const message = screen.getByText(`Login with Google`);
      expect(message).to.exist;
    });
  });

});


