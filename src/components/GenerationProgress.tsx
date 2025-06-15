import React from 'react'
import { motion } from 'framer-motion'
import { Loader2, Zap, Image, Cuboid as Cube, Sparkles } from 'lucide-react'

interface GenerationProgressProps {
  progress: number
  stage?: string
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ progress, stage }) => {
  const getProgressMessage = (progress: number, stage?: string) => {
    if (stage) return stage
    
    if (progress < 10) return 'Initializing generation...'
    if (progress < 25) return 'Processing your input...'
    if (progress < 40) return 'Understanding the description...'
    if (progress < 60) return 'Analyzing reference images...'
    if (progress < 80) return 'Generating 3D geometry...'
    if (progress < 95) return 'Adding textures and materials...'
    return 'Finalizing your model...'
  }

  const getStageIcon = (progress: number) => {
    if (progress < 25) return <Zap className="h-6 w-6" />
    if (progress < 50) return <Image className="h-6 w-6" />
    if (progress < 75) return <Cube className="h-6 w-6" />
    return <Sparkles className="h-6 w-6" />
  }

  return (
    <div className="h-96 flex flex-col items-center justify-center space-y-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        <Loader2 className="h-20 w-20 text-primary-400" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-primary-300"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {getStageIcon(progress)}
        </motion.div>
      </motion.div>
      
      <div className="text-center space-y-6 max-w-md">
        <h3 className="text-3xl font-bold text-white">
          Creating Your 3D Model
        </h3>
        
        <p className="text-lg text-gray-300">
          {getProgressMessage(progress, stage)}
        </p>
        
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 h-4 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: '30%' }}
            />
          </motion.div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Progress</span>
          <span className="text-primary-300 font-semibold text-lg">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      
      <div className="loading-dots">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default GenerationProgress