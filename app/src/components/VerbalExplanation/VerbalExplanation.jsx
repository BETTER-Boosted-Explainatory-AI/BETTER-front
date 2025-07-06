import React from 'react';
import { VerbalExplanationContainer, VerbalExplanationParagraph, VerbalExplanationBold } from './VerbalExplanation.style';

const VerbalExplanation = ({ explanation }) => {
    if (!explanation || explanation.length === 0) return null;

    const fullExplanation = explanation.map((word, i, arr) => {
        const sanitizedWord = word.replace(/[0-9_]/g, '');

        if (i === 0) {
            return (
                <React.Fragment key={i}>
                    <VerbalExplanationBold>{sanitizedWord}</VerbalExplanationBold>
                </React.Fragment>
            );
        }

        // Check if the current word is the same as the previous word
        if (sanitizedWord === arr[i - 1].replace(/[0-9_]/g, '')) {
            return null;
        }

        return (
            <React.Fragment key={i}>
                {' is a part of '}
                <VerbalExplanationBold>{sanitizedWord}</VerbalExplanationBold>
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
