import axios from 'axios';
import { useEffect, useState } from 'react';
import { News } from '../../../../model/news';
const INITIAL_STATE: Partial<News> = { title: '', description: '', link: '' };

export function useNews() {
  const [ list, setList ] = useState<News[]>([]);
  const [ active, setActive] = useState<Partial<News>>(INITIAL_STATE);
  const [ show, setShow ] = useState<boolean>(false);

  useEffect(() => {
    getNews();
  }, []);


  function onSubmitHandler(formData: Partial<News>) {
    if (formData.id) {
      editPost(formData as News)
    } else {
      addPost(formData);
    }

    setActive(INITIAL_STATE);
    setShow(false);
  }

  function getNews() {
    axios.get<News[]>(`${process.env.REACT_APP_BASE_API}/news`)
      .then(res => {
        setList(res.data)
      })
  }

  function removeNews(id: number) {
    axios.delete(`${process.env.REACT_APP_BASE_API}/news/${id}`)
      .then(() => {
        setList(s => {
          return s.filter(item => item.id !== id)
        })
      })
  }

  function addPost(news: Partial<News>) {
    axios.post<News>(`${process.env.REACT_APP_BASE_API}/news`, news)
      .then(res => {
        setList(s => [...s, res.data])
      })
  }


  function editPost(news: News) {
    axios.patch<News>(`${process.env.REACT_APP_BASE_API}/news/${active.id}`, news)
      .then(res => {
        setList(s => s.map(item => {
          return item.id === active.id ? res.data : item;
        }))
      })
  }

  // NEW
  function selectItem(news: News) {
    setActive(news)
    setShow(true)
  }

  // NEW
  function closeModal() {
    setShow(false);
  }

  // NEW
  function openEmptyModal() {
    setShow(true);
    setActive(INITIAL_STATE)
  }

  return {
    actions: {
      removeNews,
      saveNews: onSubmitHandler,
      selectItem,
      openEmptyModal,
      closeModal
    },
    list,
    active,
    show,
    setShow,
    setActive,
    INITIAL_STATE
  }
}
