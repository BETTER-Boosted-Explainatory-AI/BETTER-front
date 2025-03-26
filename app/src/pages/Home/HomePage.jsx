import React from 'react';
import Dendrogram from '../../components/Dendrogram/Dendrogram'
import FormContainer from '../../components/FormContainer/FormContainer';
import data from "../../data/dendrogramMock.json";
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';
import SliderComponent from '../../components/FormComponents/SliderComponent/SliderComponent';

const HomePage = () => {
  return (
    <>
      <aside>
        <FormContainer>
          <FileUpload />
          <SliderComponent />
        </FormContainer>
      </aside>
      <main>
        <Dendrogram data={data} />
      </main>
    </>
  );
};

export default HomePage;