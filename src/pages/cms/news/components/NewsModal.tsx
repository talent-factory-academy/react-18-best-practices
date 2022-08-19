import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { News } from '../../../../model/news';

interface NewsModalProps {
  show: boolean;
  active: Partial<News>;
  onConfirm: (active: Partial<News>) => void;
  onClose: () => void;
}

export const NewsModal = (props: NewsModalProps) => {
  const [ active, setActive] = useState<Partial<News>>(props.active);

  useEffect(() => {
    setActive(props.active);
  }, [props.active])

  function onChangeTextHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setActive({
      ...active!,
      [e.target.name]: e.target.value
    })
  }

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onConfirm(active)
  }

  const isTitleValid = active.title && active.title?.length > 3;
  const isDescriptionValid = active.description && active.description?.length > 3;
  const isFormValid = isTitleValid && isDescriptionValid;


  return (

    <div
      className={clsx('modal-backdrop', { 'd-none': !props.show})}
    >

      <div className="modal d-block">
        <div className="modal-dialog" role="dialog">
          <form className="modal-content" onSubmit={onSubmitHandler}>
            <div className="modal-header">
              <h5 className="modal-title">
                {active.id ? `EDIT NEWS ${active.title}` : 'ADD NEWS'}
              </h5>
              <i className="fa fa-times" onClick={() => props.onClose()} />
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
  )
};
