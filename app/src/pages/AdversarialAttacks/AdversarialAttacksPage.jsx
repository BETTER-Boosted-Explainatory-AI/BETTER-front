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
        <>
            <aside>
                <ChangeModelForm />
                <AdversarialAttackForm />
            </aside>
            <main>
                {/* {loading ? (
                    <div>Loading...</div>
                ) : subDendrogram ? (
                    <Dendrogram data={subDendrogram} />
                ) : (
                    <div>Please upload a model</div>
                )} */}
            </main>
        </>

    );
}

export default AdversarialAttacksPage;