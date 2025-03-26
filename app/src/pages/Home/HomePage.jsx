import React from 'react';
import Dendrogram from '../../components/Dendrogram/Dendrogram'
import FormContainer from '../../components/FormContainer/FormContainer';
import data from "../../data/dendrogramMock.json";
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';
import SliderComponent from '../../components/FormComponents/SliderComponent/SliderComponent';
import RadioComponent from '../../components/FormComponents/RadioComponent/RadioComponent';
import FormLabelComponent from '../../components/FormComponents/FormLabelComponent/FormLabelComponent';
import MultipleSelect from '../../components/FormComponents/MultipleSelect/MultipleSelect';
const HomePage = () => {
  return (
    <>
      <aside>
        <FormContainer>
        </FormContainer>
      </aside>
      <main>
        <Dendrogram data={data} />
      </main>
    </>
  );
};

export default HomePage;