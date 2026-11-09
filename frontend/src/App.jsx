import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Mail,
  Menu, X, Code2, Braces, Database, PanelsTopLeft, Terminal, Sparkles,
  Download, Send, CheckCircle2, AlertCircle, GraduationCap, ExternalLink
} from 'lucide-react'

const profile = {
  name: 'Akanksha Kumari',
  role: 'Full Stack Developer',
  college: 'IIMT College of Engineering, Greater Noida',
  github: 'https://github.com/akankshau990-byte',
  linkedin: 'https://www.linkedin.com/in/akanksha-upadhyay-633542359/',
  email: 'akankshabbu6@gmail.com'
}

const skills = [
  { title: 'Frontend', subtitle: 'Interfaces & experiences', icon: PanelsTopLeft, items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Backend', subtitle: 'Server-side development', icon: Braces, items: ['Node.js', 'Express.js'] },
  { title: 'Database', subtitle: 'Data fundamentals', icon: Database, items: ['MongoDB'] },
  { title: 'Languages & Tools', subtitle: 'Core foundations', icon: Terminal, items: ['C++', 'C basics', 'Python basics', 'Java basics', 'Git', 'GitHub'] }
]

const projects = [
  {
    n: '01', title: 'Portfolio Website', category: 'Personal website',
    description: 'A responsive personal portfolio to introduce my work, skills, and development journey.',
    tags: ['React', 'Vite', 'CSS'], status: 'This project',
    url: null, accent: 'violet', icon: PanelsTopLeft
  },
  {
    n: '02', title: 'Placement Tracker', category: 'Web application',
    description: 'A project focused on keeping placement application information organized in one place.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'], status: 'Repository',
    url: 'https://github.com/akankshau990-byte/placement-tracker-frontend', accent: 'blue', icon: Database
  },
  {
    n: '03', title: 'URL Shortener', category: 'Backend project',
    description: 'A backend learning project exploring URL-shortening workflows and API development.',
    tags: ['Node.js', 'Express.js', 'MongoDB'], status: 'Link to be added',
    url: null, accent: 'pink', icon: Braces
  }
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: .55, ease: 'easeOut' } }
}

