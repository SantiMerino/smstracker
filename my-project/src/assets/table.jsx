import React, { useState, useEffect } from "react";

function MiTabla() {
  const [total, setTotal] = useState(0);
  const [miss, setMiss] = useState(0);
  const [cxn, setCXN] = useState(0);
  const [filas, setFilas] = useState([
    { id: 1, disposicion: "SMS Connections", contador: 0 },
    { id: 2, disposicion: "Unresponsive", contador: 0 },
    { id: 3, disposicion: "Not Interested", contador: 0 },
    { id: 4, disposicion: "Stop Follow-up", contador: 0 },
    { id: 5, disposicion: "Agent to Agent", contador: 0 },
    { id: 6, disposicion: "Renter", contador: 0 },
    { id: 7, disposicion: "Spam", contador: 0 },
    { id: 8, disposicion: "ADL", contador: 0 },
    { id: 9, disposicion: "SL", contador: 0 },
    { id: 10, disposicion: "Bad Information", contador: 0 },
  ]);

  // ! Misses
  useEffect(() => {
    const sumaContadores = filas
      .filter((fila) => fila.id >= 2 && fila.id <= 10) // Filtra filas con id entre 2 y 10
      .reduce((acc, fila) => acc + fila.contador, 0); // Suma los contadores

    setMiss(sumaContadores); // Establece el total
  }, [filas]);

  // ! Conexiones exitosas
  useEffect(() => {
    const sumaContadores = filas
      .filter((fila) => fila.id == 1) // Filtra filas con id entre 2 y 10
      .reduce((acc, fila) => acc + fila.contador, 0); // Suma los contadores

    setCXN(sumaContadores); // Establece el total
  }, [filas]);

  // ! Total
  useEffect(() => {
    const sumaContadores = filas
      .filter((fila) => fila.id) // Filtra filas con id entre 2 y 10
      .reduce((acc, fila) => acc + fila.contador, 0); // Suma los contadores

    setTotal(sumaContadores); // Establece el total
  }, [filas]);

  const incrementar = (id) => {
    setFilas(
      filas.map((fila) => {
        if (fila.id === id) {
          return { ...fila, contador: fila.contador + 1 };
        }
        return fila;
      })
    );
  };

  const decrementar = (id) => {
    setFilas(
      filas.map((fila) => {
        if (fila.id === id && fila.contador > 0) {
          return { ...fila, contador: fila.contador - 1 };
        }
        return fila;
      })
    );
  };

  return (
    <>
      <div className="w-full text-center font-bold py-2 text-xl">
        {" "}
        Clau's SMS Tracker{" "}
      </div>
      <div className="max-w-md mx-auto flex select-none space-x-2">
        {/* Tabla de conteo */}
        <table className="w-full border-separate border rounded-md border-black">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200">Dispositions</th>
              <th className="px-4 py-2 bg-gray-200">Counter</th>
              <th className="px-4 py-2 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr>
                <td className="px-4 py-2">{fila.disposicion}</td>
                <td className="px-4 py-2">{fila.contador}</td>
                <td className="px-4 py-2 flex space-x-1">
                  <button
                    className="bg-cyan-600 rounded-md p-3 font-bold text-white self-start"
                    onClick={() => incrementar(fila.id)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 rounded-md p-3 font-bold text-white self-start"
                    onClick={() => decrementar(fila.id)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tabla de porcentaje */}
        <div className="flex-col space-y-2">
          <table className="w-full border-separate border  rounded-md border-black max-h-52">
            <thead>
              <tr>
                <th colSpan={3} className="px-4 py-2 bg-gray-200">
                  SMS TO CALL
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="bg-green-300">
                <td className="w-fit">CXN</td>
                <td className="px-2"> {cxn} </td>
              </tr>
              <tr className="bg-orange-300">
                <td className="w-fit"> MISS</td>
                <td className="px-2"> {miss} </td>
              </tr>
              <tr className="bg-cyan-500">
                <td className="w-fit"> TOTAL </td>
                <td className="px-2"> {total} </td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border-separate border  rounded-md border-black max-h-52">
            <thead>
              <tr className="px-4 py-2 bg-gray-200 font-bold text-center uppercase">
                <td> Target</td>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="bg-cyan-500">67%</tr>
              <tr className="px-4 py-2 bg-gray-200 font-bold text-center uppercase">
                <td> Current</td>
              </tr>
              <tr
                className={
                  cxn / total >= 0.67
                    ? "bg-green-500"
                    : cxn / total >= 0.62
                    ? "bg-orange-400"
                    : "bg-red-500"
                }
              >
                {cxn / total != NaN
                  ? Math.round((cxn / total) * 100) + "%"
                  : "0.0%"}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default MiTabla;
