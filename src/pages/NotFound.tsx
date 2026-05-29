import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const url = `https://silencode.com.br${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>Página não encontrada (404) | SILENCODE</title>
        <meta
          name="description"
          content="Esta página não existe ou foi movida. Volte para a página inicial da SILENCODE e conheça nossos serviços de presença digital e posicionamento local."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Página não encontrada (404) | SILENCODE" />
        <meta
          property="og:description"
          content="Esta página não existe. Acesse silencode.com.br para conhecer nossos serviços."
        />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content="Página não encontrada (404) | SILENCODE" />
        <meta
          name="twitter:description"
          content="Esta página não existe. Acesse silencode.com.br para conhecer nossos serviços."
        />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
