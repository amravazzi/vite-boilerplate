import React, { FC, ReactNode, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface Users {
  name: string;
  email: string;
  age: string;
}

function App<Users>(props: Users) {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{props}</p>
          <p>
            <button onClick={() => setCount((count) => count + 1)}>
              count is: {count}
            </button>
          </p>
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
        </header>
      </div>
    </>
  );
}

export default App;
