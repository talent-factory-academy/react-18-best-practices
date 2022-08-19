import axios from 'axios';
import clsx from 'clsx';
import React from 'react';
import { News } from '../../../../model/news';

interface NewsListProps {
  data: News[];
  onItemClick: (item: News) => void;
  onItemRemove: (id: number) => void;
}

export const NewsList = (props: NewsListProps) => {

  function removeNews(e: React.MouseEvent, id: number) {
    e.stopPropagation();
    props.onItemRemove(id);
  }


  return (
    <div className="list-group">
      {
        props.data.map((item: News) => {
          return (
            <li
              key={item.id}
              className={clsx('list-group-item')}
              onClick={() => {
                props.onItemClick(item)
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3>{item.title}</h3>
                  <div>{item.description}</div>
                </div>
                <div>
                  <i className="fa fa-trash fa-2x"
                     onClick={e => removeNews(e, item.id)}
                  ></i>
                </div>
              </div>
            </li>
          )
        })
      }
    </div>

  )
};
