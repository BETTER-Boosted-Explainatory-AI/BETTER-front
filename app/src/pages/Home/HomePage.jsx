import React, { useEffect, useState } from 'react';
import Dendrogram from '../../components/Dendrogram/Dendrogram'
// import data from "../../data/dendrogramMock.json";
import SubDendrogramForm from '../../components/SubDendrogramForm/SubDendrogramForm';
import { fetchSubDendrogram } from '../../services/dendrogram.service';

const HomePage = () => {
  const [subDengrogram, setSubDendrogram] = useState(null);

  useEffect(() => {
    async function getSubDendrogram(data) {
      const result = await fetchSubDendrogram(data);
      setSubDendrogram(result.data);
    }

    // Mock data for testing
    const data = {
      "dataset": "imagenet",
      "selected_labels": ["Persian_cat", "tabby", "orange", "lemon", "zucchini", "broccoli", "teapot", "coffeepot", "warplane", "space_shuttle", "American_coot", "black_swan"],
      "z_filename": "dendrogram_similarity_mini_imagenet"
    }

    getSubDendrogram(data);
  }, []);



  return (
    <>
      <aside>
        <SubDendrogramForm />
      </aside>
      <main>
        {subDengrogram ? (
          <Dendrogram data={subDengrogram} />
        ) : (
          <div>Please upload a model</div>
        )}
      </main>
    </>
  );
};

export default HomePage;