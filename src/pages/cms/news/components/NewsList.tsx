import React from 'react';
import { News } from '../../../../model/news';
import NewsListItem from './NewsListItem';

interface NewsListProps {
  data: News[];
  onItemClick: (item: News) => void;
  onItemRemove: (id: number) => void;
}

export const NewsList = (props: NewsListProps) => {

  return (
    <div className="list-group">
      {
        props.data.map((item: News) => {
          return (
            <NewsListItem
              key={item.id}
              item={item}
              onItemRemove={() => props.onItemRemove(item.id)}
              onItemClick={() => props.onItemClick(item)}
            />
          )
        })
      }
    </div>

  )
};
