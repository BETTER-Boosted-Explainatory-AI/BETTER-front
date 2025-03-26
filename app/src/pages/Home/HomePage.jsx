import React from 'react';
import Dendrogram from '../../components/Dendrogram/Dendrogram'
import FormContainer from '../../components/FormContainer/FormContainer';
import data from "../../data/dendrogramMock.json";
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';
import SliderComponent from '../../components/FormComponents/SliderComponent/SliderComponent';
import RadioComponent from '../../components/FormComponents/RadioComponent/RadioComponent';
import FormLabelComponent from '../../components/FormComponents/FormLabelComponent/FormLabelComponent';
const HomePage = () => {
  return (
    <>
      <aside>
        <FormContainer>
          <FormLabelComponent title="Upload Image" />
          <FileUpload />
          <SliderComponent />
          <RadioComponent title="Dataset" />
        </FormContainer>
      </aside>
      <main>
        <Dendrogram data={data} />
      </main>
    </>
  );
};

export default HomePage;