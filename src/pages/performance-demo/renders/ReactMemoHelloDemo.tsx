import React, { useState } from 'react';

const ReactMemoHelloDemo = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <>
      <button onClick={() => setValue(Math.random())}>Random {value}</button>
      <List />
    </>
  )
};

export default ReactMemoHelloDemo;

export const List = React.memo(() => {
  console.log('render')
  return <div>List</div>
})
