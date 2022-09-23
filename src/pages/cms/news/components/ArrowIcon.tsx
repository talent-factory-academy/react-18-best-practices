import clsx from 'clsx';
import React from 'react';

interface ArrowIconProps {
  open: boolean;
}

export default function ArrowIcon (props: ArrowIconProps) {
  return <i
    className={clsx('fa',
      { 'fa-arrow-down': props.open },
      { 'fa-arrow-right': !props.open },
    )}
  ></i>
};

