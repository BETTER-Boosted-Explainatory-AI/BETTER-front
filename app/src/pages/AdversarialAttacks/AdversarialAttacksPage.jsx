import React, { useContext } from "react";
import Dendrogram from "../../components/Dendrogram/Dendrogram";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import ChangeModelForm from "../../components/ChangeModelForm/ChangeModelForm";
import AdversarialAttackForm from "../../components/AdversarialAttackForm/AdversarialAttackForm";
import ImageContainer from "../../components/ImageContainer/ImageContainer";
import LynxImg from "../../assets/lynx.jpg";;
import VerbalExplanation from "../../components/VerbalExplanation/VerbalExplanation";

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
                <ImageContainer imageUrl={LynxImg} altText="lynx" />
                <VerbalExplanation explanation={["Lynx","Cats", "Mammals", "Animals", "Entity"]} />
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