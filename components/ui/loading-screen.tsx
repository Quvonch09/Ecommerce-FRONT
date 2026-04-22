export function LoadingScreen() {
  return (
    <main className="shell">
      <section className="hero-card">
        <span className="eyebrow">Telegram Mini App</span>
        <h1>Authenticating session</h1>
        <p>Opening the WebApp, exchanging `initData` for JWT, and resolving the active role.</p>
        <div className="pulse-bar" />
      </section>
    </main>
  );
}
