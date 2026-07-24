function AboutPage() {
  return (
    <section className="about-page" aria-labelledby="about-heading">
      <div className="about-hero">
        <p className="page-eyebrow">About this project</p>
        <h1 id="about-heading">Learning React by building a real storefront</h1>
        <p className="about-introduction">
          MyStore is a learning project that brings together reusable React
          components, routing, API requests, Redux Toolkit, TypeScript, and
          responsive CSS in one practical application.
        </p>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <span className="about-card-number" aria-hidden="true">
            01
          </span>
          <h2>Component thinking</h2>
          <p>
            Product, filter, navigation, and cart features are separated into
            focused components with clear responsibilities.
          </p>
        </article>

        <article className="about-card">
          <span className="about-card-number" aria-hidden="true">
            02
          </span>
          <h2>State management</h2>
          <p>
            Redux Toolkit manages products and the shopping cart, while the
            preserved Context API version provides a useful comparison.
          </p>
        </article>

        <article className="about-card">
          <span className="about-card-number" aria-hidden="true">
            03
          </span>
          <h2>Responsive design</h2>
          <p>
            Plain CSS creates adaptable layouts, accessible controls, and
            consistent light and dark themes without a UI framework.
          </p>
        </article>
      </div>
    </section>
  );
}

export default AboutPage;
