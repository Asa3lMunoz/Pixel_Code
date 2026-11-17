import { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import HomeHeader from '../components/HomeHeader';
import HomeFooter from '../components/HomeFooter';
import '../styles/homepage.css';

const EMAIL = 'proyectos@mikecrea.com';
const WHATSAPP = '18634401417';
const TECHS = ['HTML5 / CSS3', 'JavaScript / TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PHP / Laravel', 'WordPress', 'PostgreSQL', 'MySQL', 'Firebase', 'APIs REST', 'Figma', 'Cloud y hosting'];

export default function IndexPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tipo, setTipo] = useState('Sitio web');
  const [message, setMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [formNote, setFormNote] = useState('');

  const canvasRef = useRef(null);
  const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola PixelCode, quiero cotizar un proyecto.')}`;

  // Canvas pixel animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const size = 34, gap = 4;
    const colors = ['34,211,238', '139,92,246', '244,114,182'];
    let cells = [], W, H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function build() {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(W / size), rows = Math.ceil(H / size);
      cells = [];
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++)
          cells.push({ x, y, a: 0, t: 0, c: colors[Math.floor(Math.random() * colors.length)] });
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of cells) {
        ctx.fillStyle = 'rgba(255,255,255,.03)';
        ctx.fillRect(p.x * size, p.y * size, size - gap, size - gap);
        if (p.a > 0.01) {
          ctx.fillStyle = `rgba(${p.c},${p.a})`;
          ctx.fillRect(p.x * size, p.y * size, size - gap, size - gap);
        }
      }
    }

    let rafId;
    function tick() {
      for (let k = 0; k < 3; k++) {
        const p = cells[Math.floor(Math.random() * cells.length)];
        if (p) { p.t = 1; p.c = colors[Math.floor(Math.random() * colors.length)]; }
      }
      for (const q of cells) {
        if (q.t > 0) { q.a = Math.min(0.42, q.a + 0.05); if (q.a >= 0.42) q.t = 0; }
        else if (q.a > 0) q.a = Math.max(0, q.a - 0.012);
      }
      draw();
      rafId = requestAnimationFrame(tick);
    }

    build();
    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 200); };
    window.addEventListener('resize', onResize);
    if (!reduce) rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });
    return () => io.disconnect();
  }, []);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    e.currentTarget.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setFormNote('Por favor verifica que no eres un robot.');
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/contactRequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombres: firstName,
          apellidos: lastName,
          email,
          telefono: phone,
          tipo,
          mensaje: message,
          reviewed: false,
          answered: false,
          recaptchaToken: captchaToken,
        }),
      });
      if (res.ok) {
        setFirstName(''); setLastName(''); setEmail(''); setPhone('');
        setTipo('Sitio web'); setMessage(''); setCaptchaToken(null);
        setFormNote('¡Mensaje enviado! Te contactaremos pronto.');
      } else {
        setFormNote('Error al enviar. Inténtalo nuevamente.');
      }
    } catch {
      setFormNote('Error de red. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="page-home">

      <HomeHeader />

      <main>

        {/* HERO */}
        <section className="hero" id="inicio">
          <canvas ref={canvasRef} id="pixels" aria-hidden="true" />
          <div className="wrap">
            <div className="hero-inner">
              <div className="badge reveal">
                <span className="dot" />
                Desarrollo de productos digitales a medida
              </div>
              <h1 className="reveal">
                Convertimos tu idea en un <span className="grad-text">producto digital</span> que crece contigo
              </h1>
              <p className="lead reveal">
                En PixelCode diseñamos y programamos sitios web, aplicaciones y plataformas hechas a la medida de tu negocio, y las acompañamos con diseño de marca y publicidad para que se vean y se vendan mejor.
              </p>
              <div className="cta-row reveal">
                <a href="#contacto" className="btn btn-primary">
                  Cuéntanos tu proyecto
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
              </div>
              <div className="hero-tags reveal">
                <span>Sitios web</span><span>Apps móviles</span><span>Plataformas SaaS</span>
                <span>Sistemas a medida</span><span>Branding</span><span>Publicidad digital</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Qué hacemos</div>
              <h2>Todo lo que tu negocio necesita para <span className="grad-text">brillar en digital</span></h2>
              <p>Del primer boceto a la puesta en marcha: un solo equipo para diseñar, programar y comunicar tu producto.</p>
            </div>
            <div className="grid services-grid">
              <article className="card reveal" onMouseMove={handleCardMouseMove}>
                <div className="icon"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3" /></svg></div>
                <h3>Desarrollo web a medida</h3>
                <p>Sitios corporativos, landing pages y portales rápidos, seguros y optimizados para buscadores.</p>
                <ul><li>Diseño responsive</li><li>SEO técnico y rendimiento</li><li>Paneles de administración</li></ul>
              </article>
              <article className="card reveal" onMouseMove={handleCardMouseMove}>
                <div className="icon"><svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg></div>
                <h3>Aplicaciones móviles y PWA</h3>
                <p>Apps que tus clientes instalan y usan a diario, en iOS, Android o como aplicación web progresiva.</p>
                <ul><li>Experiencia nativa</li><li>Notificaciones y modo offline</li><li>Publicación en tiendas</li></ul>
              </article>
              <article className="card reveal" onMouseMove={handleCardMouseMove}>
                <div className="icon"><svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5M3 17.5l9 5 9-5" /></svg></div>
                <h3>Plataformas y SaaS</h3>
                <p>Productos multiusuario con roles, suscripciones y pagos, listos para escalar a más clientes.</p>
                <ul><li>Arquitectura multi-tenant</li><li>Cobros y suscripciones</li><li>Panel y métricas</li></ul>
              </article>
              <article className="card reveal" onMouseMove={handleCardMouseMove}>
                <div className="icon"><svg viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg></div>
                <h3>Sistemas y software empresarial</h3>
                <p>CRM, ERP, inventarios, reservas o el sistema interno que tu operación necesita y ninguna herramienta resuelve.</p>
                <ul><li>Flujos de trabajo propios</li><li>Reportes en tiempo real</li><li>Gestión de usuarios y permisos</li></ul>
              </article>
              <article className="card reveal" onMouseMove={handleCardMouseMove}>
                <div className="icon"><svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="6" /><path d="M13.5 13.5L21 21M9 6v6M6 9h6" /></svg></div>
                <h3>Integraciones y automatización</h3>
                <p>Conectamos tus herramientas, APIs, pasarelas de pago y servicios para que los procesos corran solos.</p>
                <ul><li>APIs y webhooks</li><li>Pagos en línea</li><li>Automatización de tareas</li></ul>
              </article>
              <article className="card reveal" onMouseMove={handleCardMouseMove}>
                <div className="icon"><svg viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.6 7.6" /></svg></div>
                <h3>Diseño, marca y publicidad</h3>
                <p>Identidad visual, diseño UI/UX, contenido y campañas digitales alineadas con tu producto.</p>
                <ul><li>Branding y diseño gráfico</li><li>UI/UX de producto</li><li>Campañas y contenido</li></ul>
              </article>
            </div>
          </div>
        </section>

        {/* A MEDIDA */}
        <section className="custom" id="a-medida">
          <div className="wrap custom-grid">
            <div className="reveal">
              <div className="eyebrow">Hecho a la medida</div>
              <h2>Tu producto, <span className="grad-text">sin plantillas</span> ni límites prestados</h2>
              <p>Las soluciones genéricas te obligan a adaptar tu negocio a la herramienta. Nosotros hacemos lo contrario: construimos la herramienta alrededor de cómo trabajas y de cómo quieres crecer.</p>
              <ul className="checks">
                <li>
                  <span className="tick"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></span>
                  <div><strong>Pensado para tu negocio</strong><span>Funciones, flujos y diseño definidos con tu equipo, no copiados de otro.</span></div>
                </li>
                <li>
                  <span className="tick"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></span>
                  <div><strong>Escalable desde el día uno</strong><span>Una base técnica sólida que soporta más usuarios y nuevos módulos.</span></div>
                </li>
                <li>
                  <span className="tick"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7" /></svg></span>
                  <div><strong>Tuyo de principio a fin</strong><span>Tienes el control del producto y acompañamiento después del lanzamiento.</span></div>
                </li>
              </ul>
              <a href="#contacto" className="btn btn-primary">Hablemos de tu idea</a>
            </div>
            <div className="window reveal" aria-hidden="true">
              <div className="window-bar"><i /><i /><i /><em>tu-producto.config.js</em></div>
              <pre>
                <span className="c">{'// Tu idea, convertida en producto'}</span>{'\n'}
                <span className="k">const</span>
                <span className="f"> proyecto</span>{' = {\n'}
                {'  nombre: '}<span className="s">"Tu plataforma"</span>{',\n'}
                {'  tipo: ['}<span className="s">"web"</span>{', '}<span className="s">"app"</span>{', '}<span className="s">"panel admin"</span>{']\n'}
                {'  diseño: '}<span className="s">"a medida"</span>{',\n'}
                {'  pagos: '}<span className="k">true</span>{',\n'}
                {'  escalable: '}<span className="k">true</span>{',\n'}
                {'  soporte: '}<span className="s">"continuo"</span>{'\n'}
                {'};\n\n'}
                <span className="k">await</span>
                <span className="f"> PixelCode</span>{'.'}<span className="p">construir</span>{'(proyecto);\n'}
                <span className="c">{'// → listo para lanzar'}</span>
              </pre>
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section id="proceso">
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Cómo trabajamos</div>
              <h2>Un proceso claro, <span className="grad-text">sin sorpresas</span></h2>
              <p>Avanzas con entregas visibles en cada etapa, para que siempre sepas en qué punto está tu proyecto.</p>
            </div>
            <div className="grid steps">
              <div className="step reveal"><h3>Descubrimiento</h3><p>Entendemos tu negocio, tus usuarios y tus objetivos para definir el alcance correcto.</p></div>
              <div className="step reveal"><h3>Diseño</h3><p>Prototipos y diseño de interfaz que validas antes de escribir una sola línea de código.</p></div>
              <div className="step reveal"><h3>Desarrollo</h3><p>Programamos por etapas, con entregas parciales y pruebas continuas de calidad.</p></div>
              <div className="step reveal"><h3>Lanzamiento y soporte</h3><p>Publicamos, medimos y seguimos mejorando el producto junto contigo.</p></div>
            </div>
          </div>
        </section>

        {/* TECNOLOGÍAS */}
        <section id="tecnologias" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">Tecnologías</div>
              <h2>Herramientas modernas, <span className="grad-text">elegidas con criterio</span></h2>
              <p>Elegimos el stack según tu proyecto, no al revés.</p>
            </div>
            <div className="tech-wrap reveal">
              {TECHS.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>
        </section>

        {/* NOSOTROS */}
        <section className="about" id="nosotros">
          <div className="wrap about-grid">
            <div className="reveal">
              <div className="eyebrow">Sobre PixelCode</div>
              <h2>Creatividad visual y <span className="grad-text">precisión técnica</span></h2>
              <p>Un píxel es la unidad mínima de toda imagen; una línea de código, la unidad mínima de todo software. Creemos que los grandes resultados nacen de cuidar los pequeños detalles en ambos mundos.</p>
              <p>Por eso unimos diseño, publicidad y programación en un mismo equipo: para entregarte productos digitales que se ven bien, funcionan mejor y comunican con claridad.</p>
            </div>
            <div className="pillars reveal">
              <div className="pillar"><h4>Diseño</h4><p>Interfaces claras y marcas con personalidad.</p></div>
              <div className="pillar"><h4>Programación</h4><p>Código limpio, seguro y mantenible.</p></div>
              <div className="pillar"><h4>Publicidad</h4><p>Mensajes y campañas que conectan con tu público.</p></div>
              <div className="pillar"><h4>Cercanía</h4><p>Comunicación directa y entregas transparentes.</p></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingBottom: 40 }}>
          <div className="wrap">
            <div className="cta-box reveal">
              <h2>¿Listo para darle vida a tu <span className="grad-text">próximo producto</span>?</h2>
              <p>Cuéntanos qué necesitas y te respondemos con una propuesta clara de alcance, tiempos y costos.</p>
              <a href="#contacto" className="btn btn-primary">Solicitar una cotización</a>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto">
          <div className="wrap contact-grid">
            <div className="contact-info reveal">
              <div className="eyebrow">Contacto</div>
              <h2>Empecemos a <span className="grad-text">construirlo</span></h2>
              <p>Escríbenos con los detalles de tu proyecto, aunque sea solo una idea. Nosotros te ayudamos a aterrizarla.</p>
              <div className="info-list">
                <a className="info-item" href={`mailto:${EMAIL}`}>
                  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                  <div><small>Correo</small><span>{EMAIL}</span></div>
                </a>
                <a className="info-item" href={waUrl} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-13.4 7.8L3 21l1.3-4.4A9 9 0 1121 12z" /></svg>
                  <div><small>WhatsApp</small><span>Escríbenos ahora</span></div>
                </a>
                <div className="info-item">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></svg>
                  <div><small>Alcance</small><span>Trabajamos con clientes en cualquier país</span></div>
                </div>
              </div>
            </div>

            <form className="reveal" onSubmit={handleSubmit} noValidate>
              <div className="row">
                <label>
                  Nombre
                  <input type="text" placeholder="Tu nombre" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <label>
                  Apellido
                  <input type="text" placeholder="Tu apellido" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
              </div>
              <div className="row">
                <label>
                  Correo
                  <input type="email" placeholder="tu@correo.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                  Teléfono
                  <input type="tel" placeholder="+56 9 1234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
              </div>
              <label>
                Tipo de proyecto
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option>Sitio web</option>
                  <option>Aplicación móvil / PWA</option>
                  <option>Plataforma o SaaS</option>
                  <option>Sistema a medida</option>
                  <option>Diseño / Branding / Publicidad</option>
                  <option>Otro</option>
                </select>
              </label>
              <label>
                Cuéntanos tu idea
                <textarea
                  placeholder="¿Qué quieres construir? ¿Para quién? ¿Tienes fecha objetivo?"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_KEY} onChange={setCaptchaToken} />
              </div>
              <button type="submit" className="btn btn-primary">Enviar mensaje</button>
              {formNote && <p className="form-note">{formNote}</p>}
            </form>
          </div>
        </section>

      </main>

      <HomeFooter />

      <a className="wa" href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" style={{ display: 'grid' }}>
        <svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.6L3 29l7-1.8a12.8 12.8 0 0 0 6 1.5c7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.2 1.1 1.1-4-.3-.4a10.3 10.3 0 0 1-1.6-5.5C5.2 9.9 10 5.3 16 5.3s10.8 4.6 10.8 10.3S22 26.1 16 26.1zm5.9-7.7c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.6 8.6 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4c.2.2 2.4 3.7 5.8 5.1 2.1.9 3 1 4 .8a3.4 3.4 0 0 0 2.2-1.6 2.7 2.7 0 0 0 .2-1.6c-.1-.2-.3-.3-.6-.4z" /></svg>
      </a>

    </div>
  );
}
