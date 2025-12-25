
import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineRocketLaunch, 
  HiOutlineUserGroup, 
  HiOutlineLightBulb, 
  HiOutlineShieldCheck 
} from 'react-icons/hi2';

const About = () => {
  const stats = [
    { label: "Founded", value: "2018" },
    { label: "Properties Managed", value: "12,000+" },
    { label: "Verified Users", value: "500K" },
    { label: "Cities Covered", value: "45+" },
  ];

  const values = [
    {
      title: "Trust First",
      desc: "Every listing is manually verified by our team to ensure what you see is what you get.",
      icon: <HiOutlineShieldCheck className="w-8 h-8" />
    },
    {
      title: "Innovation",
      desc: "We use AI and virtual tours to make the remote renting process seamless and fast.",
      icon: <HiOutlineLightBulb className="w-8 h-8" />
    },
    {
      title: "Community",
      desc: "We don't just rent houses; we help you find the neighborhood where you belong.",
      icon: <HiOutlineUserGroup className="w-8 h-8" />
    }
  ];

  const team = [
    { name: "Sarah Chen", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { name: "Marcus Thorne", role: "Head of Operations", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
    { name: "Elena Rodriguez", role: "Chief Architect", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <div className="bg-white text-blue-950 pt-20">
      {/* --- HERO SECTION --- */}
      <section className="relative py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-extrabold mt-4 mb-8 leading-tight">
              Redefining <span className="text-blue-600">Modern Living</span> for Everyone.
            </h1>
            <p className="text-xl text-blue-700/80 leading-relaxed mb-8">
              Novella started with a simple idea: renting a home should be as easy as booking a hotel. No hidden fees, no fake listings, and no endless paperwork.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-blue-600 overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
                alt="Modern Office" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-blue-50 hidden md:block">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                  <HiOutlineRocketLaunch className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm text-blue-500 font-bold uppercase tracking-wider">Mission</p>
                  <p className="text-lg font-bold text-blue-900">Empowering 1M+ Renters</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STATS STRIP --- */}
      <section className="bg-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <h3 className="text-4xl font-extrabold text-white mb-2">{stat.value}</h3>
                <p className="text-blue-300 font-medium uppercase text-xs tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">The Values We Live By</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((val, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-blue-50/50 border border-blue-100 group transition-all"
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 shadow-lg mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {val.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
              <p className="text-blue-700/70 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Meet the Visionaries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <div key={i} className="group">
                <div className="relative h-96 mb-6 overflow-hidden rounded-[2.5rem] shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white text-sm italic">"Committed to excellence in housing."</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-blue-900">{member.name}</h3>
                <p className="text-blue-500 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Want to join the Novella family?</h2>
        <p className="text-blue-700/60 text-lg mb-10">
          Whether you are a landlord looking to list or a talent looking to build the future of prop-tech, we want to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            View Careers
          </button>
          <button className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all">
            Contact Support
          </button>
        </div>
      </section>

      {/* --- SIMPLE FOOTER --- */}
      <footer className="py-12 border-t border-blue-50 text-center text-blue-400 font-medium">
        <p>© {new Date().getFullYear()} Novella Inc. Built for the future of living.</p>
      </footer>
    </div>
  );
};

export default About;