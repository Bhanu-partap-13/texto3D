import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Users, Globe, Award } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: <Users className="h-8 w-8" />, value: '10K+', label: 'Active Users' },
    { icon: <Zap className="h-8 w-8" />, value: '50K+', label: 'Models Generated' },
    { icon: <Globe className="h-8 w-8" />, value: '100+', label: 'Countries' },
    { icon: <Award className="h-8 w-8" />, value: '99%', label: 'Success Rate' }
  ]

  const features = [
    {
      title: 'Advanced AI Technology',
      description: 'Our cutting-edge AI algorithms can understand complex text descriptions and visual references to create accurate 3D models.'
    },
    {
      title: 'Multiple Input Methods',
      description: 'Support for text descriptions, reference images, or a combination of both to give you maximum creative control.'
    },
    {
      title: 'High-Quality Output',
      description: 'Generate production-ready 3D models in various formats suitable for games, AR/VR, and professional applications.'
    },
    {
      title: 'Fast Processing',
      description: 'Our optimized pipeline ensures quick generation times without compromising on quality.'
    }
  ]

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            About AR/VR Marketplace
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing 3D content creation by making it accessible to everyone. 
            Our AI-powered platform transforms your ideas into stunning 3D models in minutes, not hours.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-effect p-6 rounded-2xl text-center">
              <div className="text-primary-400 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect p-12 rounded-3xl mb-20"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We believe that 3D content creation should be accessible to everyone, regardless of technical expertise. 
              Our mission is to democratize 3D modeling by providing powerful AI tools that transform simple text 
              descriptions and images into professional-quality 3D models. Whether you're a game developer, 
              architect, educator, or creative enthusiast, we're here to bring your ideas to life.
            </p>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-effect p-8 rounded-2xl"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect p-12 rounded-3xl"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Our platform leverages state-of-the-art machine learning models trained on millions of 3D assets 
              and their corresponding descriptions. We use advanced neural networks for text understanding, 
              computer vision for image analysis, and generative AI for 3D model creation.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-400 mb-2">NLP</div>
                <div className="text-gray-300">Natural Language Processing</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-400 mb-2">CV</div>
                <div className="text-gray-300">Computer Vision</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-400 mb-2">3D Gen</div>
                <div className="text-gray-300">3D Generation AI</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About