import React from 'react';
import notFoundIcon from '../../assets/not-found.png';
import TitleComponent from '../../components/TitleComponent/TitleComponent.jsx';
import {NotFoundContainer, ParagraphStyled} from './NotFoundPage.style.js';
const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <img src={notFoundIcon} alt="Not Found" />
      <TitleComponent title="Page Not Found" flexStart="center" fontSize="2.5em"/>
      <ParagraphStyled>Sorry, the page you are looking for does not exist.</ParagraphStyled>
    </NotFoundContainer>
  );
};
export default NotFoundPage;
