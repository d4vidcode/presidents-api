(function () {
  const translations = {
    es: {
      'nav.home': 'Inicio',
      'nav.docs': 'Documentación',
      'nav.about': 'About',
      'nav.github': 'GitHub',
      'hero.eyebrow': 'Datos históricos. Diseño moderno.',
      'hero.title': 'La historia presidencial,<br>elevada a API.',
      'hero.lead': 'Consulta presidentes, partidos y países en inglés y español con endpoints claros, filtros potentes y respuestas consistentes. Pensada para integrarse sin fricción.',
      'hero.cta.docs': 'Ver documentación',
      'hero.cta.health': 'Estado del servicio',
      'features.title': 'Simple por fuera. Precisa por dentro.',
      'features.sub': 'Una experiencia de consumo limpia, con datos estructurados y listos para productos, investigación y visualizaciones.',
      'features.c1.title': 'Bilingüe nativa',
      'features.c1.text': 'Respuestas en <code class="inline">en</code> y <code class="inline">es</code> mediante rutas versionadas <code class="inline">/api/v1/:lang</code>.',
      'features.c2.title': 'Consultas expresivas',
      'features.c2.text': 'Filtra presidentes por país, partido y rango de fechas, con paginación incluida.',
      'features.c3.title': 'Modelo consistente',
      'features.c3.text': 'Países, partidos y mandatos con esquemas claros, relaciones y metadatos útiles.',
      'build.title': 'Hecha para construir rápido.',
      'build.sub': 'Menos complejidad, más enfoque en tu producto. Explora la documentación y empieza a consumir datos en minutos.',
      'build.c1.title': 'REST claro',
      'build.c1.text': 'Recursos predecibles: países, partidos y presidentes con búsqueda por código o slug.',
      'build.c2.title': 'Respuestas uniformes',
      'build.c2.text': 'Formato consistente con <code class="inline">data</code> y <code class="inline">meta</code> para listas y detalles.',
      'build.c3.title': 'Listo para escalar',
      'build.c3.text': 'Base TypeScript + Fastify + MongoDB, validación y manejo de errores centralizado.',
      'github.title': 'Código abierto en GitHub',
      'github.sub': 'Explora el repositorio, revisa la implementación, reporta issues o contribuye al proyecto.',
      'github.cta': 'Ver en GitHub',
      'footer.copy': '© 2026 Presidents API',
      'docs.head.eyebrow': 'Referencia',
      'docs.head.title': 'Documentación',
      'docs.head.sub': 'Todo lo necesario para integrar la API: rutas, parámetros, filtros y formato de respuesta.',
      'docs.toc': 'Contenido',
      'docs.intro': 'Introducción',
      'docs.intro.text1': 'Base URL local: <code class="inline">http://localhost:3000</code>. Las rutas de datos usan prefijo de idioma y versión:',
      'docs.intro.text2': 'Idiomas soportados: <code class="inline">en</code>, <code class="inline">es</code>. Respuestas de lista: <code class="inline">{ data, meta }</code>. Detalle: <code class="inline">{ data }</code>.',
      'docs.health': 'Health',
      'docs.health.text': 'Estado del servicio y conexión a base de datos.',
      'docs.countries': 'Países',
      'docs.countries.text': '<code class="inline">:isoCode</code> en formato ISO (ej. <code class="inline">PE</code>).',
      'docs.parties': 'Partidos',
      'docs.parties.text': 'Parámetros: <code class="inline">country</code> (opcional, ISO 2-3). <code class="inline">:code</code> identificador del partido.',
      'docs.presidents': 'Presidentes',
      'docs.presidents.filters': 'Filtros soportados:',
      'docs.presidents.text': '<code class="inline">country</code> (ISO), <code class="inline">party</code> (código), <code class="inline">from</code> (fecha), <code class="inline">to</code> (fecha), <code class="inline">page</code> (≥1), <code class="inline">limit</code> (1-100).',
      'docs.errors': 'Errores',
      'docs.errors.text1': 'Formato consistente para validación y recursos no encontrados:',
      'docs.errors.text2': 'Códigos comunes: <code class="inline">400</code> (parámetros/idioma/fechas inválidos), <code class="inline">404</code> (no encontrado), <code class="inline">500</code> (error interno), <code class="inline">503</code> (health degradado).',
      'about.eyebrow': 'Acerca de',
      'about.title': 'Datos con claridad.<br>Diseño con intención.',
      'about.lead': 'Presidents API nace para hacer accesible la información histórica presidencial mediante una interfaz moderna, consistente y fácil de integrar.',
      'about.stat1.label': 'Idiomas (EN/ES)',
      'about.stat2.label': 'Recursos principales',
      'about.stat3.label': 'API versionada',
      'about.c1.title': 'Propósito',
      'about.c1.text': 'Ofrecer datos estructurados sobre países, partidos y presidentes para aplicaciones, análisis y proyectos educativos, reduciendo el esfuerzo de modelado y normalización.',
      'about.c2.title': 'Enfoque',
      'about.c2.text': 'Rutas predecibles, respuestas uniformes, validación de parámetros y soporte bilingüe. Una experiencia pensada para desarrolladores que valoran la simplicidad.',
      'about.c3.title': 'Tecnología',
      'about.c3.text': 'Construida con Fastify, TypeScript y MongoDB/Mongoose, con validación centralizada y pruebas de integración para garantizar calidad y robustez.',
      'about.cta.title': 'Explora la API',
      'about.cta.sub': 'Consulta la referencia completa de endpoints y comienza a integrar datos históricos en tu proyecto.',
      'about.cta.docs': 'Ir a documentación',
      'about.cta.home': 'Volver al inicio',
      'footer.docs': 'Documentación',
      'footer.about': 'About',
      'footer.home': 'Inicio',
    },
    en: {
      'nav.home': 'Home',
      'nav.docs': 'Documentation',
      'nav.about': 'About',
      'nav.github': 'GitHub',
      'hero.eyebrow': 'Historical data. Modern design.',
      'hero.title': 'Presidential history,<br>elevated as an API.',
      'hero.lead': 'Query presidents, parties, and countries in English and Spanish with clear endpoints, powerful filters, and consistent responses. Built to integrate seamlessly.',
      'hero.cta.docs': 'View documentation',
      'hero.cta.health': 'Service status',
      'features.title': 'Simple outside. Precise inside.',
      'features.sub': 'A clean consumption experience, with structured data ready for products, research, and visualizations.',
      'features.c1.title': 'Bilingual by design',
      'features.c1.text': 'Responses in <code class="inline">en</code> and <code class="inline">es</code> through versioned routes <code class="inline">/api/v1/:lang</code>.',
      'features.c2.title': 'Expressive queries',
      'features.c2.text': 'Filter presidents by country, party, and date range, with built-in pagination.',
      'features.c3.title': 'Consistent model',
      'features.c3.text': 'Countries, parties, and terms with clear schemas, relations, and useful metadata.',
      'build.title': 'Built to ship fast.',
      'build.sub': 'Less complexity, more focus on your product. Explore the docs and start consuming data in minutes.',
      'build.c1.title': 'Clear REST',
      'build.c1.text': 'Predictable resources: countries, parties, and presidents searchable by code or slug.',
      'build.c2.title': 'Uniform responses',
      'build.c2.text': 'Consistent format with <code class="inline">data</code> and <code class="inline">meta</code> for lists and details.',
      'build.c3.title': 'Ready to scale',
      'build.c3.text': 'TypeScript + Fastify + MongoDB foundation, with centralized validation and error handling.',
      'github.title': 'Open source on GitHub',
      'github.sub': 'Explore the repository, review the implementation, report issues, or contribute to the project.',
      'github.cta': 'View on GitHub',
      'footer.copy': '© 2026 Presidents API',
      'docs.head.eyebrow': 'Reference',
      'docs.head.title': 'Documentation',
      'docs.head.sub': 'Everything you need to integrate the API: routes, parameters, filters, and response format.',
      'docs.toc': 'Contents',
      'docs.intro': 'Introduction',
      'docs.intro.text1': 'Local base URL: <code class="inline">http://localhost:3000</code>. Data routes use a language and version prefix:',
      'docs.intro.text2': 'Supported languages: <code class="inline">en</code>, <code class="inline">es</code>. List responses: <code class="inline">{ data, meta }</code>. Detail: <code class="inline">{ data }</code>.',
      'docs.health': 'Health',
      'docs.health.text': 'Service status and database connectivity.',
      'docs.countries': 'Countries',
      'docs.countries.text': '<code class="inline">:isoCode</code> in ISO format (e.g. <code class="inline">PE</code>).',
      'docs.parties': 'Parties',
      'docs.parties.text': 'Parameters: <code class="inline">country</code> (optional, ISO 2-3). <code class="inline">:code</code> party identifier.',
      'docs.presidents': 'Presidents',
      'docs.presidents.filters': 'Supported filters:',
      'docs.presidents.text': '<code class="inline">country</code> (ISO), <code class="inline">party</code> (code), <code class="inline">from</code> (date), <code class="inline">to</code> (date), <code class="inline">page</code> (≥1), <code class="inline">limit</code> (1-100).',
      'docs.errors': 'Errors',
      'docs.errors.text1': 'Consistent format for validation and not-found responses:',
      'docs.errors.text2': 'Common codes: <code class="inline">400</code> (invalid params/language/dates), <code class="inline">404</code> (not found), <code class="inline">500</code> (internal error), <code class="inline">503</code> (degraded health).',
      'about.eyebrow': 'About',
      'about.title': 'Data with clarity.<br>Design with intent.',
      'about.lead': 'Presidents API was created to make presidential historical information accessible through a modern, consistent, and easy-to-integrate interface.',
      'about.stat1.label': 'Languages (EN/ES)',
      'about.stat2.label': 'Core resources',
      'about.stat3.label': 'Versioned API',
      'about.c1.title': 'Purpose',
      'about.c1.text': 'Provide structured data about countries, parties, and presidents for applications, analysis, and educational projects, reducing modeling and normalization effort.',
      'about.c2.title': 'Approach',
      'about.c2.text': 'Predictable routes, uniform responses, parameter validation, and bilingual support. An experience designed for developers who value simplicity.',
      'about.c3.title': 'Technology',
      'about.c3.text': 'Built with Fastify, TypeScript, and MongoDB/Mongoose, with centralized validation and integration tests to ensure quality and robustness.',
      'about.cta.title': 'Explore the API',
      'about.cta.sub': 'Check the complete endpoint reference and start integrating historical data into your project.',
      'about.cta.docs': 'Go to documentation',
      'about.cta.home': 'Back to home',
      'footer.docs': 'Documentation',
      'footer.about': 'About',
      'footer.home': 'Home',
    },
  };

  function applyLang(lang) {
    const dict = translations[lang] || translations.es;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang-btn') === lang);
    });
    localStorage.setItem('lang', lang);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const path = location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.menu a[data-path]').forEach((a) => {
      if (a.getAttribute('data-path') === path) a.classList.add('active');
    });

    const saved = localStorage.getItem('lang');
    const lang = saved === 'en' || saved === 'es' ? saved : 'es';
    applyLang(lang);

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang-btn')));
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  });
})();
