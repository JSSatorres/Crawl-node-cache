const supertest = require("supertest");
const app = require("../server");
const api = supertest(app);
const { scrapOnePage, scrapXPages,client} = require("../controllers/scraper-controllers");



describe("given test service ", () => {
  describe("when is imboced  http://localhost:4000/4", () => {
    describe(" it resolves   ", () => {
      test("should respond with a 200 code staturs", async () => {
        try {
          const response = await api.get("/4").send()
          expect(response.status).toBe(200)
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});



// describe("given test service ", () => {
//   describe("when is imboced  scrapOnePage ", () => {
//     describe(" it resolves   ", () => {
//       test("then send status should have been called", () => {
//         try {
//           // const res = {
//           //   sendStatus: jest.fn(),
//           // };
//           // const req = {
//           //   sendStatus: jest.fn(),
//           // };
//           scrapOnePage(req, res);
//           expect(res.sendStatus).toHaveBeenCalledWith(200);
//         } catch (e) {
//           expect(e);
//         }
//       });
//     });
//   });
// });

// describe("given test service ", () => {
//   describe("when is imboced  scrapXPages ", () => {
//     describe(" it resolves   ", () => {
//       test("then send status should have been called", () => {
//         try {
//           const res = {
//             sendStatus: jest.fn(),
//           };
//           const req = {
//             params: { pages: 1 },
//           };
//           scrapXPage(req, res);
//           expect(res.sendStatus).toHaveBeenCalledWith(200);
//         } catch (e) {
//           expect(e);
//         }
//       });
//     });
//   });
// });

// describe("given test service ", () => {
//   describe("when is imboced http://localhost:4000/1 ", () => {
//     describe(" it resolves   ", () => {
//       test("info return in json",async () => {
//         jest.setTimeout(30000);
//         try {
//           await api
//           .get("http://localhost:4000/1")
//           .expect(500)
//           .expect("Content-Type", /application\/json/);
//         } catch (error) {
//           console.log(error);
//         }
//       });
//     });
//   });
// });

// describe("given test service ", () => {
//   describe("when is imboced  http://localhost:4000/3 ", () => {
//     describe(" it resolves   ", () => {
//       test(" the response should have a lenngth 120",async () => {
//         jest.setTimeout(30000);
//         try {
//           const response = await api.get("http://localhost:4000/2")
//           expect(response.body).toHaveLength(30)
//         } catch (error) {
//           console.log(error);
//         }
//       });
//     });
//   });
// });

// describe("given test service ", () => {
//   describe("when is imboced  createPlaylist ", () => {
//     describe(" it resolves   ", () => {
//       test("then send status should have been called", () => {
//         try {
//           const res = {
//             sendStatus: jest.fn(),
//           };
//           const req = {
//             sendStatus: jest.fn(),
//           };
//           createPlaylist(req, res);
//           expect(res.sendStatus).toHaveBeenCalledWith(200);
//         } catch (e) {
//           expect(e);
//         }
//       });
//     });
//   });
// });
// describe("given test service ", () => {
//   describe("when is imboced  addSongToPlaylist ", () => {
//     describe(" it resolves   ", () => {
//       test("then send status should have been called", () => {
//         try {
//           const res = {
//             sendStatus: jest.fn(),
//           };
//           const req = {
//             sendStatus: jest.fn(),
//           };
//           addSongToPlaylist(req, res);
//           expect(res.sendStatus).toHaveBeenCalledWith(200);
//         } catch (e) {
//           expect(e);
//         }
//       });
//     });
//   });
// });
// describe("given test service ", () => {
//   describe("when is imboced  removePlaylistById ", () => {
//     describe(" it resolves   ", () => {
//       test("then send status should have been called", () => {
//         try {
//           const res = {
//             sendStatus: jest.fn(),
//           };
//           const req = {
//             sendStatus: jest.fn(),
//           };
//           removePlaylistById(req, res);
//           expect(res.sendStatus).toHaveBeenCalledWith(200);
//         } catch (e) {
//           expect(e);
//         }
//       });
//     });
//   });
// });
afterAll(() => client.quit());