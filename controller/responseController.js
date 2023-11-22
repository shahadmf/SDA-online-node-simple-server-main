export const errorResponse = (statusCode, res, message) => {
  res.status(statusCode).send({
    success: false,
    message: message,
  });
};
export const successResponse = (statusCode, res, message, payload) => {
  res.status(statusCode).send({
    success: true,
    message: message,
    payload: payload,
  });
};
