"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const skillsData = {
  "Frontend": ["React.js", "Next.js", "Tailwind CSS", "JavaScript (ES6+)", "HTML/CSS3"],
  "Backend": ["Node.js", "Express.js", "RESTful APIs", "JWT Auth"],
  "Data Science": ["Python", "NumPy & Pandas", "TensorFlow", "XGBoost", "Matplotlib"],
  "Databases": ["MongoDB", "SQL & MySQL", "Power BI", "Tableau"],
};

export default function Skills() {
  return (
    <ScrollReveal animation="fadeInUp">
      <section id="skills" className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Skills & Expertise
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(skillsData).map(([category, skills], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-6">{category}</h3>
                {skills.map((skill, i) => (
                  <motion.div key={skill} initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill}</span>
                      <span className="text-red-400">{85 + Math.random() * 10 | 0}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-red-500 to-orange-500" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
