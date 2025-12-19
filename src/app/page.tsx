'use client'

import { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check } from 'lucide-react'
import JsonTreeView, { JsonValue } from '@/components/json-tree-view'

type Tab = 'json' | 'text'

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('json')

  const [jsonInput, setJsonInput] = useState<string>('')
  const [jsonOutput, setJsonOutput] = useState<string>('')
  const [jsonParsed, setJsonParsed] = useState<JsonValue | null>(null)
  const [jsonError, setJsonError] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput) as JsonValue
      setJsonParsed(parsed)
      setJsonOutput(JSON.stringify(parsed, null, 2))
      setJsonError('')
    } catch (err: unknown) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON')
      setJsonParsed(null)
      setJsonOutput('')
    }
  }

  const copyJSON = async () => {
    if (!jsonOutput) return
    await navigator.clipboard.writeText(jsonOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!mounted) return null

  return (
    <div className="container mx-auto p-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)}>
        <TabsList>
          <TabsTrigger value="json">Tree</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          <Textarea
            placeholder="Paste JSON here"
            value={jsonInput}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setJsonInput(e.target.value)
            }
            className="min-h-[200px]"
          />

          <div className="flex gap-2">
            <Button onClick={formatJSON}>Format</Button>
            <Button variant="outline" onClick={copyJSON} disabled={!jsonOutput}>
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>

          {jsonError && <p className="text-red-500">{jsonError}</p>}

          <TabsContent value="text">
            {jsonOutput && <Textarea readOnly value={jsonOutput} />}
          </TabsContent>

          <TabsContent value="json">
            <JsonTreeView data={jsonParsed} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
