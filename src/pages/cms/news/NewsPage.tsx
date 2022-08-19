import React from 'react';
import { NewsList, NewsModal } from './components';
import { useNews } from './hooks/useNews';

export default function NewsPage() {
  const { list, active, show, actions } = useNews();

  return <div>
    <i
      className="fa fa-plus-circle fa-2x mb-2"
      onClick={actions.openEmptyModal}
    ></i>

    <NewsList
      data={list}
      onItemClick={actions.selectItem}
      onItemRemove={actions.removeNews}
    />

    <NewsModal
      show={show}
      active={active}
      onConfirm={actions.saveNews}
      onClose={actions.closeModal}
    />
  </div>
}
