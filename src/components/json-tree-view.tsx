'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

const JsonTreeView = ({ data }) => {
  return (
    <div className="font-mono text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
      <JsonNode data={data} name="root" isRoot={true} />
    </div>
  )
}

const JsonNode = ({ data, name, isRoot = false, isLast = true }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  
  const toggleExpand = () => setIsExpanded(!isExpanded)
  
  const getDataType = (value) => {
    if (value === null) return 'null'
    if (Array.isArray(value)) return 'array'
    return typeof value
  }
  
  const getItemCount = (value) => {
    if (Array.isArray(value)) return value.length
    if (typeof value === 'object' && value !== null) return Object.keys(value).length
    return 0
  }
  
  const dataType = getDataType(data)
  const itemCount = getItemCount(data)
  
  // Render primitive values
  if (dataType === 'string') {
    return (
      <div className="flex items-start gap-2">
        <span className="text-muted-foreground min-w-0 flex-shrink-0">{!isRoot && `${name}: `}</span>
        <span className="text-green-600 dark:text-green-400 break-all">"{data}"</span>
        {!isLast && <span className="text-muted-foreground">,</span>}
      </div>
    )
  }
  
  if (dataType === 'number') {
    return (
      <div className="flex items-start gap-2">
        <span className="text-muted-foreground min-w-0 flex-shrink-0">{!isRoot && `${name}: `}</span>
        <span className="text-blue-600 dark:text-blue-400">{data}</span>
        {!isLast && <span className="text-muted-foreground">,</span>}
      </div>
    )
  }
  
  if (dataType === 'boolean') {
    return (
      <div className="flex items-start gap-2">
        <span className="text-muted-foreground min-w-0 flex-shrink-0">{!isRoot && `${name}: `}</span>
        <span className="text-purple-600 dark:text-purple-400">{data.toString()}</span>
        {!isLast && <span className="text-muted-foreground">,</span>}
      </div>
    )
  }
  
  if (dataType === 'null') {
    return (
      <div className="flex items-start gap-2">
        <span className="text-muted-foreground min-w-0 flex-shrink-0">{!isRoot && `${name}: `}</span>
        <span className="text-gray-500 dark:text-gray-400">null</span>
        {!isLast && <span className="text-muted-foreground">,</span>}
      </div>
    )
  }
  
  // Render objects and arrays
  const isArray = dataType === 'array'
  const entries = isArray ? data.map((item, idx) => [idx, item]) : Object.entries(data)
  const openBracket = isArray ? '[' : '{'
  const closeBracket = isArray ? ']' : '}'
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 group">
        <button
          onClick={toggleExpand}
          className="hover:bg-muted-foreground/10 rounded p-0.5 transition-colors flex-shrink-0"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <span className="text-muted-foreground min-w-0 flex-shrink-0">
          {!isRoot && `${name}: `}
        </span>
        <span className="text-foreground">{openBracket}</span>
        {!isExpanded && (
          <>
            <span className="text-muted-foreground text-xs ml-1">
              {itemCount} {isArray ? 'items' : 'properties'}
            </span>
            <span className="text-foreground ml-1">{closeBracket}</span>
          </>
        )}
        {isExpanded && itemCount > 0 && (
          <span className="text-muted-foreground text-xs ml-1 opacity-60">
            {itemCount} {isArray ? 'items' : 'properties'}
          </span>
        )}
      </div>
      
      {isExpanded && (
        <div className="ml-6 border-l-2 border-muted-foreground/20 pl-2">
          {entries.map(([key, value], index) => (
            <JsonNode
              key={key}
              data={value}
              name={key}
              isLast={index === entries.length - 1}
            />
          ))}
          <div className="text-foreground">{closeBracket}{!isLast && ','}</div>
        </div>
      )}
    </div>
  )
}

export default JsonTreeView
