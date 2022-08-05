const chai = require("chai");
const { buildError } = require("express-ez-405");

describe("buildError function should validate inputs", () => {
  before(() => {
    chai.should();
  });

  let fakeApp, fakeReq;
  beforeEach(() => {
    fakeApp = () => {};
    fakeApp._router = () => {};
    fakeApp._router.stack = [
      {
        handle: () => {},
        name: "router",
        regexp: /^\/main\/?(?=\/|$)/i,
      },
    ];
    fakeApp._router.stack[0].handle.stack = [
      {
        regexp: /^\/findCharities\/?(?=\/|$)/i,
        route: {
          methods: { put: true, get: true },
        },
      },
    ];

    fakeReq = {
      originalUrl: "/user/makead",
      method: "delete",
    };
  });

  it("Should error if app is not a function", async () => {
    fakeApp = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). app is not a function."
    );
    result.status.should.equal(400);
  });

  it("Should error if app._route is not a function", async () => {
    fakeApp._router = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). app._router is not a function."
    );
    result.status.should.equal(400);
  });

  it("Should error if app._route.stack is not an array", async () => {
    fakeApp._router.stack = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). app._router.stack is not an array."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer app._route.stack does not have a handle property", async () => {
    delete fakeApp._router.stack[0].handle;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). Layer in app._router.stack does not have a handle property."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer.handle in app._route.stack is not a function", async () => {
    fakeApp._router.stack[0].handle = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). layer.handle in app._router.stack is not a function."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer.handle in app._route.stack is not a function", async () => {
    fakeApp._router.stack[0].handle = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). layer.handle in app._router.stack is not a function."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer.handle in app._route.stack is not a function", async () => {
    fakeApp._router.stack[0].handle = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). layer.handle in app._router.stack is not a function."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer.handle in app._route.stack does not have a stack property", async () => {
    delete fakeApp._router.stack[0].handle.stack;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). layer.handle in app._router.stack does not have a stack property."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer.handle.stack in app._route.stack is not an array", async () => {
    fakeApp._router.stack[0].handle.stack = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). layer.handle.stack in app._router.stack is not an array."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer in app._route.stack does not have a regexp property", async () => {
    delete fakeApp._router.stack[0].regexp;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). layer in app._router.stack does not have a regexp property."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer.regexp in app._route.stack is not regexp", async () => {
    fakeApp._router.stack[0].regexp = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). layer.regexp in app._router.stack is not an instance of regexp."
    );
    result.status.should.equal(400);
  });

  it("Should error if layer.regexp in app._route.stack can not be broken down into a string", async () => {
    fakeApp._router.stack[0].regexp = /^main?(?=|$)/i;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). layer.regexp in app._router.stack did not properly break down into a string."
    );
    result.status.should.equal(400);
  });

  it("Should error if subLayer in layer.handle.stack in app._route.stack does not have a regexp property", async () => {
    delete fakeApp._router.stack[0].handle.stack[0].regexp;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). subLayer in layer.handle.stack in app._route.stack does not have a regexp property."
    );
    result.status.should.equal(400);
  });
  it("Should error if subLayer in layer.handle.stack in app._route.stack does not have a regexp property", async () => {
    delete fakeApp._router.stack[0].handle.stack[0].regexp;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). subLayer in layer.handle.stack in app._route.stack does not have a regexp property."
    );
    result.status.should.equal(400);
  });

  it("Should error if subLayer.regexp in layer.handle.stack in app._route.stack is not an instance of regexp", async () => {
    fakeApp._router.stack[0].handle.stack[0].regexp = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). subLayer in layer.handle.stack in app._router.stack is not an instance of regexp."
    );
    result.status.should.equal(400);
  });

  it("Should error if subLayer.regexp in layer.handle.stack in app._route.stack is not an instance of regexp", async () => {
    fakeApp._router.stack[0].handle.stack[0].regexp = /^main?(?=|$)/i;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). subLayer in layer.handle.stack in app._router.stack did not properly break down into a string."
    );
    result.status.should.equal(400);
  });

  it("Should error if subLayer in layer.handle.stack in app._route.stack does not have route property", async () => {
    delete fakeApp._router.stack[0].handle.stack[0].route;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). subLayer in layer.handle.stack in app._route.stack does not have a route property."
    );
    result.status.should.equal(400);
  });

  it("Should error if subLayer.route in layer.handle.stack in app._route.stack does not have methods property", async () => {
    delete fakeApp._router.stack[0].handle.stack[0].route.methods;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). subLayer.route in layer.handle.stack in app._route.stack does not have a methods property."
    );
    result.status.should.equal(400);
  });

  it("Should error if subLayer.route.methods in layer.handle.stack in app._route.stack is not an array", async () => {
    fakeApp._router.stack[0].handle.stack[0].route.methods = "";
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with first argument (app). subLayer.route.methods in layer.handle.stack in app._route.stack is not an Object."
    );
    result.status.should.equal(400);
  });

  it("Should error if reqest does not have originalUrl property", () => {
    delete fakeReq.originalUrl;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with second argument (request). No originalUrl property on request."
    );
    result.status.should.equal(400);
  });

  it("Should error if reqest.originalUrl is not a string", () => {
    fakeReq.originalUrl = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with second argument (request). req.originalUrl is not a string."
    );
    result.status.should.equal(400);
  });

  it("Should error if reqest does not have method property", () => {
    delete fakeReq.method;
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with second argument (request). No method property on request."
    );
    result.status.should.equal(400);
  });

  it("Should error if reqest.method is not a string", () => {
    fakeReq.method = {};
    const result = buildError(fakeApp, fakeReq);

    result.message.should.equal(
      "Error with second argument (request). req.method is not a string."
    );
    result.status.should.equal(400);
  });
});
