import React from 'react'
import { motion } from 'framer-motion'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter your text description...',
  maxLength = 1000
}) => {
  return (
    <div className="space-y-2">
      <motion.textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={6}
        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
        whileFocus={{ scale: 1.02 }}
      />
      
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Be as descriptive as possible for better results</span>
        <span>{value.length}/{maxLength}</span>
      </div>
    </div>
  )
}

export default TextInput