const determinePossibleMethods = (stack, attemptedUrl) => {
  const possibleMethods = [];
  for (const layer of stack) {
    if (layer.name === 'router') {
      const routeInServer = `${layer.regexp}`.split('\\')[1];
      layer.handle.stack.forEach((subLayer) => {
        const routeInRouter = `${subLayer.regexp}`.split('\\')[1];
        const completeRoute = (
          routeInServer + routeInRouter
        ).toLocaleLowerCase();
        if (completeRoute === attemptedUrl) {
          Object.keys(subLayer.route.methods).forEach((method) =>
            possibleMethods.push(method)
          );
        }
      });
    }
  }
  return possibleMethods;
};

const cleanUrl = (url) => {
  return url
    .match('[^?]*')[0] // grabs everything up to but NOT including the first '?'
    .replace(/\/$/, '') // gets rid of trailing '/'
    .toLowerCase();
};

const determineErrorAndBuildIt = (possibleMethods, attemptedUrl, method) => {
  if (!possibleMethods.length) {
    const cause = `Could not find the appropriate endpoint for ${attemptedUrl}`;
    const error = new Error(cause, { cause });
    error.status = 404;
    return error;
  }
  let cause = `You attempted a ${method} request to ${attemptedUrl} try `;
  for (let ind = 0; ind < possibleMethods.length; ind++) {
    const lastMethodInd = possibleMethods.length - 1;
    const possMeth = possibleMethods[ind];
    if (ind === lastMethodInd) cause += `${possMeth.toUpperCase()}.`;
    else cause += `${possMeth.toUpperCase()} or `;
  }
  const error = new Error(cause, { cause });
  error.status = 405;
  return error;
};

const validateInputs = (app, req) => {
  try {
    if (typeof app !== 'function')
      throw 'Error with first argument (app). app is not a function.';
    if (!('_router' in app))
      throw 'Error with first argument (app). No _router property.';
    if (typeof app._router !== 'function')
      throw 'Error with first argument (app). app._router is not a function.';
    if (!(app._router.stack instanceof Array))
      throw 'Error with first argument (app). app._router.stack is not an array.';
    for (let ind = 0; ind < app._router.stack.length; ind++) {
      const layer = app._router.stack[ind];
      if (!('handle' in layer))
        throw `Error with first argument (app). app._router.stack[${ind}] does not have a handle property.`;
    }
    // console.log(app._router.stack instanceof Array);
  } catch (cause) {
    const error = new Error(cause, {
      cause,
    });
    error.status = 400;
    return error;
  }

  return null;
};

const buildError = (app, request) => {
  const inputError = validateInputs(app, request);
  if (inputError) return inputError;

  const { originalUrl, method } = request;
  const { stack } = app._router;
  console.log(stack);
  if (method === 'OPTIONS') return null;

  const attemptedUrl = cleanUrl(originalUrl);
  const possiblePaths = determinePossibleMethods(stack, attemptedUrl);
  return determineErrorAndBuildIt(possiblePaths, attemptedUrl, method);
};

module.exports = { buildError };
