import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import AdversarialAttackForm from "../../components/AdversarialAttackForm/AdversarialAttackForm";

const AdversarialAttacksPage = () => {
    const {
        subDendrogram,
        loading,
    } = useContext(DendrogramContext);

    return (
        <div id="mainBody">
            <aside className="asideForms">
                <ChangeModelForm />
                <AdversarialAttackForm />
            </aside>
            <main id="mainContent">
                {loading ? (
                    <div>Loading...</div>
                ) : subDendrogram ? (
                    <Dendrogram data={subDendrogram} />
                ) : (
                    <div>Please upload a model</div>
                )}
            </main>
        </div>

    );
}

export default AdversarialAttacksPage;