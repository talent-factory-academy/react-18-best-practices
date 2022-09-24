import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../core/app.store';
import { News } from '../../../../model/news';
import ArrowIcon from './ArrowIcon';

interface NewsListItemProps {
  item: News;
  onItemClick: () => void;
  onItemRemove: () => void;
}

export default function NewsListItem (props: NewsListItemProps) {
  const { item, onItemClick, onItemRemove } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const appState = useContext(AppContext);

  function removeNews(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    onItemRemove();
  }

  return  <li
    className={clsx(
      'list-group-item',
      { 'bg-dark text-white': appState?.theme === 'dark'}
    )}
  >
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h3 onClick={() => setIsOpen(s => !s)}>
          {/*NEW*/}
          <ArrowIcon open={isOpen} />
          <span >{item.title}</span>
        </h3>

        {isOpen && <div>{item.description}</div>}
      </div>
      <div>
        <i className="fa fa-edit fa-2x" onClick={onItemClick}></i>

        {/*NEW*/}
        <i className="fa fa-trash fa-2x"
           onClick={e => removeNews(e, item.id)}
        ></i>
      </div>
    </div>
  </li>
};