function Eyebrow({ children }) {
  return <div className="eyebrow"><span className="eyebrow-mark" />{children}</div>
}
function SectionTitle({ kicker, title, description }) {
  return <motion.div className="section-title" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }}>
    <Eyebrow>{kicker}</Eyebrow><h2>{title}</h2>{description && <p>{description}</p>}
  </motion.div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formState, setFormState] = useState({ status: 'idle', message: '' })
  const nav = [['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Contact', '#contact']]
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormState({ status: 'loading', message: '' })
    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Could not send your message.')
      setFormState({ status: 'success', message: data.message || 'Message received.' })
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      setFormState({
        status: 'error',
        message: error.message === 'Failed to fetch'
          ? 'Contact API is not running. Start the backend, or email me directly using the email link.'
          : error.message
      })
    }
  }

  return <div className="app-shell" id="top">
    <div className="background-orb orb-one" /><div className="background-orb orb-two" /><div className="background-grid" />
    <header className="header">
      <a className="wordmark" href="#top" onClick={() => setMenuOpen(false)} aria-label="Akanksha home"><span className="wordmark-icon">a<span>.</span></span><span>AKANKSHA KUMARI</span></a>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'navigation navigation-open' : 'navigation'} aria-label="Main navigation">
        {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s connect <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <main>
      <section className="hero content-width">
        <motion.div className="hero-text" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: .12 } } }}>
          <motion.div variants={reveal} className="status-pill"><span /> BUILDING MY NEXT CHAPTER</motion.div>
          <motion.p variants={reveal} className="intro-line">Hello there, I’m</motion.p>
          <motion.h1 variants={reveal}>Akanksha<br/><span>Kumari<span className="name-period">.</span></span></motion.h1>
          <motion.div variants={reveal} className="role-line"><span className="role-bar"/> Full Stack Developer</motion.div>
          <motion.p variants={reveal} className="hero-description">I’m learning to build useful web experiences from the first interface to the backend logic. I love solving problems, experimenting with ideas, and getting better with every project.</motion.p>
          <motion.div variants={reveal} className="hero-buttons">
            <a className="button primary-button" href="#projects">Explore projects <ArrowUpRight size={17}/></a>
            <a className="button secondary-button" href="/resume.pdf" download="Akanksha-Kumari-Resume.pdf"><Download size={16}/> Download resume</a>
          </motion.div>
          <motion.div variants={reveal} className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><span/>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><span/>
            <a href={`mailto:${profile.email}`}><Mail size={16}/> Email</a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-art" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .2 }}>
          <div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-cross cross-one"/><div className="art-cross cross-two"/>
          <div className="code-window">
            <div className="window-bar"><div className="window-lights"><i/><i/><i/></div><span>developer.ts</span><span className="window-lang">TS</span></div>
            <div className="code-lines">
              <p><b>01</b><span className="code-key">const</span> <span className="code-var">developer</span> = {'{'}</p>
              <p className="indent"><b>02</b><span className="code-prop">name</span>: <span className="code-string">'Akanksha'</span>,</p>
              <p className="indent"><b>03</b><span className="code-prop">role</span>: <span className="code-string">'Full Stack'</span>,</p>
              <p className="indent"><b>04</b><span className="code-prop">curiosity</span>: <span className="code-number">Infinity</span>,</p>
              <p className="indent"><b>05</b><span className="code-prop">learning</span>: <span className="code-key">true</span></p>
              <p><b>06</b>{'}'};</p>
              <p className="code-comment"><b>07</b>// progress, not perfection ✦</p>
            </div>
          </div>
          <div className="float-tag tag-react"><span>⚛</span> React</div>
          <div className="float-tag tag-node"><Code2 size={16}/> Node.js</div>
          <div className="art-label"><span className="sparkle"><Sparkles size={15}/></span><div><strong>Curious by nature</strong><small>Learning through building</small></div></div>
          <div className="art-caption">A LITTLE BIT OF LOGIC. A LOT OF CURIOSITY.</div>
        </motion.div>
        <a href="#about" className="scroll-link"><span className="scroll-icon"/> Scroll to explore <ArrowDownRight size={14}/></a>
      </section>

      <section id="about" className="content-width section about-section">
        <SectionTitle kicker="THE PERSON BEHIND THE CODE" title={<>Curiosity is my <span>starting point.</span></>} description="A little about who I am, what I’m learning, and how I approach building."/>
        <div className="about-layout">
          <motion.div className="about-story panel" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="story-icon"><Sparkles size={21}/></div><span className="mini-label">MY APPROACH</span>
            <h3>Learn it. Build it.<br/><span>Make it better.</span></h3>
            <p>I’m a developer in the making, studying at <strong>{profile.college}</strong>. I’m interested in web development across frontend and backend, and I learn best by turning concepts into projects.</p>
            <p>Every build is a chance to understand something more deeply, improve my problem-solving, and create something useful.</p>
            <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={15}/></a>
          </motion.div>
          <motion.div className="about-facts panel" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="fact-icon"><GraduationCap size={19}/></div>
            <div className="fact"><span>EDUCATION</span><strong>{profile.college}</strong></div>
            <div className="fact"><span>ROLE</span><strong>{profile.role}</strong></div>
            <div className="fact"><span>INTERESTS</span><strong>Web development · Problem solving</strong></div>
            <div className="fact"><span>MY MANTRA</span><strong>Stay curious. Keep building.</strong></div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="content-width section">
        <SectionTitle kicker="MY CURRENT TOOLKIT" title={<>Tools I’m growing <span>with.</span></>} description="Technologies and foundations I’m working with. I’ve labelled beginner-level languages honestly."/>
        <div className="skill-grid">
          {skills.map((group, i) => <motion.article className="skill-card panel" key={group.title} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} transition={{ delay: i * .07 }}>
            <div className="skill-card-head"><div className="skill-icon"><group.icon size={20}/></div><span className="skill-index">0{i + 1}</span></div>
            <h3>{group.title}</h3><p>{group.subtitle}</p>
            <div className="skill-list">{group.items.map(item => <span key={item}>{item}</span>)}</div>
          </motion.article>)}
        </div>
      </section>

      <section id="projects" className="content-width section projects-section">
        <SectionTitle kicker="A FEW THINGS I’VE BUILT" title={<>Projects in <span>progress.</span></>} description="Real learning projects, presented without inflated claims. More details can be added as each repository is ready."/>
        <div className="project-grid">
          {projects.map((project, i) => <motion.article className={`project-card panel ${project.accent}`} key={project.n} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} transition={{ delay: i * .08 }}>
            <div className="project-card-top"><span className="project-count">{project.n} / 03</span><span className="project-art-icon"><project.icon size={24}/></span></div>
            <span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p>
            <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="project-card-bottom">{project.url ? <a href={project.url} target="_blank" rel="noreferrer">View repository <ExternalLink size={15}/></a> : <span className="muted-project-link">{project.status}</span>}{project.url && <ArrowUpRight size={17}/>}</div>
          </motion.article>)}
        </div>
        <div className="project-footnote"><span className="footnote-mark">i</span> Repository links are only included where a URL was provided. Add your actual URL Shortener repository when it’s ready.</div>
      </section>

      <section id="contact" className="content-width section contact-section">
        <div className="contact-layout">
          <motion.div className="contact-copy" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Eyebrow>LET’S START A CONVERSATION</Eyebrow>
            <h2>Good things<br/>start with <span>hello.</span></h2>
            <p>Want to connect, talk about a project, or share an opportunity? Send a message or reach me directly by email.</p>
            <a className="email-card" href={`mailto:${profile.email}`}><span className="email-icon"><Mail size={18}/></span><span><small>DROP ME AN EMAIL</small><strong>{profile.email}</strong></span><ArrowUpRight size={17}/></a>
            <div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={13}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={13}/></a></div>
          </motion.div>
          <motion.form className="contact-form panel" onSubmit={handleSubmit} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: .1 }}>
            <div className="form-heading"><div><span className="mini-label">CONTACT FORM</span><h3>Send a message</h3></div><span className="form-send-icon"><Send size={18}/></span></div>
            <label>Your name<input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Jane Doe" minLength={2} maxLength={80} required/></label>
            <label>Email address<input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="jane@example.com" maxLength={120} required/></label>
            <label>Your message<textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="What would you like to talk about?" minLength={10} maxLength={2000} rows={4} required/></label>
            <button className="button primary-button submit-button" type="submit" disabled={formState.status === 'loading'}>{formState.status === 'loading' ? 'Sending…' : 'Send message'} <ArrowRight size={16}/></button>
            {formState.status !== 'idle' && formState.message && <p className={`form-feedback ${formState.status}`} role="status">{formState.status === 'success' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>} {formState.message}</p>}
            <p className="form-disclaimer">Messages are handled by the portfolio API. Database saving requires MongoDB to be configured.</p>
          </motion.form>
        </div>
      </section>
    </main>

    <footer className="footer content-width">
      <a className="wordmark footer-wordmark" href="#top"><span className="wordmark-icon">a<span>.</span></span><span>AKANKSHA KUMARI</span></a>
      <span className="footer-note">Built with curiosity <span>✦</span></span>
      <div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17}/></a></div>
      <span className="copyright">© {new Date().getFullYear()} Akanksha Kumari</span>
    </footer>
  </div>
}
export default App
