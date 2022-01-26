import Footer from "./shared/components/Footer";
import Header from "./shared/components/Header";

import {Container} from 'react-bootstrap';

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to EasyShop</h1>
        </Container>
      </main>
      <Footer />
    </>  );
}

export default App;
