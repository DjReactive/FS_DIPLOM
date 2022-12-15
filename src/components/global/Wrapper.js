import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Notice from './Notice';
import accordeon from '../../resources/admin/accordeon.js';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../control/API';

export default function Wrapper({ data: {title, element, noAuth} }) {
  const navigate = useNavigate();
  const isAdmin = useLocation().pathname.includes('/admin');
  const path = useLocation().pathname;

  return (
    <React.Fragment>
      <Header isAdmin={isAdmin}>{title}</Header>
      <Notice/>
      <main>
        {element}
      </main>
      <Footer isAdmin={isAdmin} />
    </React.Fragment>
  )
}
