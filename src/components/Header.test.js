import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("should render header component", () => {
  it("should render header component with cart ", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const cart = screen.getByText(/Cart/);
    expect(cart).toBeInTheDocument();
  });
});
