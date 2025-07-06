import Header from "./components/Header";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto mt-6">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
