const app = require("../src/server");
const request = require("supertest");
const assert = require("assert");
const expect = require("chai").expect;

const {
  crawlTableRow,
  objectCrawl,
  isNumber,
} = require("../src/helpers/crawlers");


describe("Unit testfunction in: '../src/helpers/crawlers' ", () => {
  describe("-when is imboced function objectCrawl ", () => {
    const titles = [{ info: "foo" }];
    const links = [{ info: "are" }];
    const emptyLinks = [];
    const authors = [{ info: "at" }];
    const emptyAuthors = [];
    const comments = [{ info: "bar" }];
    const emptyComments = [];

    const fullData = objectCrawl(titles, links, authors, comments);
    const onlyTitleData = objectCrawl(
      titles,
      emptyComments,
      emptyAuthors,
      emptyLinks
    );
    describe("objectCrawl parametres have data ", () => {
      it("should respond whith all parametres titles, links, authors, comments and include control", () => {
        expect(fullData).to.be.an("array");
        expect(fullData).to.have.lengthOf(1);
        expect(fullData).to.have.nested.property("[0].title");
        expect(fullData).to.have.nested.property("[0].link");
        expect(fullData).to.have.nested.property("[0].author");
        expect(fullData).to.have.nested.property("[0].comments");
        expect(fullData).to.have.nested.property("[0].control");
      });
    });
    describe("objectCrawl parametres only hava data in the title ", () => {
      it("should respond whith all parametres empty with the exception of title and control that should have data", () => {
        expect(onlyTitleData).to.be.an("array");
        expect(onlyTitleData).to.have.lengthOf(1);
        expect(onlyTitleData).to.have.nested.property("[0].title");
        expect(onlyTitleData).to.have.nested.property("[0].link");
        expect(onlyTitleData).to.have.nested.property("[0].author");
        expect(onlyTitleData).to.have.nested.property("[0].comments");
        expect(onlyTitleData).to.have.nested.property("[0].control");
      });
    });
  });

  describe("-when is imboced crawlTableRow ", () => {
    it("should responde with 30 the element of the table per page in news.ycombinator.com ", (done) => {
      crawlTableRow(
        `https://news.ycombinator.com/news?p=2`,
        ".athing",
        ".titlelink"
      ).then((result) => {
        expect(result).to.have.lengthOf(30);
        done();
      });
    });
  });

  describe("-when is imboced function isNumber ", () => {
    const number = isNumber(2);
    const shouldChangeToANumber = isNumber("22");
    const ChangeToANumberBeginNumberString = isNumber("2foo");
    const notChangeToANumber = isNumber("foo");
    it("should respond true when parametre is a number", () => {
      expect(number).to.be.true;
    });
    it("should respond true when parametre can parseInt a number", () => {
      expect(shouldChangeToANumber).to.be.true;
    });
    it("should respond true when parametre is a string which begin with a number", () => {
      expect(ChangeToANumberBeginNumberString).to.be.true;
    });
    it("should respond false when parametre can not parseInt a number", () => {
      expect(notChangeToANumber).to.be.false;
    });
  });
});

describe("given test service ", () => {
  describe("when is imboced  scrapOnePage ", () => {
    it("shoul respond with a list of data", (done) => {
      request(app)
        .get("/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done)
    });
  });
});
