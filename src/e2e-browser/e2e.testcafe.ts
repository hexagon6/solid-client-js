/**
 * Copyright 2020 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { ClientFunction } from "testcafe";
import { config } from "dotenv-flow";
import { essUserLogin } from "./roles";
import type { getHelpers } from "../../.codesandbox/sandbox/src/end-to-end-test-helpers";

// E2eHelpers is a global defined in .codesandbox/sandbox/src/end-to-end-helper.
// Since code inside of ClientFunction is executed in that context in the browser,
// that variable is available to it - but as far as TypeScript is concerned,
// it is executed in the context of this test file.
// Hence, we just declare this variable to be of the same type here.
const E2eHelpers: ReturnType<typeof getHelpers> = {} as any;

config({ path: __dirname });

fixture("End-to-end tests").page("http://localhost:1234");

// eslint-disable-next-line jest/expect-expect, jest/no-done-callback
test("Creating and removing empty Containers", async (t: TestController) => {
  const createContainer = ClientFunction(() => E2eHelpers.createContainer());
  const deleteContainer = ClientFunction(() => E2eHelpers.deleteContainer());

  await essUserLogin(t);
  const createdContainer = await createContainer();
  await t.expect(createdContainer).notTypeOf("null");
  await deleteContainer();
});
