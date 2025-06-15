import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Eye } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  description: string
  thumbnail: string
  modelUrl: string
  tags: string[]
  downloads: number
  likes: number
}

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data - in a real app, this would come from an API
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Futuristic Spaceship',
      description: 'A sleek spaceship with glowing blue engines',
      thumbnail: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=400',
      modelUrl: '/models/spaceship.glb',
      tags: ['spaceship', 'futuristic', 'sci-fi'],
      downloads: 1250,
      likes: 89
    },
    {
      id: '2',
      title: 'Medieval Castle',
      description: 'A detailed medieval castle with towers and walls',
      thumbnail: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=400',
      modelUrl: '/models/castle.glb',
      tags: ['castle', 'medieval', 'architecture'],
      downloads: 980,
      likes: 67
    },
    {
      id: '3',
      title: 'Modern Car',
      description: 'A sleek modern sports car with realistic details',
      thumbnail: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400',
      modelUrl: '/models/car.glb',
      tags: ['car', 'vehicle', 'modern'],
      downloads: 2100,
      likes: 156
    },
    {
      id: '4',
      title: 'Fantasy Dragon',
      description: 'A majestic dragon with detailed scales and wings',
      thumbnail: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400',
      modelUrl: '/models/dragon.glb',
      tags: ['dragon', 'fantasy', 'creature'],
      downloads: 1800,
      likes: 234
    },
    {
      id: '5',
      title: 'Robot Companion',
      description: 'A friendly robot with articulated joints',
      thumbnail: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
      modelUrl: '/models/robot.glb',
      tags: ['robot', 'ai', 'companion'],
      downloads: 1450,
      likes: 112
    },
    {
      id: '6',
      title: 'Ancient Temple',
      description: 'A mystical ancient temple with intricate carvings',
      thumbnail: 'https://images.pexels.com/photos/161815/temple-buddhist-asian-oriental-161815.jpeg?auto=compress&cs=tinysrgb&w=400',
      modelUrl: '/models/temple.glb',
      tags: ['temple', 'ancient', 'architecture'],
      downloads: 890,
      likes: 78
    }
  ]

  const categories = ['all', 'vehicles', 'architecture', 'creatures', 'sci-fi', 'fantasy']

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || 
                           item.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            3D Model Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore amazing 3D models created by our community
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-effect p-6 rounded-2xl mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="glass-effect rounded-2xl overflow-hidden card-hover group"
            >
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Eye className="h-5 w-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <Download className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{item.downloads.toLocaleString()} downloads</span>
                  <span>{item.likes} likes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">No models found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Gallery