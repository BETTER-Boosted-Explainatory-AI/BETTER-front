import React, { useEffect, useState } from 'react';
import Dendrogram from '../../components/Dendrogram/Dendrogram'
// import data from "../../data/dendrogramMock.json";
import SubDendrogramForm from '../../components/SubDendrogramForm/SubDendrogramForm';
import {fetchSubDendrogram} from '../../services/dendrogram.service';

const HomePage = () => {
  const [subDengrogram, setSubDendrogram] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    

    async function getSubDendrogram() {
      const result = await fetchSubDendrogram();
      setCampaign(result.data);
    }

  }, []);



  return (
    <>
      <aside>
        <SubDendrogramForm />
      </aside>
      <main>
        <Dendrogram data={data} />
      </main>
    </>
  );
};

export default HomePage;