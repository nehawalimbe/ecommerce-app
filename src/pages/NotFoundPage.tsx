import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="status-state not-found-state">
      <p className="page-eyebrow">404 error</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or may have moved.</p>
      <Link className="primary-link" to="/">
        Return to products
      </Link>
    </section>
  );
}

export default NotFoundPage;
