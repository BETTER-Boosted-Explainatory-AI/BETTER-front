import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import AdversarialAttackForm from "../../components/AdversarialAttackForm/AdversarialAttackForm";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";

const AdversarialAttacksPage = () => {
  const { currentModelData } = useContext(ModelContext);
  const { dendrogramData } = useContext(DendrogramContext);

    const renderMainContent = () => {
    if (!currentModelData || currentModelData.isLoading) return <LoadingComponent />;
    if (dendrogramData.loading) return <LoadingComponent />;
    if (dendrogramData.subDendrogram) return <Dendrogram data={dendrogramData.subDendrogram} />;
  };
    return (
        <>
            <aside id="asideForms">
                <ChangeModelForm />
                <AdversarialAttackForm />
            </aside>
            <main id="mainContent">
                {renderMainContent()}
            </main>
        </>
    );
}

export default AdversarialAttacksPage;