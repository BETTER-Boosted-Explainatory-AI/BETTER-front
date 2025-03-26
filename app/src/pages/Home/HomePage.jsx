import React from 'react';
import Dendrogram from '../../components/Dendrogram/Dendrogram'
import FormContainer from '../../components/FormContainer/FormContainer';
import data from "../../data/dendrogramMock.json";
import FileUpload from '../../components/FileUpload/FileUpload';
const HomePage = () => {
  return (
    <>
      <aside>
        <FormContainer>
          <FileUpload />
        </FormContainer>
      </aside>
      <main>
        <Dendrogram data={data} />
      </main>
    </>
  );
};

export default HomePage;