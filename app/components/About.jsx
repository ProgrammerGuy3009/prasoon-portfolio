"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { label: "Projects", value: 5 },
  { label: "Internships", value: 2 },
  { label: "Years Exp", value: 3 },
  { label: "Clients", value: 50 },
];

export default function About() {
  return (
    <ScrollReveal animation="fadeInUp">
      <section id="about" className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            About Me
          </motion.h2>

          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto text-center">
            I'm a passionate full-stack developer and data analyst with a BCA in Data Science. I love building beautiful, interactive web applications and turning raw data into meaningful insights.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-red-500 mb-2"
                  initial={{ count: 0 }}
                  whileInView={{ count: stat.value }}
                  transition={{ duration: 1 }}
                  onViewportEnter={() => {}}
                >
                  {stat.value}+
                </motion.h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
