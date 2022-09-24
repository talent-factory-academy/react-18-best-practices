import React, { useCallback, useState } from 'react';

const ReactUseCallback = () => {
  const [value, setValue] = useState<number>(0);
  const [list, setList] = useState<string[]>(['Angular', 'React', 'Vue', 'Svelte', 'Solid'])

  const removeItem = ((itemToRemove: string) => {
    setList(s => s.filter(item => item !== itemToRemove));
  })

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
