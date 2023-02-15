import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import ChangePage from 'pages/Change/containers/Change';
import PageContainer from 'components/PageContainer';

const Change = () => (
    <PageAccessValidator>
        <PageContainer>
            <ChangePage />
        </PageContainer>
    </PageAccessValidator>
);

export default Change;
