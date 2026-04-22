type ErrorScreenProps = {
  message: string;
};

export function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <main className="shell">
      <section className="hero-card">
        <span className="eyebrow">Launch blocked</span>
        <h1>Mini App could not start</h1>
        <p>{message}</p>
        <div className="callout warning">
          Use the bot only as a launcher. Business logic stays in the Mini App and backend APIs.
        </div>
      </section>
    </main>
  );
}
