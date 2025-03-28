import React from 'react';
import Dendrogram from '../../components/Dendrogram/Dendrogram'
import FormContainer from '../../components/FormContainer/FormContainer';

const QueryPage = () => {
  return (
    <>
      <aside>
        <FormContainer borderRadiusTop="15" borderRadiusBottom="0">
        </FormContainer>
      </aside>
      <main>
        {/* <Dendrogram data={data} /> */}
      </main>
    </>
  );
};

export default QueryPage;