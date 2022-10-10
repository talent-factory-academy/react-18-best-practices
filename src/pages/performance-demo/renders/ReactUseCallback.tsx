import React, { useCallback, useState } from 'react';

const memory = new Set();

const ReactUseCallback = () => {
  const [value, setValue] = useState<number>(0);
  const [list, setList] = useState<string[]>(['Angular', 'React', 'Vue', 'Svelte', 'Solid'])

  const removeItem = useCallback((itemToRemove: string) => {
    setList(s => s.filter(item => item !== itemToRemove));
  }, [])
  memory.add(removeItem);
  console.log(memory) ; // try to remove useCallback to see how memory is increased

  return (
    <>
      <button onClick={() => setValue(Math.random())}>Random {value}</button>
      <List data={list} onRemoveItem={removeItem}/>
    </>
  )
};

export default ReactUseCallback;


/*+
 * LIST COMPONENT
 */
interface ListProps {
  data: string[];
  onRemoveItem: (item: string) => void;
}
const List = React.memo((props: ListProps) => {
  console.log('render list')
  return <div>
    {
      props.data.map(item => (
        <li key={item} >
          {item}
          <button onClick={() => props.onRemoveItem(item)}>Del</button>
        </li>
      ))
    }
  </div>
})
