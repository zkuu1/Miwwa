import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  MessageCircle, 
  Disc, 
  CheckCircle2, 
  ExternalLink,
  Calendar,
  ArrowRight
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";

import { admins, members } from "@/data/member";

export default async function Home() {
  const supabase = await createClient();

  // Fetch Projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch Events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  return (
    <main className="flex-1">

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">

        <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="relative w-64 h-64 md:w-96 md:h-96 shrink-0">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <Image
              src="/image/miwa.png"
              alt="Miiwa Character"
              fill
              className="object-contain relative z-10 drop-shadow-2xl"
              priority
            />
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-gradient leading-none">
              Miiwa
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium leading-relaxed">
              A creative unit for graphic design and editing enthusiasts to learn, share, and grow together. 
              We will open for beginners and professionals to explore ideas, improve skills, and build meaningful connections.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Button size="lg" className="rounded-full px-8 h-12 text-lg shadow-lg hover:shadow-blue-500/25 transition-all">
                Scroll Down 
              </Button>
              <a href="#project">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-lg glass-dark">
                  Our Project
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">What is <span className="text-gradient">Miiwa</span>?</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Miiwa is a unit editing amv and graphic design 
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Tagwall", desc: "Monthly public or unit tagwall event." },
              { title: "Mep Amv", desc: "Mep Amv for unit member." },
              { title: "Dedic", desc: "Make your project and share with us." },
              { title: "Learning", desc: "Communicate and share your knowledge with us." }
            ].map((item, index) => (
              <div key={index} className="glass p-8 rounded-3xl group hover:bg-white/10 transition-all duration-300">
                <div className="size-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="size-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Section (Task 5) */}
      <section id="event" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Upcoming Event <span className="text-gradient">Miiwa</span></h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Stay tuned for our latest events and join us to enhance your skills and expand your creative network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events && events.length > 0 ? (
              events.map((event: any) => (
                <div key={event.id} className="glass rounded-[2.5rem] p-8 flex flex-col group hover:bg-white/5 transition-all duration-500 border border-white/10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                      Upcoming
                    </div>
                    <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                      <Calendar className="size-4" />
                      <span className="text-sm font-medium">
                        {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors tracking-tight leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <a 
                      href={event.link || "#"} 
                      className="group/link inline-flex items-center font-bold text-white hover:text-blue-400 transition-all text-sm uppercase tracking-wider"
                    >
                      Check this out <ArrowRight className="size-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass rounded-3xl border border-white/5">
                <p className="text-muted-foreground">Belum ada event terdekat. Stay tuned!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Section (Task 4) */}
      <section id="project" className="py-32 bg-black/40 backdrop-blur-3xl border-y border-white/5 relative">
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Projects</h2>
              <p className="text-xl text-muted-foreground">Here are some of our best projects that showcase our creativity and skills.</p>
            </div>
            <Button variant="link" className="text-blue-400 p-0 text-lg group">
              See All Projects <ExternalLink className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects && projects.length > 0 ? (
              projects.map((project: any) => (
                <div key={project.id} className="glass-dark rounded-[2.5rem] overflow-hidden group hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] transition-all duration-500 border border-white/5">
                  <div className="relative h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
                        <Button variant="secondary" className="rounded-full px-6 h-11 font-bold">See Detail</Button>
                      </a>
                    </div>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/20 font-bold tracking-widest uppercase">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <a 
                      href={project.link || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-blue-400 font-bold group/link uppercase tracking-wider text-sm"
                    >
                      Explore Project<ExternalLink className="size-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass-dark rounded-3xl border border-white/5">
                <p className="text-muted-foreground">Belum ada project yang dipublikasikan.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team & Members Section (Task 11 Revision) */}
      <section id="team" className="py-32 bg-black/20">
        <div className="container mx-auto px-6">
          {/* Meet Our Admin */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter uppercase">
                Meet Our <span className="text-gradient">Admin</span>
              </h2>
              <p className="text-muted-foreground text-lg uppercase tracking-widest font-semibold opacity-50">Say hi to our admin</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
              {admins.map((admin, i) => (
                <div key={i} className="group relative">
                  <div className="relative size-40 md:size-52 rounded-full overflow-hidden border-4 border-white/5 group-hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
                    <Image
                      src={admin.image}
                      alt={admin.name}
                      fill
                      className="object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <a 
                      href={admin.link} 
                      className="absolute inset-0 bg-blue-600/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-8 text-white scale-75 group-hover:scale-100 transition-transform" />
                    </a>
                  </div>
                  <h4 className="mt-6 text-center font-bold text-lg text-white/50 group-hover:text-white transition-colors">{admin.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Meet Our Member */}
          <div>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tighter uppercase">
                Meet Our <span className="text-gradient">Member</span>
              </h2>
              <p className="text-muted-foreground text-lg uppercase tracking-widest font-semibold opacity-50">Say hi to miiwa's member</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {members.map((member, i) => (
                <div key={i} className="group relative">
                  <div className="relative size-24 md:size-32 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-blue-500/30 transition-all duration-300 shadow-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <a 
                      href={member.link} 
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                    >
                      <ExternalLink className="size-5 text-white" />
                    </a>
                  </div>
                </div>
              ))}
              <div className="size-24 md:size-32 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-muted-foreground hover:bg-white/5 cursor-pointer transition-all">
                <span className="text-sm font-bold opacity-50">+22</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6">
          <div className="glass p-12 md:p-24 rounded-[3.5rem] text-center max-w-5xl mx-auto relative overflow-hidden group border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-blue-500/5 -rotate-6 scale-125 transition-transform group-hover:rotate-0 duration-1000" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none">Follow Our <span className="text-gradient">Social Media</span>!</h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto font-medium">
                We will notify you if there is a open recruitment member or events
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  { name: "WhatsApp", icon: MessageCircle, color: "hover:bg-[#25D366]", href: "https://chat.whatsapp.com/HHDZMAfCuVeJQHbs1LYNMd?mode=gi_t" },
                  { name: "Instagram", icon: Star, color: "hover:bg-[#E4405F]", href: "https://www.instagram.com/miiwateam" },
                  { name: "Discord", icon: Disc, color: "hover:bg-[#5865F2]", href: "https://discord.gg/FVPhNrRg" }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass-dark flex items-center gap-3 px-8 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${social.color} hover:text-white border border-white/5 hover:border-transparent group/btn shadow-xl`}
                  >
                    <social.icon className="size-6 transition-colors" />
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
