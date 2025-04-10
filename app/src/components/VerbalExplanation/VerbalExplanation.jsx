import React from 'react';
import { VerbalExplanationContainer, VerbalExplanationParagraph, VerbalExplanationBold } from './VerbalExplanation.style';

const VerbalExplanation = ({ explanation }) => {
    if (!explanation || explanation.length === 0) return null;

    const fullExplanation = explanation.map((word, i) => {
        if (i === 0) {
            return (
                <React.Fragment key={i}>
                    <VerbalExplanationBold>{word}</VerbalExplanationBold>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment key={i}>
                {' is a part of '}
                <VerbalExplanationBold>{word}</VerbalExplanationBold>
            </React.Fragment>
        );
    });

    return (
        <VerbalExplanationContainer>
            <VerbalExplanationParagraph>
                {fullExplanation}
            </VerbalExplanationParagraph>
        </VerbalExplanationContainer>
    );
};

export default VerbalExplanation;
