import ListPage from 'pages/List/containers/List';
import PageAccessValidator from 'components/PageAccessValidator';
import PageContainer from 'components/PageContainer';

const List= () => (
    <PageAccessValidator>
        <PageContainer>
           <ListPage/>
        </PageContainer>
    </PageAccessValidator>
)
export default List