import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Upload, Download, Sparkles } from 'lucide-react'
import Hero3D from '../components/Hero3D'

const Home = () => {
  const features = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: 'Upload Text & Images',
      description: 'Simply upload your text descriptions and reference images to get started.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'AI-Powered Generation',
      description: 'Our advanced AI converts your inputs into stunning 3D models instantly.'
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: 'Download & Use',
      description: 'Get your 3D models in various formats ready for AR/VR applications.'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Transform Ideas</span>
              <br />
              <span className="text-white">Into 3D Reality</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Convert your text descriptions and images into stunning 3D models using cutting-edge AI technology. Perfect for AR/VR applications, games, and digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/generator" className="btn-primary flex items-center space-x-2">
                <span>Start Creating</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link to="/gallery" className="btn-secondary flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>View Gallery</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three simple steps to transform your ideas into 3D models
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-effect p-8 rounded-2xl card-hover"
              >
                <div className="text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect p-12 rounded-3xl"
          >
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Ready to Create Amazing 3D Models?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who are already transforming their ideas into reality.
            </p>
            <Link to="/generator" className="btn-primary inline-flex items-center space-x-2">
              <span>Get Started Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home