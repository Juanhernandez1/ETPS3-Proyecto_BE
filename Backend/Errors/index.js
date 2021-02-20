import MensajeError from "./MensajesError";

const { ER404, ER500 } = MensajeError.ErrorHTTP;

const ErrorServer = async (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  await res.status(err.status || 500);

  if (err.status === 404) {
    await res.send(ER404);
  } else if (err.status === 500) {
    await res.send(ER500);
  }
};

export default ErrorServer;
