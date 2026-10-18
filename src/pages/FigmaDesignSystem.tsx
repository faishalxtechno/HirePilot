import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Copy,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Palette,
  Type,
  LayoutGrid,
  CheckCircle2,
  XCircle,
  Maximize2,
  ChevronDown,
  Share2,
  MousePointer,
  Square,
  Circle,
  Sliders,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';

interface ColorToken {
  name: string;
  hex: string;
  token: string;
  role: string;
  category: 'core' | 'brand' | 'illustration' | 'accent';
  textColor?: string;
}

const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Ink Black',
    hex: '#000000',
    token: '--color-ink-black',
    role: 'Primary text, icon strokes, high-contrast borders',
    category: 'core',
    textColor: '#ffffff',
  },
  {
    name: 'Paper White',
    hex: '#ffffff',
    token: '--color-paper-white',
    role: 'Page canvas, card surfaces, ghost button fills',
    category: 'core',
    textColor: '#000000',
  },
  {
    name: 'Soft Mist',
    hex: '#e2e2e2',
    token: '--color-soft-mist',
    role: 'Subtle card surface, secondary panel backgrounds',
    category: 'core',
    textColor: '#000000',
  },
  {
    name: 'Graphite',
    hex: '#595959',
    token: '--color-graphite',
    role: 'Muted helper text, secondary labels, de-emphasized metadata',
    category: 'core',
    textColor: '#ffffff',
  },
  {
    name: 'Electric Indigo',
    hex: '#4d49fc',
    token: '--color-electric-indigo',
    role: 'Primary CTA buttons, active indicators — only saturated action fill',
    category: 'brand',
    textColor: '#ffffff',
  },
  {
    name: 'Figma Cyan',
    hex: '#00b6ff',
    token: '--color-figma-cyan',
    role: 'Brand logo accent, decorative icon highlight',
    category: 'brand',
    textColor: '#000000',
  },
  {
    name: 'Figma Green',
    hex: '#24cb71',
    token: '--color-figma-green',
    role: 'Brand logo accent, decorative icon highlight',
    category: 'brand',
    textColor: '#000000',
  },
  {
    name: 'Figma Orange',
    hex: '#ff7237',
    token: '--color-figma-orange',
    role: 'Brand logo accent, decorative icon highlight',
    category: 'brand',
    textColor: '#ffffff',
  },
  {
    name: 'Lime Wash',
    hex: '#e4ff97',
    token: '--color-lime-wash',
    role: 'Decorative illustration fill, community card tint',
    category: 'illustration',
    textColor: '#000000',
  },
  {
    name: 'Lilac',
    hex: '#c4baff',
    token: '--color-lilac',
    role: 'Decorative illustration fill, pastel accent tags',
    category: 'illustration',
    textColor: '#000000',
  },
  {
    name: 'Blush',
    hex: '#ffc9c1',
    token: '--color-blush',
    role: 'Decorative illustration fill, pastel accent',
    category: 'illustration',
    textColor: '#000000',
  },
  {
    name: 'Aqua Mist',
    hex: '#c7f8fb',
    token: '--color-aqua-mist',
    role: 'Decorative illustration fill, pastel accent',
    category: 'illustration',
    textColor: '#000000',
  },
  {
    name: 'Earworm Teal',
    hex: '#33dfdf',
    token: '--color-earworm-teal',
    role: 'Ring stroke, radial highlight neon teal',
    category: 'accent',
    textColor: '#000000',
  },
  {
    name: 'Mustard',
    hex: '#b98e01',
    token: '--color-mustard',
    role: 'Ring stroke, radial highlight warm gold companion',
    category: 'accent',
    textColor: '#ffffff',
  },
];

