import React from 'react'
import close from '../../../resources/admin/i/close.png';
import popup from '../../../control/store/popup';
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom';

const PopupWrapper = observer(() => {
  const cancelFnc = e => popup.close(e);
  return (
    <div className={"popup" + (popup.visible ? " active" : "")}>
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              {popup.title}
              <Link className="popup__dismiss" onClick={cancelFnc}><img src={close} alt="Закрыть" /></Link>
            </h2>
          </div>
          <div className="popup__wrapper">
            {popup.form}
          </div>
        </div>
      </div>
    </div>
  )
});

export default PopupWrapper;
