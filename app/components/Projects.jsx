"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "House Price Prediction Model",
    desc: "ML model with 85% accuracy using XGBoost",
    tags: ["Python", "XGBoost", "Data Analysis"],
    icon: "📊",
  },
  {
    title: "CognitoAI Facial Recognition",
    desc: "95% accurate real-time facial recognition system",
    tags: ["OpenCV", "Python", "MySQL"],
    icon: "👁️",
  },
  {
    title: "Deloitte Analytics Dashboard",
    desc: "Interactive dashboards for fraud detection",
    tags: ["Tableau", "Excel", "Data Analysis"],
    icon: "🔍",
  },
  {
    title: "College Website",
    desc: "99% uptime official college website",
    tags: ["React", "Node.js", "MongoDB"],
    icon: "🌐",
  },
  {
    title: "SIH 2023 Fitness App",
    desc: "National hackathon finalist AI fitness tracker",
    tags: ["React Native", "AI/ML", "Real-time"],
    icon: "💪",
  },
];

export default function Projects() {
  return (
    <ScrollReveal animation="fadeInUp">
      <section id="projects" className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-lg bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-800/50 hover:border-red-500 transition group"
              >
                <h3 className="text-2xl mb-2">{project.icon}</h3>
                <h4 className="text-xl font-bold mb-2 group-hover:text-red-400 transition">{project.title}</h4>
                <p className="text-gray-400 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
