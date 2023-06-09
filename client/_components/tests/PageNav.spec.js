import React from "react";
import { render, rerender, cleanup, screen, fireEvent, getByRole, getByTestId, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import history from "../../history";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { expect } from "chai";
import PageNav from "../PageNav";
import configureStore from "redux-mock-store"
import { createMemoryHistory } from "history";
import { ThemeProvider, theme } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

//Create mock Redux store

const mockStore = configureStore([thunk]);
const store = mockStore({
  singleWorkout: {
    id: 'workout-id',
  },
});

//wrap component in memory router to test routing & mockstore
describe('PageNav', () => {
  
  it('renders overview button as active initially', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <PageNav />
        </Provider>
      </MemoryRouter>
    );
    
    const overviewBtn = screen.getByRole('button',{ name: /overview/i});
    const analysisBtn = screen.getByRole('button', { name: /analysis/i});
    
    //assert that Overview button is active
    expect(overviewBtn.classList.contains('btn-active')).to.be.true;
    expect(analysisBtn.classList.contains('btn-active')).to.not.be.true;
  });
  

  
  // Custom waiter fn for CSS transition(style change)
  const waitForClassNameChange = async (element, expectedClassName, timeout = 500) => {
    await waitFor(() => {
      element.classList.contains(expectedClassName),
      {
        timeout,
      }
    });
  };
  
  xit('switches active button on click and updates URL', async() => {
    const history = createMemoryHistory({initialEntries: [`/workouts/user/workout-id`]})
    const user = userEvent.setup();

    render(
      <MemoryRouter history={history}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <PageNav />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    
    //Click on the Analysis button
    user.click(screen.getByRole('button', { name: /analysis/i}));
    //Todo still need to figure out why React or JSDOM is NOT rerendering component using test server
    // await waitFor(() => {
    //   // console.log(`Test History Path--->  ${history.location.pathname}`)
      const overviewBtn = screen.getByRole('button', { name: /overview/i});
      const analysisBtn = screen.getByRole('button', { name: /analysis/i });
    //   // screen.debug();
    //   // Assert that the Anlaysis button is active and the URL is updated
    //   expect(overviewBtn.classList.contains('btn-active')).to.be.false;
    //   expect(analysisBtn.classList.contains('btn-active')).to.be.true;
    //   // expect(history.location.pathname).to.equal(`/workouts/user/workout-id/analysis`);
    // });
    await waitForClassNameChange(analysisBtn, 'btn-analysis', 2000);
    // screen.debug();
    expect(overviewBtn.classList.contains('btn-active')).to.be.false;
    expect(analysisBtn.classList.contains('btn-active')).to.be.true;
  
  });

});
