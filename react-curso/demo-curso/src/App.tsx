import { useState } from "react";
import "./App.css";

interface User {
  name: string;
  age: number;
}

export const App = () => {
  const [user, setUser] = useState<User | null>(null);

  function AddNumber() {
    setUser({
      name: "Pepe",
      age: 29,
    });
  }

  return (
    <>
      <h1>
        {user?.name} {user?.age}
      </h1>
      <button onClick={() => AddNumber()}>Aumentar</button>
    </>
  );
};

export default App;
