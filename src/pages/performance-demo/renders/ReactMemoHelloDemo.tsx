import React, { PropsWithChildren, useState } from 'react';

const ReactMemoDemo = () => {
  const [value, setValue] = useState<number>(0);
  const [list, setList] = useState<string[]>(['Angular', 'React', 'Vue', 'Svelte', 'Solid'])

  return (
    <>
      <button onClick={() => setValue(Math.random())}>Random {value}</button>
      <List data={list}/>
    </>
  )
};

export default ReactMemoDemo;

interface ListProps {
  data: string[];
}

const List = React.memo((props: ListProps) => {
  console.log('render list')
  return <div>
    {
      props.data.map(item => (
        <Child key={item}>{item}</Child>
      ))
    }
  </div>
})

export const Child = (props: PropsWithChildren) => {
  console.log('child: render')
  return <div>{props.children}</div>
}
