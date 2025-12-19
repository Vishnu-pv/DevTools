'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Moon, Sun, Code, Type, Copy, Download, Share2, Check, AlertCircle, FileText, Network } from 'lucide-react'
import { useTheme } from 'next-themes'
import JsonTreeView from '@/components/json-tree-view'

export default function App() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  // JSON Beautifier State
  const [jsonInput, setJsonInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [jsonParsed, setJsonParsed] = useState(null)
  const [jsonError, setJsonError] = useState('')
  const [jsonCopied, setJsonCopied] = useState(false)
  const [jsonViewMode, setJsonViewMode] = useState('text') // 'text' or 'tree'

  // Character Counter State
  const [charInput, setCharInput] = useState('')
  const [charCopied, setCharCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // JSON Beautifier Functions
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed, null, 2))
      setJsonParsed(parsed)
      setJsonError('')
 } catch (error: unknown) {
  if (error instanceof Error) {
    setJsonError('Invalid JSON: ' + error.message)
  } else {
    setJsonError('Invalid JSON')
  }
  setJsonOutput('')
  setJsonParsed(null)
}
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonOutput(JSON.stringify(parsed))
      setJsonParsed(parsed)
      setJsonError('')
} catch (error: unknown) {
  if (error instanceof Error) {
    setJsonError('Invalid JSON: ' + error.message)
  } else {
    setJsonError('Invalid JSON')
  }
  setJsonOutput('')
  setJsonParsed(null)
}
  }

  const copyJSON = async () => {
    if (jsonOutput) {
      await navigator.clipboard.writeText(jsonOutput)
      setJsonCopied(true)
      setTimeout(() => setJsonCopied(false), 2000)
    }
  }

  const downloadJSON = () => {
    if (jsonOutput) {
      const blob = new Blob([jsonOutput], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'formatted.json'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const shareJSON = async () => {
    if (navigator.share && jsonOutput) {
      try {
        await navigator.share({
          title: 'Formatted JSON',
          text: jsonOutput
        })
      } catch (error) {
        // Fallback to copy
        copyJSON()
      }
    } else {
      copyJSON()
    }
  }

  // Character Counter Functions
  const getCharStats = () => {
    const totalChars = charInput.length
    const withoutSpaces = charInput.replace(/\s/g, '').length
    const words = charInput.trim() ? charInput.trim().split(/\s+/).length : 0
    const commaItems = charInput ? charInput.split(',').filter(item => item.trim()).length : 0
    
    return { totalChars, withoutSpaces, words, commaItems }
  }

  const copyCharStats = async () => {
    const stats = getCharStats()
    const text = `Total Characters: ${stats.totalChars}\nWithout Spaces: ${stats.withoutSpaces}\nWords: ${stats.words}\nComma-Separated Items: ${stats.commaItems}`
    await navigator.clipboard.writeText(text)
    setCharCopied(true)
    setTimeout(() => setCharCopied(false), 2000)
  }

  const downloadCharStats = () => {
    const stats = getCharStats()
    const text = `Character Counter Results\n\nInput Text:\n${charInput}\n\nStatistics:\nTotal Characters: ${stats.totalChars}\nWithout Spaces: ${stats.withoutSpaces}\nWords: ${stats.words}\nComma-Separated Items: ${stats.commaItems}`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'character-stats.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareCharStats = async () => {
    const stats = getCharStats()
    const text = `Total Characters: ${stats.totalChars}\nWithout Spaces: ${stats.withoutSpaces}\nWords: ${stats.words}\nComma-Separated Items: ${stats.commaItems}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Character Count',
          text: text
        })
      } catch (error) {
        copyCharStats()
      }
    } else {
      copyCharStats()
    }
  }

  if (!mounted) {
    return null
  }

  const stats = getCharStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">DevToolbox</h1>
              <p className="text-xs text-muted-foreground">Developer Utilities</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="char">Counter</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-8">
            <div className="text-center space-y-4 py-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Welcome to DevToolbox
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A collection of essential developer utilities to boost your productivity.
                Fast, simple, and always available.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* JSON Beautifier Card */}
              <Card 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-purple-500/50"
                onClick={() => setActiveTab('json')}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>JSON Beautifier</CardTitle>
                  <CardDescription>
                    Format, validate, and minify JSON data with ease
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Validate JSON syntax</li>
                    <li>✓ Format with indentation</li>
                    <li>✓ Minify for production</li>
                    <li>✓ Copy, download & share</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Character Counter Card */}
              <Card 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-500/50"
                onClick={() => setActiveTab('char')}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                    <Type className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Character Counter</CardTitle>
                  <CardDescription>
                    Count characters, words, and comma-separated items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Total character count</li>
                    <li>✓ Count without spaces</li>
                    <li>✓ Word counter</li>
                    <li>✓ Comma-separated items</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Coming Soon */}
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-4">More tools coming soon...</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-muted text-xs">Base64 Encoder</span>
                <span className="px-3 py-1 rounded-full bg-muted text-xs">URL Encoder</span>
                <span className="px-3 py-1 rounded-full bg-muted text-xs">Hash Generator</span>
                <span className="px-3 py-1 rounded-full bg-muted text-xs">Color Converter</span>
              </div>
            </div>
          </TabsContent>

          {/* JSON Beautifier Tab */}
          <TabsContent value="json" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>JSON Beautifier & Validator</CardTitle>
                <CardDescription>Paste your JSON below to format, validate, or minify</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input JSON</label>
                  <Textarea
                    placeholder='Paste your JSON here... e.g. {"name":"John","age":30}'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button onClick={formatJSON} className="bg-gradient-to-r from-purple-500 to-purple-600">
                    <Code className="w-4 h-4 mr-2" />
                    Format
                  </Button>
                  <Button onClick={minifyJSON} variant="outline">
                    Minify
                  </Button>
                  <div className="flex-1" />
                  <Button 
                    onClick={copyJSON} 
                    variant="outline"
                    disabled={!jsonOutput}
                  >
                    {jsonCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {jsonCopied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button 
                    onClick={downloadJSON} 
                    variant="outline"
                    disabled={!jsonOutput}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    onClick={shareJSON} 
                    variant="outline"
                    disabled={!jsonOutput}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {jsonError && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-destructive">Error</p>
                      <p className="text-sm text-destructive/80">{jsonError}</p>
                    </div>
                  </div>
                )}

                {jsonOutput && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Formatted Output</label>
                      <div className="flex gap-1 bg-muted rounded-lg p-1">
                        <Button
                          size="sm"
                          variant={jsonViewMode === 'text' ? 'default' : 'ghost'}
                          onClick={() => setJsonViewMode('text')}
                          className="h-7 px-3"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Text
                        </Button>
                        <Button
                          size="sm"
                          variant={jsonViewMode === 'tree' ? 'default' : 'ghost'}
                          onClick={() => setJsonViewMode('tree')}
                          className="h-7 px-3"
                        >
                          <Network className="w-3 h-3 mr-1" />
                          Tree
                        </Button>
                      </div>
                    </div>
                    
                    {jsonViewMode === 'text' ? (
                      <Textarea
                        value={jsonOutput}
                        readOnly
                        className="min-h-[200px] font-mono text-sm bg-muted"
                      />
                    ) : (
                      <JsonTreeView data={jsonParsed} />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Character Counter Tab */}
          <TabsContent value="char" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Character Counter</CardTitle>
                <CardDescription>Enter text to count characters, words, and comma-separated items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input Text</label>
                  <Textarea
                    placeholder="Type or paste your text here...\n\nFor comma-separated counting, use format: item1, item2, item3"
                    value={charInput}
                    onChange={(e) => setCharInput(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalChars}</div>
                      <div className="text-sm text-muted-foreground mt-1">Total Characters</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.withoutSpaces}</div>
                      <div className="text-sm text-muted-foreground mt-1">Without Spaces</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/20">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{stats.words}</div>
                      <div className="text-sm text-muted-foreground mt-1">Words</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border-pink-500/20">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{stats.commaItems}</div>
                      <div className="text-sm text-muted-foreground mt-1">Comma Items</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button 
                    onClick={copyCharStats} 
                    variant="outline"
                    disabled={!charInput}
                  >
                    {charCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {charCopied ? 'Copied!' : 'Copy Stats'}
                  </Button>
                  <Button 
                    onClick={downloadCharStats} 
                    variant="outline"
                    disabled={!charInput}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    onClick={shareCharStats} 
                    variant="outline"
                    disabled={!charInput}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-background/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with Next.js & Tailwind CSS</p>
          <p className="mt-2">© 2024 DevToolbox. All tools run locally in your browser.</p>
        </div>
      </footer>
    </div>
  )
}