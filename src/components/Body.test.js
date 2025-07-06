import { act, fireEvent, render, screen } from "@testing-library/react";
import Body from "./Body";
import { BrowserRouter } from "react-router-dom";
import MOCK_DATA from "./mockData.json";
import "@testing-library/jest-dom";

describe("render Body component", () => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => {
        return Promise.resolve(MOCK_DATA); //NOTE: Very important step, we are doing this because fetch is provided by browser api here we need to fake it so we are trying to strucute it how an actual fetch would return which is basically an promise which then again returns an promise then finally the response data
      },
    });
  });

  it("should test search text flow", async () => {
    await act(async () => 
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    );
    // wrap only this above part in await otherwise it will not be able to find the elements in await state as act batches effects and since queries like getting searchbox don't have state updates it failss!!
      const searchbox = screen.getByPlaceholderText('Search for restaurants...');
      const submit = screen.getByRole('button',{name: "Search"});
      expect(submit).toBeInTheDocument();
      fireEvent.change(searchbox, { target: { value: "mcd" } });
      fireEvent.click(submit);
      const resCard = screen.getAllByTestId('resCard');
      expect(resCard.length).toBe(1); // only mcD card would be visible
  });
});
