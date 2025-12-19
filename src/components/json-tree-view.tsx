'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

/* -------------------- Types -------------------- */

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

interface JsonTreeViewProps {
  data: JsonValue | null
}

interface JsonNodeProps {
  data: JsonValue
  name: string | number
  isRoot?: boolean
  isLast?: boolean
}

/* -------------------- Tree View -------------------- */

export default function JsonTreeView({ data }: JsonTreeViewProps) {
  if (data === null) return null

  return (
    <div className="font-mono text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
      <JsonNode data={data} name="root" isRoot />
    </div>
  )
}

/* -------------------- Node -------------------- */

function JsonNode({
  data,
  name,
  isRoot = false,
  isLast = true,
}: JsonNodeProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  const toggleExpand = () => setIsExpanded((prev) => !prev)

  const isArray = Array.isArray(data)
  const isObject = typeof data === 'object' && data !== null && !isArray

  /* ---------- Primitive ---------- */

  if (typeof data === 'string') {
    return (
      <div className="flex gap-2">
        {!isRoot && <span className="text-muted-foreground">{name}:</span>}
        <span className="text-green-600">"{data}"</span>
        {!isLast && <span>,</span>}
      </div>
    )
  }

  if (typeof data === 'number') {
    return (
      <div className="flex gap-2">
        {!isRoot && <span className="text-muted-foreground">{name}:</span>}
        <span className="text-blue-600">{data}</span>
        {!isLast && <span>,</span>}
      </div>
    )
  }

  if (typeof data === 'boolean') {
    return (
      <div className="flex gap-2">
        {!isRoot && <span className="text-muted-foreground">{name}:</span>}
        <span className="text-purple-600">{data.toString()}</span>
        {!isLast && <span>,</span>}
      </div>
    )
  }

  if (data === null) {
    return (
      <div className="flex gap-2">
        {!isRoot && <span className="text-muted-foreground">{name}:</span>}
        <span className="text-gray-500">null</span>
        {!isLast && <span>,</span>}
      </div>
    )
  }

  /* ---------- Object / Array ---------- */

  const entries: [string | number, JsonValue][] = isArray
    ? (data as JsonValue[]).map((v, i) => [i, v])
    : Object.entries(data as Record<string, JsonValue>)

  const open = isArray ? '[' : '{'
  const close = isArray ? ']' : '}'

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <button onClick={toggleExpand}>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {!isRoot && <span className="text-muted-foreground">{name}:</span>}
        <span>{open}</span>
        {!isExpanded && (
          <span className="text-muted-foreground ml-1">
            {entries.length} items
          </span>
        )}
      </div>

      {isExpanded && (
        <div className="ml-6 border-l pl-2">
          {entries.map(([k, v], i) => (
            <JsonNode
              key={String(k)}
              data={v}
              name={k}
              isLast={i === entries.length - 1}
            />
          ))}
          <div>
            {close}
            {!isLast && ','}
          </div>
        </div>
      )}
    </div>
  )
}
