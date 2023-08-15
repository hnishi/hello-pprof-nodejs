import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CheckboxWithLabel from "../CheckboxWithLabel";

import * as pprof from "pprof";
import * as fs from "fs";


// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("CheckboxWithLabel changes the text after click", async () => {
  render(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  // Start profiling
  console.log("start to profile >>>");
  const profilePromise = pprof.time.profile({
    durationMillis: 1000, // time in milliseconds for which to collect profile.
  });

  expect(screen.getByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(screen.getByLabelText(/off/i));

  expect(screen.getByLabelText(/on/i)).toBeTruthy();

  // End profiling and write to file
  const profile = await profilePromise;
  const buf = await pprof.encode(profile);

  fs.writeFile("wall.pb.gz", buf, (err) => {
    if (err) throw err;
  });
  console.log("<<< finished to profile");
});
