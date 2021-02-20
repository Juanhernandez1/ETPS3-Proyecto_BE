export default function RutasV1(router, control) {
  // * rutas de instancia
  const RI = router();
  const {
    todos,
    crear,
    eliminar,
    actualizar,
    buscarUnoX,
    buscarMuchosX,
    buscarXpk,
    vistaTodos,
    test
  } = control;

  // * get
  RI.get("/todos", todos);
  RI.get("/buscarPorPk/:id", buscarXpk);
  RI.get("/buscarUnoPorLike/:dato", buscarUnoX);
  RI.get("/buscarMuchosPorLike/:dato", buscarMuchosX);
  RI.get("/vista", vistaTodos);
  // * post
  RI.post("/ingresar", crear);
  // * put
  RI.put("/actualizar", actualizar);
  // * delete
  RI.delete("/eliminar/:id", eliminar);

  RI.get("/test", test);

  return RI;
}
