import Footer from "./shared/components/Footer";
import Header from "./shared/components/Header";

import {Container} from 'react-bootstrap';
import HomeScreen from "./HomePage/pages/HomeScreen";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>  );
}

export default App;
