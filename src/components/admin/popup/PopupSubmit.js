import React from 'react'
import { observer } from 'mobx-react-lite'
import popup from '../../../control/store/popup'
import PreLoader from '../../global/PreLoader'

const PopupSubmit = observer(({bname, loading}) => {
  return (
    <div className="conf-step__buttons text-center">
      <PreLoader load={loading} />
      { !loading &&
        <>
          <input className="conf-step__button conf-step__button-accent"
            type="submit" value={bname} />
          <button className="conf-step__button conf-step__button-regular"
            onClick={e => popup.close(e)}>Отменить</button>
        </>
      }
    </div>
  );
});

export default PopupSubmit;
