import RutasV1 from "./RutasV1";

export default function RV1(router, controllers) {
  // *Ruta modelo
  const RM = router();
  const { Test } = controllers;

  RM.use("/Test", RutasV1(router, Test));
  return RM;
}