const COMMUNITY_PROJECTS = [
  {
    id: 1,
    title: 'Kinetic Poster System & Swiss Typography',
    author: 'Elena Rostova',
    role: 'Brand Designer',
    avatar: 'ER',
    bg: 'linear-gradient(135deg, #4d49fc 0%, #00b6ff 100%)',
    tag: 'Typography',
    likes: '2.4k',
  },
  {
    id: 2,
    title: 'Adaptive Glass Component Kit for iOS',
    author: 'Marcus Vance',
    role: 'Design Engineer',
    avatar: 'MV',
    bg: 'linear-gradient(135deg, #e4ff97 0%, #24cb71 100%)',
    tag: 'UI Kit',
    likes: '4.8k',
  },
  {
    id: 3,
    title: '3D Spatial Audio Node Visualizer',
    author: 'Aoi Tanaka',
    role: 'Creative Developer',
    avatar: 'AT',
    bg: 'linear-gradient(135deg, #c4baff 0%, #ff7237 100%)',
    tag: '3D / Interaction',
    likes: '1.9k',
  },
  {
    id: 4,
    title: 'Minimal Editorial Layouts 2026',
    author: 'Soren Lindqvist',
    role: 'Art Director',
    avatar: 'SL',
    bg: 'linear-gradient(135deg, #c7f8fb 0%, #33dfdf 100%)',
    tag: 'Editorial',
    likes: '3.1k',
  },
];

