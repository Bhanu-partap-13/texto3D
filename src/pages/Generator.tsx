import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Wand2, Download } from 'lucide-react'
import FileUpload from '../components/FileUpload'
import TextInput from '../components/TextInput'
import ModelPreview from '../components/ModelPreview'
import GenerationProgress from '../components/GenerationProgress'
import { backendApi, TaskResponse } from '../services/meshyApi'

interface GenerationData {
  text: string
  images: File[]
  status: 'idle' | 'generating' | 'completed' | 'error'
  progress: number
  stage?: string
  modelUrl?: string
  thumbnailUrl?: string
  error?: string
}

const Generator = () => {
  const [generationData, setGenerationData] = useState<GenerationData>({
    text: '',
    images: [],
    status: 'idle',
    progress: 0,
  })

  const handleGenerate = async () => {
    if (!generationData.text.trim() && generationData.images.length === 0) {
      setGenerationData(prev => ({
        ...prev,
        status: 'error',
        error: 'Please provide either text description or upload images'
      }))
      return
    }
    try {
      setGenerationData(prev => ({
        ...prev,
        status: 'generating',
        progress: 0,
        error: undefined,
        stage: 'Starting generation...'
      }))
      const result: TaskResponse = await backendApi.generate3DModel(
        generationData.text,
        generationData.images[0]
      )
      setGenerationData(prev => ({
        ...prev,
        status: 'completed',
        progress: 100,
        modelUrl: result.glb_download,
        stage: 'Generation complete!'
      }))
    } catch (error: any) {
      setGenerationData(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Generation failed. Please try again.'
      }))
    }
  }

  const handleDownload = () => {
    if (generationData.modelUrl) {
      const link = document.createElement('a')
      link.href = generationData.modelUrl
      link.download = 'generated-model.glb'
      link.click()
    }
  }

  const handleReset = () => {
    setGenerationData({
      text: '',
      images: [],
      status: 'idle',
      progress: 0,
    })
  }

  const canGenerate = (generationData.text.trim() || generationData.images.length > 0) &&
    generationData.status !== 'generating'

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div className="glass-effect p-6 rounded-2xl mb-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Text & Image to 3D Model Generator</h1>
          <TextInput
            value={generationData.text}
            onChange={text => setGenerationData(prev => ({ ...prev, text }))}
            disabled={generationData.status === 'generating'}
          />
          <FileUpload
            files={generationData.images}
            onChange={images => setGenerationData(prev => ({ ...prev, images }))}
            disabled={generationData.status === 'generating'}
          />
          <div className="flex space-x-3 mt-6">
            <motion.button
              onClick={handleGenerate}
              disabled={!canGenerate}
              whileHover={{ scale: canGenerate ? 1.02 : 1 }}
              whileTap={{ scale: canGenerate ? 0.98 : 1 }}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                canGenerate
                  ? 'btn-primary'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Wand2 className="h-6 w-6" />
              <span>
                {generationData.status === 'generating' ? 'Generating...' : 'Generate 3D Model'}
              </span>
            </motion.button>
            {(generationData.status === 'completed' || generationData.status === 'error') && (
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all"
              >
                Reset
              </motion.button>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-effect p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">3D Model Preview</h2>
          {generationData.status === 'idle' && (
            <div className="h-96 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Upload className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Your 3D model will appear here</p>
                <p className="text-sm mt-2">Add text description or upload an image to get started</p>
              </div>
            </div>
          )}
          {generationData.status === 'generating' && (
            <GenerationProgress
              progress={generationData.progress}
              stage={generationData.stage}
            />
          )}
          {generationData.status === 'completed' && (
            <div className="space-y-4">
              <ModelPreview
                modelUrl={generationData.modelUrl}
                thumbnailUrl={generationData.thumbnailUrl}
              />
              <div className="flex space-x-3">
                <motion.button
                  onClick={handleDownload}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                  disabled={!generationData.modelUrl}
                >
                  <Download className="h-5 w-5" />
                  <span>Download GLB</span>
                </motion.button>
              </div>
            </div>
          )}
          {generationData.status === 'error' && (
            <div className="h-96 flex items-center justify-center text-red-400">
              <div className="text-center">
                <p className="text-lg">{generationData.error || 'Generation failed.'}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Generator