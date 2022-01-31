import React, { useState } from "react";

import TableView from "./Layouts/TableView";
import { TableContext } from "./Services/context";

function App() {
  const [context, setContext] = useState({
    update: 0,
  });

  return (
    <TableContext.Provider value={[context, setContext]}>
      <TableView/>
    </TableContext.Provider>
  );
}

export default App;
