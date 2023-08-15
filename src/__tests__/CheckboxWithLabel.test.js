import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CheckboxWithLabel from "../CheckboxWithLabel";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("CheckboxWithLabel changes the text after click", () => {
  render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  );

  expect(screen.getByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(screen.getByLabelText(/off/i));

  expect(screen.getByLabelText(/on/i)).toBeTruthy();
});
