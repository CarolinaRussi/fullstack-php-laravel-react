export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-text">
      <h1 className="text-6xl font-bold mb-4 text-gran-dark">404</h1>
      <p className="text-xl mb-6">Ops! Página não encontrada.</p>
      <a href="/" className="underline text-gran-bright hover:text-gran-dark">
        Voltar para a Home
      </a>
    </div>
  );
}
