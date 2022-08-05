const chai = require("chai");
const chaiHttp = require("chai-http");

describe("buildError function should work", () => {
  let app, server;
  before(() => {
    chai.should();
    chai.use(chaiHttp);
    const services = require("../server/server");
    app = services.app;
    server = services.server;
  });

  it("Should hit an endpoint correctly", async () => {
    const result = await chai.request(app).post("/user/makead");

    result.body.message.should.equal("Success on /makeAD");
    result.status.should.equal(200);
  });

  it("Should generate a 405 with a descriptive error message on bad method", async () => {
    const result = await chai.request(app).delete("/user/makead");

    result.text.should.equal(
      '"You attempted a DELETE request to /user/makead try POST or PUT."'
    );
    result.status.should.equal(405);
  });

  it("Should generate a 405 with a descriptive error message on bad method to a nested route", async () => {
    const result = await chai.request(app).delete("/nested/route/goal/found");

    result.text.should.equal(
      '"You attempted a DELETE request to /nested/route/goal/found try POST."'
    );
    result.status.should.equal(405);
  });

  it("Should generate a 404 with a descriptive error message if nothing is found", async () => {
    const result = await chai.request(app).delete("/asdfqwersdfsadf");

    result.text.should.equal(
      '"Could not find the appropriate endpoint for /asdfqwersdfsadf"'
    );
    result.status.should.equal(404);
  });

  after(() => server.close());
});
