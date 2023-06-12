//This will be call if no other middleware has handle the request
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // if there is throw new Error('BROKEN') it will acces to the message that is broken in this example
  let message = err.message;

  //check for mongoose bad ObjectId that return html error message and show something different if that happened
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "apple" : err.stack,
  });
};
