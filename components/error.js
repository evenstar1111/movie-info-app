import { Fragment } from 'react';

export default function Error({ error }) {
  return (
    <Fragment>
      <div className="p-5 d-flex justify-content-center align-items-center container-fluid">
        <h5 className="text-muted">{props.error}</h5>
      </div>
    </Fragment>
  );
}
