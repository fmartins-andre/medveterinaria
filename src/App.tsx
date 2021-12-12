import Header from './components/Header'
import Layout from './components/Layout'
import Wrapper from './components/Wrapper'
import SymptomsPage from './pages/symptomsPage'

function App () {
  return (
    <Layout>
      <Header />

      <Wrapper>
        <SymptomsPage />
      </Wrapper>

    </Layout>
  )
}

export default App
