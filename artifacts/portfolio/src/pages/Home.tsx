import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Terminal, Code2, Cpu, ExternalLink,
  Linkedin, Mail, ArrowRight, Download, Menu, X,
  Briefcase, GraduationCap, MapPin, Phone
} from "lucide-react";
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, 
  SiGithub, SiLinkedin, SiCplusplus, SiTypescript, 
  SiJavascript, SiVite, SiTailwindcss, SiVercel
} from "react-icons/si";

// You would typically import the photo here
import chiragPhoto from "@assets/chirag_nobg.png";

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? "glass py-4" : "py-6 bg-transparent"}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="font-display font-bold text-xl tracking-wider text-white" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
          CV <span className="text-primary">//</span> CHIRAG
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <Button 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-all ml-4"
            onClick={() => scrollTo('contact')}
          >
            Hire Me
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#050510]/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 flex flex-col gap-4 md:hidden">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-left text-lg font-medium text-gray-300 hover:text-white py-2"
            >
              {item}
            </button>
          ))}
          <Button 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10 w-full mt-4"
            onClick={() => scrollTo('contact')}
          >
            Hire Me
          </Button>
        </div>
      )}
    </header>
  );
};

const TypewriterText = () => {
  const words = [
    "Full Stack Developer", 
    "C++ & DSA Enthusiast", 
    "Building AI-Powered Products", 
    "Problem Solver"
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, Math.max(isDeleting ? 50 : 100, Math.random() * 150));

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  return (
    <h2 className="text-xl md:text-2xl font-mono text-gray-400 h-8">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-primary transition-opacity`}>|</span>
    </h2>
  );
};

const SectionHeading = ({ children, align = "left" }: { children: React.ReactNode, align?: "left" | "center" }) => (
  <div className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl font-display font-bold text-white relative inline-block">
      {children}
      <span className="absolute -bottom-3 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
    </h2>
  </div>
);

// --- Main Page ---

export default function Home() {
  const { toast } = useToast();
  
  // Handlers
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Background elements */}
      <div className="fixed inset-0 z-[-1] bg-grid opacity-20 pointer-events-none" />
      <div className="fixed top-[-10%] right-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-blob z-[-1] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FF3D81]/10 rounded-full blur-[150px] animate-blob animation-delay-2000 z-[-1] pointer-events-none" />

      <main className="container mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs md:text-sm text-gray-300">CSE Student · Full Stack Developer</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold leading-[1.1] tracking-tight">
              Chirag <br/>
              <span className="text-gradient">Verma.</span>
            </h1>
            
            <TypewriterText />
            
            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mt-2">
              I build fast, scalable web apps and love solving real-world problems using clean code. Always learning, always building.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-base font-medium shadow-[0_0_20px_rgba(255,0,92,0.3)] transition-all hover:shadow-[0_0_30px_rgba(255,0,92,0.5)] hover:-translate-y-1"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/5 px-8 py-6 rounded-full text-base font-medium transition-all hover:-translate-y-1"
                asChild
              >
                <a href="/resume.pdf" download="Chirag_Verma_Resume.pdf">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative flex justify-center items-center h-[500px]"
          >
            {/* Ambient glow behind photo */}
            <div className="absolute inset-0 bg-radial-gradient from-primary/30 to-transparent blur-3xl rounded-full opacity-60" />
            
            <div className="relative w-full max-w-md aspect-square animate-float z-10">
              <img 
                src={chiragPhoto} 
                alt="Chirag Verma" 
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </section>

        {/* STATS BAR */}
        <section className="py-12 border-y border-white/5 my-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/5">
            {[
              { num: "2+", label: "Years Coding" },
              { num: "Top 3", label: "Hackathon Winner" },
              { num: "10+", label: "Projects Built" },
              { num: "100%", label: "Always Learning" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center">
                <span className="text-3xl md:text-5xl font-display font-bold text-gradient mb-2">{stat.num}</span>
                <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 scroll-mt-20">
          <SectionHeading>About Me.</SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Terminal Bio */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-xl overflow-hidden bg-[#0a0a14] border border-white/10 terminal-shadow relative group"
            >
              <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs font-mono text-gray-500">chirag.ts</span>
              </div>
              <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-x-auto text-gray-300">
                <p><span className="text-primary">const</span> <span className="text-blue-400">developer</span> = {'{'}</p>
                <p className="ml-4"><span className="text-gray-400">name:</span> <span className="text-green-400">'Chirag Verma'</span>,</p>
                <p className="ml-4"><span className="text-gray-400">education:</span> <span className="text-green-400">'B.Tech CSE @ PIEMR'</span>,</p>
                <p className="ml-4"><span className="text-gray-400">focus:</span> [<span className="text-green-400">'Full Stack'</span>, <span className="text-green-400">'DSA'</span>, <span className="text-green-400">'AI'</span>],</p>
                <p className="ml-4"><span className="text-gray-400">passion:</span> <span className="text-green-400">'Building tools that matter'</span>,</p>
                <p className="ml-4"><span className="text-blue-400">execute</span>() {'{'}</p>
                <p className="ml-8 text-gray-400">// Transforming coffee into scalable solutions</p>
                <p className="ml-8">return <span className="text-green-400">`Let's build something amazing!`</span>;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'};'}</p>
                <p className="mt-4 animate-pulse">_</p>
              </div>
            </motion.div>

            {/* Journey Timeline */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:to-transparent"
            >
              {[
                { year: "2023", title: "Started Journey", desc: "Began B.Tech CSE at PIEMR, Indore. Ignited passion for programming.", icon: GraduationCap },
                { year: "2024", title: "Hackathon Winner", desc: "Won 2nd Runner-up at Urjotsav 2024. Built a full-stack College Management System.", icon: Briefcase },
                { year: "2025", title: "Deep Dive", desc: "Mastering TypeScript, Advanced DSA, and exploring AI-powered product development.", icon: Code2 },
                { year: "2027", title: "Future Vision", desc: "Expected Graduation. Ready to impact the tech industry globally.", icon: Cpu },
              ].map((item, i) => (
                <div key={i} className="relative flex items-start gap-6 md:justify-center group">
                  <div className="hidden md:flex flex-1 justify-end text-right">
                    {i % 2 === 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400 mt-1 max-w-sm">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative z-10 w-10 h-10 flex items-center justify-center bg-[#090915] border border-primary rounded-full shadow-[0_0_10px_rgba(255,0,92,0.2)] group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                    <item.icon className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  
                  <div className="flex-1 md:hidden">
                    <span className="text-xs font-mono text-primary mb-1 block">{item.year}</span>
                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                  </div>
                  
                  <div className="hidden md:flex flex-1 text-left">
                    {i % 2 !== 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400 mt-1 max-w-sm">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 scroll-mt-20">
          <SectionHeading align="center">Technical Arsenal.</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Languages", items: [
                { name: "C++", icon: SiCplusplus, color: "text-blue-500" },
                { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
                { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
                { name: "C#", icon: Code2, color: "text-purple-500" },
              ]},
              { title: "Frameworks", items: [
                { name: "React", icon: SiReact, color: "text-cyan-400" },
                { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
                { name: "Express", icon: SiExpress, color: "text-gray-300" },
                { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
              ]},
              { title: "Tools & DB", items: [
                { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
                { name: "Git", icon: SiGithub, color: "text-orange-500" },
                { name: "Vite", icon: SiVite, color: "text-purple-400" },
                { name: "Vercel", icon: SiVercel, color: "text-white" },
              ]},
              { title: "Focus Areas", items: [
                { name: "Data Structures", icon: Code2, color: "text-primary" },
                { name: "Algorithms", icon: Cpu, color: "text-primary" },
                { name: "Full Stack", icon: Terminal, color: "text-primary" },
                { name: "AI Integration", icon: Briefcase, color: "text-primary" },
              ]},
            ].map((category, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-colors group"
              >
                <h3 className="text-xl font-display font-semibold text-white mb-6 group-hover:text-primary transition-colors">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((skill, j) => (
                    <div key={j} className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors cursor-default">
                      <skill.icon className={`w-4 h-4 ${skill.color}`} />
                      <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 scroll-mt-20">
          <SectionHeading>Selected Works.</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "College Management System",
                desc: "A dynamic full-stack platform built with a team to manage academic and administrative tasks. Features student & teacher login/signup, marks display, feedback section, and informational pages — About College, Placements, and Contact Us.",
                tech: ["MongoDB", "Express.js", "React", "Node.js"],
                featured: true,
                demo: "#",
                color: "from-emerald-500/20 to-teal-900/20",
                highlights: ["Student & Teacher Portals", "Marks Display", "Feedback System", "Responsive Design"]
              },
              {
                title: "Proximity Chat App",
                desc: "A real-time chat application where users can connect and communicate with others nearby based on their location. Enables spontaneous local conversations with live messaging and proximity-based discovery.",
                tech: ["JavaScript", "Node.js", "WebSockets", "Geolocation API"],
                featured: true,
                demo: "#",
                color: "from-violet-500/20 to-indigo-900/20",
                highlights: ["Real-time Messaging", "Location-based", "Nearby Discovery", "Live Updates"]
              },
              {
                title: "Personal Portfolio",
                desc: "This portfolio — designed and built from scratch with a premium dark theme, custom animations, background-removed photo integration, and interactive sections including skills, timeline, and contact form.",
                tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
                featured: false,
                demo: "#",
                color: "from-primary/20 to-purple-900/20",
                highlights: ["Custom Cursor", "Scroll Animations", "3D Tilt Cards", "Responsive"]
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                <div className="h-full bg-[#0a0a14] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_10px_40px_rgba(255,0,92,0.15)] flex flex-col hover:-translate-y-2">
                  
                  {/* Image Placeholder */}
                  <div className={`h-48 w-full bg-gradient-to-br ${project.color} relative border-b border-white/5 flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <Terminal className="w-12 h-12 text-white/20" />
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                      <a href="https://www.linkedin.com/in/chirag-verma-cse" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                      <a href={project.demo} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium ml-auto">
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="py-24">
          <SectionHeading>Certifications.</SectionHeading>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "2nd Runner-up — Urjotsav 2024", issuer: "PIEMR Website Competition", date: "2024", highlight: true },
              { title: "Object-Oriented Programming Onramp", issuer: "MathWorks", date: "Jan 2025" },
              { title: "Introduction to GitHub", issuer: "Microsoft", date: "Jan 2025" },
              { title: "MEAN Stack Web Development", issuer: "Infosys Springboard", date: "Jan 2025" },
              { title: "Building Blocks with C++", issuer: "Infosys Springboard", date: "Jan 2025" },
              { title: "Time Management", issuer: "Infosys Springboard", date: "Jun 2024" },
            ].map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-xl border ${cert.highlight ? 'bg-primary/5 border-primary/30' : 'bg-white/5 border-white/5'} flex items-start gap-4 hover:bg-white/10 transition-colors`}
              >
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${cert.highlight ? 'bg-primary shadow-[0_0_10px_#FF005C]' : 'bg-gray-500'}`} />
                <div>
                  <h4 className={`font-bold ${cert.highlight ? 'text-white' : 'text-gray-200'}`}>{cert.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-sm">
                    <span className="text-gray-400">{cert.issuer}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="font-mono text-primary/80">{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 scroll-mt-20">
          <div className="bg-[#0a0a14] border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            {/* Background elements for contact box */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
            
            <div className="grid md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Let's Build <br/><span className="text-gradient">Something.</span></h2>
                <p className="text-gray-400 mb-10 text-lg">
                  Currently looking for new opportunities and interesting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                
                <div className="space-y-6">
                  <a href="mailto:chiragverma344@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors w-fit">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                      <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium group-hover:underline decoration-primary underline-offset-4">chiragverma344@gmail.com</p>
                    </div>
                  </a>
                  
                  <a href="tel:+919039096970" className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors w-fit">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                      <Phone className="w-5 h-5 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-mono group-hover:underline decoration-primary underline-offset-4">+91 9039096970</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-4 pt-4">
                    <a href="https://www.linkedin.com/in/chirag-verma-cse" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-primary hover:text-primary transition-all hover:-translate-y-1">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 p-8 rounded-2xl border border-white/5">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Name</label>
                    <Input required placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:border-primary text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Email</label>
                    <Input required type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 focus-visible:border-primary text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Message</label>
                    <Textarea required placeholder="What's on your mind?" className="bg-white/5 border-white/10 focus-visible:border-primary text-white min-h-[120px] resize-none" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 rounded-xl mt-4 group">
                    Send Message 
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 mt-10">
        <div className="container mx-auto px-6 text-center md:flex justify-between items-center">
          <p className="text-gray-500 font-mono text-sm mb-4 md:mb-0">
            Designed & Built by <span className="text-white">Chirag Verma</span> · 2025
          </p>
          <div className="text-sm text-gray-500 font-mono flex items-center justify-center gap-2">
            Made with <SiReact className="text-cyan-400" /> + <SiVite className="text-purple-400" />
          </div>
        </div>
      </footer>
    </div>
  );
}
