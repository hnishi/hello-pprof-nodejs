import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { CheckboxWithLabelNoSpread, CheckboxWithLabelSpread} from "../CheckboxWithLabel";
// import CheckboxWithLabel from "../CheckboxWithLabel";

import * as pprof from "pprof";
import * as fs from "fs";

const count = 10000;

function multiRun(fn, count) {
  for (let i = 0; i < count; i ++) {
    fn();
  }
};

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("CheckboxWithLabelNoSpread", async () => {
  // Start profiling
  console.log("start to profile >>>");
  const profilePromise = pprof.time.profile({
    durationMillis: 1000, // time in milliseconds for which to collect profile.
  });

  multiRun(() => {
    render(<CheckboxWithLabelNoSpread labelOn="On" labelOff="Off" />);
    // expect(screen.getByLabelText(/off/i)).toBeTruthy();
    // fireEvent.click(screen.getByLabelText(/off/i));
    // expect(screen.getByLabelText(/on/i)).toBeTruthy();
  }, count);

  // render(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  // expect(screen.getByLabelText(/off/i)).toBeTruthy();

  // fireEvent.click(screen.getByLabelText(/off/i));

  // expect(screen.getByLabelText(/on/i)).toBeTruthy();

  // End profiling and write to file
  const profile = await profilePromise;
  const buf = await pprof.encode(profile);

  fs.writeFile("noSpread.pb.gz", buf, (err) => {
    if (err) throw err;
  });
  console.log("<<< finished to profile");
});

it("CheckboxWithLabelSpread", async () => {
  // Start profiling
  console.log("start to profile >>>");
  const profilePromise = pprof.time.profile({
    durationMillis: 1000, // time in milliseconds for which to collect profile.
  });

  const params = {labelOn: "On", labelOff: "Off"};
  multiRun(() => {
    render(<CheckboxWithLabelSpread params={params} />);
    // expect(screen.getByLabelText(/off/i)).toBeTruthy();
    // fireEvent.click(screen.getByLabelText(/off/i));
    // expect(screen.getByLabelText(/on/i)).toBeTruthy();
  }, count);

  // render(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

  // expect(screen.getByLabelText(/off/i)).toBeTruthy();

  // fireEvent.click(screen.getByLabelText(/off/i));

  // expect(screen.getByLabelText(/on/i)).toBeTruthy();

  // End profiling and write to file
  const profile = await profilePromise;
  const buf = await pprof.encode(profile);

  fs.writeFile("spread.pb.gz", buf, (err) => {
    if (err) throw err;
  });
  console.log("<<< finished to profile");
});
