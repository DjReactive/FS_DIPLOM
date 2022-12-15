import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Wrapper from '../../components/global/Wrapper';
import API from '../API'
import { useStore } from '../store'

const ProtectRoute = observer(({ access, data }) => {
  const [state, setState] = useState(-1);
  const auth = useStore(store => store.userStore);
  const navigate = useNavigate();
  const user = auth.getUser() || { access: 0 };
  const isAccess = state <= user.access;

  useEffect(() =>
    setState(prev => prev !== access ? access : prev), [state, access]);

  useEffect(() => {
    if (isAccess) API.LoadContent();
  }, [auth.update]);

  return isAccess ?
    <Wrapper data={data}/> : <Navigate to='/login' />
});

export default ProtectRoute;
