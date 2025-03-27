import React from 'react';
import Dendrogram from '../../components/Dendrogram/Dendrogram'
import FormContainer from '../../components/FormContainer/FormContainer';
import data from "../../data/dendrogramMock.json";
import FileUpload from '../../components/FormComponents/FileUpload/FileUpload';
import FormLabelComponent from '../../components/FormComponents/FormLabelComponent/FormLabelComponent';
import MultipleSelect from '../../components/FormComponents/MultipleSelect/MultipleSelect';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const HomePage = () => {
  return (
    <>
      <aside>
        <FormContainer borderRadiusTop="15" borderRadiusBottom="0">
          <FormLabelComponent label="model" />
          <FileUpload />
        </FormContainer>
        <FormContainer bgColor="#e4eeef" borderRadiusTop="0" borderRadiusBottom="15"> 
          <FormLabelComponent label="Select labels" />
          <MultipleSelect />
          <ButtonComponent label="Change" />
        </FormContainer>
      </aside>
      <main>
        <Dendrogram data={data} />
      </main>
    </>
  );
};

export default HomePage;