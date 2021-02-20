// * retorna un areglo donde cada item en un único objeto para la vista
export default function Vista(data, Where) {
  const vista = [];
  data.forEach(element => {
    const objetopadre = { ...element };
    const result = {};
    Object.keys(objetopadre).forEach(valuep => {
      if (typeof objetopadre[valuep] === "object") {
        const objetohijo = { ...objetopadre[valuep] };
        Object.keys(objetohijo).forEach(valueh => {
          result[valueh] = objetohijo[valueh];
        });
      } else if (Where.indexOf(valuep) < 1) {
        result[valuep] = objetopadre[valuep];
      }
    });
    vista.push(result);
  });
  return vista;
}
