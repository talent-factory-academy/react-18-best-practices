import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { News } from '../../../model/news';

const INITIAL_STATE: Partial<News> = { title: '', description: '', link: '' };

export default function NewsPageSimple() {
  const [ list, setList ] = useState<News[]>([]);
  const [ active, setActive] = useState<Partial<News>>(INITIAL_STATE);
  const [ show, setShow ] = useState<boolean>(false);

  useEffect(() => {
    getNews();
  }, []);

  function onChangeTextHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setActive({
      ...active!,
      [e.target.name]: e.target.value
    })
  }

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (active.id) {
      editPost(active as News)
    } else {
      addPost(active);
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

  function removeNews(e: React.MouseEvent, id: number) {
    e.stopPropagation();
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

  const isTitleValid = active.title && active.title?.length > 3;
  const isDescriptionValid = active.description && active.description?.length > 3;
  const isFormValid = isTitleValid && isDescriptionValid;


  return <div>
    <i
      className="fa fa-plus-circle fa-2x mb-2"
      onClick={() => {
        setShow(true);
        setActive(INITIAL_STATE)
      }}
    ></i>

    <div className="list-group">
      {
        list.map((item: News) => {
          return (
            <li
              key={item.id}
              className={clsx('list-group-item')}
              onClick={() => {
                setActive(item);
                setShow(true);
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


    <div
      className={clsx('modal-backdrop', { 'd-none': !show})}
    >

      <div className="modal d-block">
        <div className="modal-dialog" role="dialog">
          <form className="modal-content" onSubmit={onSubmitHandler}>
            <div className="modal-header">
              <h5 className="modal-title">
                {active.id ? `EDIT NEWS ${active.title}` : 'ADD NEWS'}
              </h5>
              <i className="fa fa-times" onClick={() => setShow(false)} />
            </div>
            <div className="modal-body">

              <input
                type="text"
                value={active?.title}
                name="title"
                placeholder="Title"
                onChange={onChangeTextHandler}
                className={clsx('form-control', { 'is-invalid': !isTitleValid })}
              />

              <input
                type="text"
                value={active?.description}
                name="description"
                placeholder="Description"
                onChange={onChangeTextHandler}
                className={clsx('form-control', { 'is-invalid': !isDescriptionValid })}
              />

              <input
                type="text"
                value={active?.link}
                name="link"
                placeholder="Link (i.e. http://)"
                onChange={onChangeTextHandler}
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-outline-primary" data-dismiss="modal"
                disabled={!isFormValid}
              >SAVE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
}
