import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className='mt-3 p-3 text-primary'>
      <p>You clicked {count} times!</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
