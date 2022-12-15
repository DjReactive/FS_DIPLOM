import React from 'react'
import { observer } from 'mobx-react-lite'
import notice from '../../control/store/notice'

const Notice = observer(() => {
  const { type, message } = notice;
  const format = {
    message,
    type: type || "NOTICE",
    class: (() => {
      switch(notice.type) {
        case "error": return " notice__error";
        case "warning": return " notice__warning";
        case "info": return " notice__info";
        default: return "";
      }
    })()
  }
  return notice.visible &&
    <div className={"notice" + format.class + (notice.animation && " notice__animation")}>
      <div className="notice__wrapper">
        <p>{format.type.toUpperCase()}</p>
        <span>{format.message}</span>
      </div>
    </div>
});

export default Notice;
