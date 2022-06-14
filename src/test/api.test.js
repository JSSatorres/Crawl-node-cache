const app = require("../server");
const request = require("supertest");

// describe("given test service ", () => {
//     describe("when is imboced  scrapOnePage ", () => {
//       describe(" it resolves   ", () => {
//         test("then send status should have been called", async () => {
//           try {
//             const res = {
//               sendStatus: jest.fn(),
//             };
//             const req = {
//               sendStatus: jest.fn(),
//             };
//             await crawlerOnePage(req, res);
//             await expect(res.sendStatus).toBe(500);
//           } catch (e) {
//             expect(e);
//           }
//         });
//       });
//     });
//   });

it("shoul respond with a list of data", (done) => {
  request(app)
    .get("/1")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200, done);
});