export const FigmaDesignSystem: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'components' | 'guidelines'>('overview');

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(identifier);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000] font-figmaSans selection:bg-[#4d49fc] selection:text-white antialiased">
      {/* 1. Global Navigation Bar: 64px tall, flush on white canvas */}
      <header className="sticky top-0 z-50 bg-[#ffffff] h-16 border-b border-[#e2e2e2]/60 px-6 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Brand identifier: Four-color geometric logo mark */}
          <Link to="/" className="flex items-center gap-3 group select-none">
            <div className="w-6 h-9 flex flex-col justify-between shrink-0">
              <div className="flex h-3 w-6">
                <div className="w-3 h-3 rounded-l-full bg-[#ff7237]" />
                <div className="w-3 h-3 rounded-r-full bg-[#ff7237]" />
              </div>
              <div className="flex h-3 w-6">
                <div className="w-3 h-3 rounded-l-full bg-[#00b6ff]" />
                <div className="w-3 h-3 rounded-full bg-[#24cb71]" />
              </div>
              <div className="w-3 h-3 rounded-l-full rounded-br-full bg-[#000000]" />
            </div>
            <div className="flex flex-col">
              <span className="font-figmaSans font-bold text-base tracking-tight leading-none text-[#000000]">
                Figma
              </span>
              <span className="font-figmaMono text-[10px] tracking-[0.05em] text-[#595959] uppercase mt-0.5">
                Style Reference
              </span>
            </div>
          </Link>

          {/* Navigation Links with Carets */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-normal text-[#000000]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`hover:opacity-60 transition-opacity ${activeTab === 'overview' ? 'font-medium underline underline-offset-8 decoration-[#4d49fc] decoration-2' : ''}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tokens')}
              className={`hover:opacity-60 transition-opacity ${activeTab === 'tokens' ? 'font-medium underline underline-offset-8 decoration-[#4d49fc] decoration-2' : ''}`}
            >
              Tokens & Specs
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`hover:opacity-60 transition-opacity ${activeTab === 'components' ? 'font-medium underline underline-offset-8 decoration-[#4d49fc] decoration-2' : ''}`}
            >
              Components
            </button>
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`hover:opacity-60 transition-opacity ${activeTab === 'guidelines' ? 'font-medium underline underline-offset-8 decoration-[#4d49fc] decoration-2' : ''}`}
            >
              Do's & Don'ts
            </button>
          </nav>
        </div>

        {/* Auth & Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <button className="hidden sm:inline-flex items-center justify-center font-figmaSans font-normal text-sm text-[#000000] border border-[#000000] rounded-lg px-4 py-1.5 hover:bg-black/5 transition-colors">
              Return to HirePilot
            </button>
          </Link>
          <button className="hidden sm:inline-flex items-center justify-center font-figmaSans font-normal text-sm text-white bg-[#000000] rounded-[50px] px-4 py-1.5 hover:bg-[#000000]/80 transition-opacity">
            Get started for free
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className="inline-flex items-center justify-center font-figmaSans font-[480] text-sm text-white bg-[#4d49fc] rounded-[50px] px-4 py-1.5 hover:bg-[#433ff0] transition-colors"
          >
            Explore System
          </button>
        </div>
      </header>

      {/* Hero Section: Centered Floating Card over Scattered Collage */}
      <section className="relative overflow-hidden pt-12 pb-24 sm:pb-32 px-4 sm:px-8 border-b border-[#e2e2e2]/60">
        {/* Background Scattered Design Collage: Proof of capability */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-90">
          <div className="absolute -top-12 left-10 w-64 h-80 rounded-2xl bg-gradient-to-br from-[#4d49fc] to-[#00b6ff] rotate-[-7deg] shadow-lg p-4 text-white font-mono text-xs flex flex-col justify-between">
            <span className="font-bold text-lg">POSTER 01</span>
            <div className="space-y-1">
              <div className="w-12 h-1 bg-white/60 rounded" />
              <div className="w-20 h-1 bg-white/40 rounded" />
            </div>
            <span>FIGMA CANVAS 2026</span>
          </div>

          <div className="absolute top-16 right-12 w-72 h-96 rounded-xl bg-gradient-to-br from-[#e4ff97] to-[#24cb71] rotate-[9deg] shadow-lg p-5 text-black font-figmaSans flex flex-col justify-between">
            <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center font-bold">
              ✦
            </div>
            <div>
              <p className="text-xl font-semibold leading-tight">GENERATIVE VECTOR ENGINE</p>
              <p className="text-xs text-black/60 mt-1">Inter weight 320 to 700</p>
            </div>
            <span className="font-mono text-[11px]">FIGMA COMMUNITY</span>
          </div>

          <div className="absolute -bottom-16 left-1/3 w-80 h-72 rounded-3xl bg-gradient-to-tr from-[#c4baff] to-[#ff7237] rotate-[-4deg] shadow-md p-6 text-white flex flex-col justify-between">
            <span className="text-xs tracking-widest uppercase">Mobile Interface</span>
            <span className="text-2xl font-light">Precision Pill Controls</span>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-white/50" />
              <span className="w-3 h-3 rounded-full bg-white/50" />
            </div>
          </div>

          <div className="absolute top-1/2 -right-8 w-60 h-60 rounded-full bg-gradient-to-r from-[#c7f8fb] to-[#33dfdf] opacity-60 blur-2xl" />
        </div>

        {/* Foreground: Hero Floating Card */}
        <div className="relative max-w-[760px] mx-auto z-10">
          <div className="bg-[#ffffff] rounded-[16px] p-8 sm:p-12 shadow-[0px_24px_70px_0px_rgba(0,0,0,0.1)] border border-[#e2e2e2]/40 transition-all">
            {/* Branded Conic Gradient Ring */}
            <div className="flex items-center gap-3 mb-6">
              <div className="figma-decorative-ring" />
              <div className="inline-flex items-center gap-2">
                <span className="font-figmaMono text-xs tracking-[0.04em] text-[#595959] uppercase">
                  Design System Token Reference
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#4d49fc]" />
              </div>
            </div>

            {/* Whisper-weight Display Headline */}
            <h1 className="font-figmaSans font-[320] text-4xl sm:text-6xl text-[#000000] tracking-[-0.84px] leading-[1.1] mb-6">
              White gallery wall with a single indigo spotlight.
            </h1>

            {/* Body Copy */}
            <p className="font-figmaSans text-lg sm:text-xl text-[#595959] font-normal leading-[1.4] tracking-[-0.18px] max-w-xl mb-8">
              An achromatic interface where black text, white surfaces, and a single electric indigo accent do all the work. Elevation is reduced to one soft drop shadow; the rest is pure whitespace.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary CTA: Electric Indigo, 50px pill */}
              <button
                onClick={() => setActiveTab('tokens')}
                className="inline-flex items-center justify-center gap-2 bg-[#4d49fc] text-white font-figmaSans font-[480] text-base rounded-[50px] px-6 py-3 hover:bg-[#433ff0] transition-colors cursor-pointer"
              >
                <span>Inspect Design Tokens</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Ghost Nav Button: 1px black border, 8px radius */}
              <button
                onClick={() => setActiveTab('guidelines')}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#000000] border border-[#000000] font-figmaSans font-normal text-base rounded-lg px-5 py-3 hover:bg-black/5 transition-colors cursor-pointer"
              >
                <span>System Principles</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabbed Reference Content */}
      <main className="max-w-[1200px] mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <section className="space-y-16 animate-fade-in">
            {/* Core Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-[16px] bg-[#ffffff] border border-[#e2e2e2]">
                <span className="font-figmaMono text-xs text-[#595959] tracking-[0.04em]">BASE UNIT</span>
                <p className="text-3xl font-light text-[#000000] mt-2">4px</p>
                <p className="text-xs text-[#595959] mt-1">Multiples up to 180px</p>
              </div>
              <div className="p-6 rounded-[16px] bg-[#ffffff] border border-[#e2e2e2]">
                <span className="font-figmaMono text-xs text-[#595959] tracking-[0.04em]">ACCENT COLOR</span>
                <p className="text-3xl font-light text-[#4d49fc] mt-2">#4d49fc</p>
                <p className="text-xs text-[#595959] mt-1">Single saturated action fill</p>
              </div>
              <div className="p-6 rounded-[16px] bg-[#ffffff] border border-[#e2e2e2]">
                <span className="font-figmaMono text-xs text-[#595959] tracking-[0.04em]">HEADLINE WEIGHT</span>
                <p className="text-3xl font-light text-[#000000] mt-2">320</p>
                <p className="text-xs text-[#595959] mt-1">Ultra-light whispered authority</p>
              </div>
              <div className="p-6 rounded-[16px] bg-[#ffffff] border border-[#e2e2e2]">
                <span className="font-figmaMono text-xs text-[#595959] tracking-[0.04em]">RADIUS TIERS</span>
                <p className="text-3xl font-light text-[#000000] mt-2">2 · 8 · 16 · 50</p>
                <p className="text-xs text-[#595959] mt-1">Strict 4-tier hierarchy</p>
              </div>
            </div>

            {/* Product Feature Panel showcase with canvas toolbar */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
                    Component · Product Feature Panel
                  </span>
                  <h2 className="font-figmaSans font-[320] text-3xl sm:text-4xl text-[#000000] tracking-[-0.84px] mt-1">
                    The canvas toolbar & product workspace
                  </h2>
                </div>
                <p className="text-sm text-[#595959] max-w-sm">
                  No card chrome around the screenshot — the product interface IS the card.
                </p>
              </div>

              {/* Product Canvas Mockup */}
              <div className="rounded-[16px] border border-[#e2e2e2] overflow-hidden bg-[#ffffff] shadow-sm">
                {/* Canvas Top Bar */}
                <div className="h-12 bg-[#ffffff] border-b border-[#e2e2e2] px-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 font-medium">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff7237]" />
                      <span>Career Path Evaluation / System Design</span>
                    </div>
                    <span className="text-[#595959] text-[11px] font-mono">v2.4.0</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-[#e2e2e2]/60 px-2.5 py-1 rounded-md text-[11px] font-mono">
                      <span>100%</span>
                    </div>
                    <button className="flex items-center gap-1.5 bg-[#4d49fc] text-white px-3 py-1 rounded-[50px] text-xs font-medium">
                      <Share2 className="w-3 h-3" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Canvas Workspace Area */}
                <div className="p-8 sm:p-12 bg-[#fafafa] min-h-[320px] flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Mock Artboard */}
                  <div className="relative bg-white rounded-xl shadow-lg border border-[#e2e2e2] p-6 max-w-md w-full">
                    <div className="flex items-center justify-between border-b border-[#e2e2e2] pb-3 mb-4">
                      <span className="text-xs font-mono text-[#595959]">ARTBOARD 01 · 800 x 600</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#e4ff97] text-black font-medium">
                        READY
                      </span>
                    </div>
                    <h3 className="text-xl font-normal text-black mb-2">Technical Interview Simulation</h3>
                    <p className="text-xs text-[#595959] leading-relaxed mb-4">
                      Distributed transactions, 2PC protocol, consensus algorithms (Raft, Paxos), and eventual consistency models.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-[#e2e2e2] text-black font-medium">
                        8px Tag
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-[50px] bg-[#4d49fc] text-white font-medium">
                        50px Action Pill
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Card Grid: 4 columns, 24px gap, no shadows */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
                    Component · Community Card Grid
                  </span>
                  <h2 className="font-figmaSans font-[320] text-3xl sm:text-4xl text-[#000000] tracking-[-0.84px] mt-1">
                    Gallery of community work
                  </h2>
                </div>
                <span className="font-figmaMono text-xs text-[#595959]">
                  4 Columns · 24px Gaps · No Drop Shadows
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {COMMUNITY_PROJECTS.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[16px] border border-[#e2e2e2] overflow-hidden hover:border-black/30 transition-colors group cursor-pointer"
                  >
                    {/* Uncropped Artwork Thumbnail */}
                    <div
                      className="h-44 w-full p-4 flex flex-col justify-between text-white transition-transform duration-300 group-hover:scale-[1.02]"
                      style={{ background: item.bg }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm">
                          {item.tag}
                        </span>
                        <span className="text-xs font-mono opacity-80">★ {item.likes}</span>
                      </div>
                      <span className="text-sm font-medium tracking-tight opacity-90">
                        {item.title.split(' ')[0]}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3">
                      <h4 className="font-figmaSans font-[520] text-[18px] text-[#000000] leading-snug tracking-[-0.18px] line-clamp-1">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 pt-1 border-t border-[#e2e2e2]/60">
                        <div className="w-6 h-6 rounded-full bg-[#000000] text-white flex items-center justify-center text-[10px] font-bold">
                          {item.avatar}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-figmaSans font-normal text-sm text-[#000000] leading-none">
                            {item.author}
                          </span>
                          <span className="text-xs text-[#595959] mt-0.5">{item.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: TOKENS & SPECS */}
        {activeTab === 'tokens' && (
          <section className="space-y-16 animate-fade-in">
            {/* Color Tokens Palette */}
            <div className="space-y-6">
              <div className="border-b border-[#e2e2e2] pb-4">
                <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
                  Tokens · Color Palette
                </span>
                <h2 className="font-figmaSans font-[320] text-3xl sm:text-4xl text-[#000000] tracking-[-0.84px] mt-1">
                  Achromatic canvas with single indigo spotlight
                </h2>
                <p className="text-sm text-[#595959] mt-2 max-w-2xl">
                  The system is 0% colorful at the UI level. Black, white, and one indigo are the entire interface palette. All pastel and neon tones exist purely in user-generated artworks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {COLOR_TOKENS.map((col) => {
                  const isCopied = copiedToken === col.name;
                  return (
                    <div
                      key={col.name}
                      onClick={() => copyToClipboard(col.hex, col.name)}
                      className="group p-4 rounded-[16px] border border-[#e2e2e2] hover:border-black/40 transition-all cursor-pointer bg-white flex flex-col justify-between"
                    >
                      <div>
                        <div
                          className="w-full h-16 rounded-lg mb-3 border border-black/10 flex items-center justify-center transition-transform group-hover:scale-[0.98]"
                          style={{ backgroundColor: col.hex }}
                        >
                          <span
                            className="text-xs font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: col.textColor }}
                          >
                            {isCopied ? 'Copied!' : 'Click to copy'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm text-[#000000]">{col.name}</h4>
                          <span className="font-mono text-xs text-[#595959]">{col.hex}</span>
                        </div>
                        <p className="text-xs text-[#595959] mt-1.5 leading-relaxed">{col.role}</p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-[#e2e2e2] flex items-center justify-between text-[11px] font-mono text-[#595959]">
                        <code>{col.token}</code>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-[#24cb71]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Typography Scale Specimen */}
            <div className="space-y-6">
              <div className="border-b border-[#e2e2e2] pb-4">
                <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
                  Tokens · Typography Scale
                </span>
                <h2 className="font-figmaSans font-[320] text-3xl sm:text-4xl text-[#000000] tracking-[-0.84px] mt-1">
                  figmaSans (Inter) & figmaMono (JetBrains Mono)
                </h2>
              </div>

              <div className="space-y-8 bg-white p-6 sm:p-8 rounded-[16px] border border-[#e2e2e2]">
                <div className="border-b border-[#e2e2e2] pb-6">
                  <div className="flex justify-between items-center text-xs font-mono text-[#595959] mb-2">
                    <span>DISPLAY · 72px / 1.1 / -1.44px · Weight 320</span>
                    <code>--text-display</code>
                  </div>
                  <p className="font-figmaSans font-[320] text-[48px] sm:text-[72px] leading-[1.1] tracking-[-1.44px] text-black">
                    Make anything possible
                  </p>
                </div>

                <div className="border-b border-[#e2e2e2] pb-6">
                  <div className="flex justify-between items-center text-xs font-mono text-[#595959] mb-2">
                    <span>HEADING-LG · 56px / 1.1 / -0.84px · Weight 320</span>
                    <code>--text-heading-lg</code>
                  </div>
                  <p className="font-figmaSans font-[320] text-[36px] sm:text-[56px] leading-[1.1] tracking-[-0.84px] text-black">
                    Whispered authority through restraint
                  </p>
                </div>

                <div className="border-b border-[#e2e2e2] pb-6">
                  <div className="flex justify-between items-center text-xs font-mono text-[#595959] mb-2">
                    <span>HEADING · 24px / 1.35 / -0.24px · Weight 520</span>
                    <code>--text-heading</code>
                  </div>
                  <p className="font-figmaSans font-[520] text-[24px] leading-[1.35] tracking-[-0.24px] text-black">
                    Precision design instrument for modern software teams
                  </p>
                </div>

                <div className="border-b border-[#e2e2e2] pb-6">
                  <div className="flex justify-between items-center text-xs font-mono text-[#595959] mb-2">
                    <span>BODY · 18px / 1.4 / -0.18px · Weight 400</span>
                    <code>--text-body</code>
                  </div>
                  <p className="font-figmaSans font-normal text-[18px] leading-[1.4] tracking-[-0.18px] text-[#595959]">
                    Figma operates as a pure white canvas for creativity: an achromatic interface where black text, white surfaces, and a single electric indigo accent do all the work.
                  </p>
                </div>

                <div className="border-b border-[#e2e2e2] pb-6">
                  <div className="flex justify-between items-center text-xs font-mono text-[#595959] mb-2">
                    <span>BODY-SM · 16px / 1.45 / -0.11px · Weight 480</span>
                    <code>--text-body-sm</code>
                  </div>
                  <p className="font-figmaSans font-[480] text-[16px] leading-[1.45] tracking-[-0.11px] text-black">
                    Interactive primary action label and navigation anchor typography.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-[#595959] mb-2">
                    <span>MONO ANNOTATION · 12px / 1.3 / +0.04em · Weight 400</span>
                    <code>--font-figmamono</code>
                  </div>
                  <p className="font-figmaMono text-[12px] leading-[1.3] tracking-[0.04em] text-[#595959]">
                    const SPOTLIGHT_COLOR = '#4d49fc'; // Positive tracking for annotations
                  </p>
                </div>
              </div>
            </div>

            {/* Strict Four-Tier Radius System */}
            <div className="space-y-6">
              <div className="border-b border-[#e2e2e2] pb-4">
                <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
                  Tokens · Four-Tier Radius System
                </span>
                <h2 className="font-figmaSans font-[320] text-3xl sm:text-4xl text-[#000000] tracking-[-0.84px] mt-1">
                  Never mix tiers — 2px, 8px, 16px, 50px
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-6 bg-white rounded-[16px] border border-[#e2e2e2] text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#e2e2e2] rounded-[2px] flex items-center justify-center font-mono text-xs">
                    2px
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Fine UI / Icons</h4>
                    <p className="text-xs text-[#595959] mt-1">Badges, dividers, micro indicators</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-[16px] border border-[#e2e2e2] text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#e2e2e2] rounded-[8px] flex items-center justify-center font-mono text-xs">
                    8px
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Ghost & Inputs</h4>
                    <p className="text-xs text-[#595959] mt-1">Outlined buttons, text fields, tags</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-[16px] border border-[#e2e2e2] text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-[#e2e2e2] rounded-[16px] flex items-center justify-center font-mono text-xs">
                    16px
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Cards & Panels</h4>
                    <p className="text-xs text-[#595959] mt-1">Hero card, community grid cards</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-[16px] border border-[#e2e2e2] text-center space-y-4">
                  <div className="w-24 h-16 mx-auto bg-[#4d49fc] text-white rounded-[50px] flex items-center justify-center font-mono text-xs">
                    50px
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Pill Buttons</h4>
                    <p className="text-xs text-[#595959] mt-1">Primary CTA and chip elements only</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: COMPONENTS */}
        {activeTab === 'components' && (
          <section className="space-y-16 animate-fade-in">
            {/* Component Showcase Matrix */}
            <div className="space-y-6">
              <div className="border-b border-[#e2e2e2] pb-4">
                <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
                  Components · Interactive UI Kit
                </span>
                <h2 className="font-figmaSans font-[320] text-3xl sm:text-4xl text-[#000000] tracking-[-0.84px] mt-1">
                  Reconstructed Figma building blocks
                </h2>
              </div>

              {/* Buttons Row */}
              <div className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-black">Button Language</h3>
                  <p className="text-xs text-[#595959]">
                    One saturated indigo CTA per view, outlined ghost buttons in black, and solid black pill for secondary headers.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {/* Primary CTA */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono text-[#595959]">Primary CTA (#4d49fc, 50px pill)</span>
                    <button className="bg-[#4d49fc] text-white font-figmaSans font-[480] text-base rounded-[50px] px-5 py-2.5 hover:bg-[#433ff0] transition-colors">
                      Try HirePilot for free
                    </button>
                  </div>

                  {/* Pill Black */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono text-[#595959]">Top Nav Pill Black (#000000, 50px)</span>
                    <button className="bg-[#000000] text-white font-figmaSans font-normal text-base rounded-[50px] px-5 py-2 hover:bg-black/80 transition-opacity">
                      Get started
                    </button>
                  </div>

                  {/* Ghost Nav */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono text-[#595959]">Ghost Button (1px border, 8px radius)</span>
                    <button className="bg-transparent text-[#000000] border border-[#000000] font-figmaSans font-normal text-base rounded-lg px-[18px] py-2 hover:bg-black/5 transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-black">Input & Field Controls</h3>
                  <p className="text-xs text-[#595959]">
                    Inputs follow the 8px radius rule, clean 1px borders, and graphite helper typography.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                  <Input
                    variant="figma"
                    label="Candidate Full Name"
                    placeholder="e.g. Alex Morgan"
                  />
                  <Input
                    variant="figma"
                    label="Target Seniority"
                    placeholder="Staff Software Engineer"
                  />
                </div>
              </div>

              {/* Tag & Badge Chips */}
              <div className="p-8 rounded-[16px] bg-white border border-[#e2e2e2] space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-black">Tag & Chip Curvature</h3>
                  <p className="text-xs text-[#595959]">
                    Tags use 8px rounding, mono annotations use 2px, and status chips use 50px pill radius.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="figmaMono">figmaMono 2px</Badge>
                  <Badge variant="figmaTag">Inter 8px Tag</Badge>
                  <Badge variant="figmaIndigo">Indigo 50px Pill</Badge>
                  <Badge variant="figmaLilac">Lilac Wash</Badge>
                  <Badge variant="figmaLime">Lime Wash</Badge>
                  <Badge variant="figmaAqua">Aqua Mist</Badge>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: GUIDELINES */}
        {activeTab === 'guidelines' && (
          <section className="space-y-16 animate-fade-in">
            <div className="border-b border-[#e2e2e2] pb-4">
              <span className="font-figmaMono text-xs text-[#595959] uppercase tracking-[0.04em]">
                Design System · Do's and Don'ts
              </span>
              <h2 className="font-figmaSans font-[320] text-3xl sm:text-4xl text-[#000000] tracking-[-0.84px] mt-1">
                Visual grammar rules & constraints
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DO's */}
              <div className="p-8 rounded-[16px] bg-[#ffffff] border border-[#24cb71]/40 space-y-6">
                <div className="flex items-center gap-3 text-[#24cb71]">
                  <CheckCircle2 className="w-6 h-6" />
                  <h3 className="text-xl font-medium text-black">DO</h3>
                </div>
                <ul className="space-y-4 text-sm text-[#595959] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24cb71] mt-2 shrink-0" />
                    <span><strong>Electric Indigo (#4d49fc)</strong> for exactly one CTA per viewport — repeating it dilutes its pull as the only saturated action color.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24cb71] mt-2 shrink-0" />
                    <span><strong>Set hero headlines at 56-72px</strong> in figmaSans weight 320-340; the ultra-light weight is the signature, not a fallback.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24cb71] mt-2 shrink-0" />
                    <span><strong>Apply the 50px pill radius</strong> to all primary action buttons and tag chips — the 8px radius is strictly for ghost controls and inputs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24cb71] mt-2 shrink-0" />
                    <span><strong>Use 16px radius for cards</strong> and 2px for fine UI elements — the four-tier radius system (2/8/16/50) is the whole curvature language.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#24cb71] mt-2 shrink-0" />
                    <span><strong>Pair black (#000000) text on white (#ffffff)</strong> for maximum contrast; introduce graphite (#595959) only for secondary metadata.</span>
                  </li>
                </ul>
              </div>

              {/* DON'Ts */}
              <div className="p-8 rounded-[16px] bg-[#ffffff] border border-[#ff7237]/40 space-y-6">
                <div className="flex items-center gap-3 text-[#ff7237]">
                  <XCircle className="w-6 h-6" />
                  <h3 className="text-xl font-medium text-black">DON'T</h3>
                </div>
                <ul className="space-y-4 text-sm text-[#595959] leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7237] mt-2 shrink-0" />
                    <span><strong>Do not apply color fills to secondary buttons</strong> — ghost/outlined in black is the correct alternative to the indigo primary.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7237] mt-2 shrink-0" />
                    <span><strong>Do not add drop shadows to cards in grid layouts</strong> — the single 24px 70px shadow is reserved for the floating hero card.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7237] mt-2 shrink-0" />
                    <span><strong>Do not use 50px radius on cards or inputs</strong> — the pill shape is strictly button-exclusive.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7237] mt-2 shrink-0" />
                    <span><strong>Do not introduce new chromatic colors</strong> to the UI chrome; pastels live in illustration only.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7237] mt-2 shrink-0" />
                    <span><strong>Do not set body copy below 16px</strong>; the smallest readable step in the system is 16px (12px is annotation-only).</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer: Quiet gallery wall conclusion */}
      <footer className="border-t border-[#e2e2e2] py-12 px-6 sm:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#595959]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4d49fc]" />
            <span>Figma Design System Specification Reference · Integrated in HirePilot</span>
          </div>
          <Link to="/" className="text-black hover:underline font-figmaSans font-medium">
            ← Return to HirePilot Application
          </Link>
        </div>
      </footer>
    </div>
  );
};
