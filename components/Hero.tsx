
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, { 
  Handle, 
  Position, 
  Background, 
  Node, 
  Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  ConnectionLineType,
  ReactFlowProvider,
  useReactFlow,
  MarkerType
} from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  ChevronDown, 
  Camera, 
  ArrowRight, 
  FileText, 
  Image as ImageIcon, 
  Loader2,
  Ratio,
  Maximize,
  Fullscreen,
  LayoutDashboard,
  Mouse,
  Zap,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  Monitor,
  Smartphone,
  Tv
} from 'lucide-react';
import { COLORS } from '../constants';

// --- SHARED UI SYSTEM ---
const BORDER_STYLE = "border-[1px] border-zinc-300 dark:border-white/15";
const GLASS_STYLE = `bg-white/70 dark:bg-[#121214]/70 backdrop-blur-2xl ${BORDER_STYLE} hover:ring-[8px] hover:ring-[#f25151]/10 transition-all duration-300 shadow-2xl overflow-visible`;
const LABEL_STYLE = "text-[12px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 font-heading";

// --- CUSTOM NODES ---

const TitleNode = ({ data }: any) => (
  <div className={`p-10 md:p-16 lg:p-20 rounded-[4rem] md:rounded-[5rem] w-[90vw] max-w-[850px] ${GLASS_STYLE} pointer-events-auto cursor-default`}>
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-terracotta text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] mb-8 font-heading">
      <Zap size={14} className="text-terracotta fill-terracotta" /> Онлайн-курс · 6 недель · Старт 20 октября
    </div>
    
    <h1 className="text-[32px] md:text-[52px] lg:text-[64px] font-bold leading-[1.05] mb-4 tracking-tighter uppercase text-[#1c3e42] dark:text-white font-heading">
      Вы делаете <span className="text-zinc-400 dark:text-zinc-600">дизайн.</span> <br />
      <span className="inline-block whitespace-nowrap pr-[0.08em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.12em] [text-decoration-thickness:0.06em]">AI делает</span> визуализации.
    </h1>

    <div className="mb-8 overflow-hidden">
      <span className="text-[16px] md:text-[22px] lg:text-[28px] font-bold uppercase tracking-tight font-heading inline-block bg-gradient-to-r from-terracotta via-artevrika to-terracotta bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent whitespace-nowrap">
        Вместе — в 10 раз быстрее
      </span>
    </div>
    
    <p className="text-[16px] md:text-[18px] font-normal text-zinc-500 mb-10 leading-relaxed max-w-[650px] font-sans">
      Практический курс по <a href="http://weavy.ai" target="_blank" rel="noopener noreferrer" className="text-zinc-900 dark:text-white font-bold underline decoration-artevrika/30 hover:text-artevrika transition-colors">weavy.ai</a>: научитесь делать полный комплект визуализаций за 2–3 дня вместо 3–4 недель. Узловые пайплайны, управляемые правки, дизайн-приложение для студии.
    </p>

    <div className="flex flex-wrap items-center gap-6">
      <a href="#pricing" className="px-14 py-8 rounded-full text-[15px] font-black uppercase tracking-[0.2em] text-white bg-terracotta flex items-center justify-center gap-4 font-heading shadow-[0_20px_45px_rgba(242,81,81,0.3)] hover:scale-105 transition-all whitespace-nowrap">
        Начать обучение <ArrowRight size={24} />
      </a>
      <a href="#programma" className="px-14 py-8 rounded-full text-[15px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center gap-4 font-heading hover:bg-zinc-200 dark:hover:bg-white/10 transition-all whitespace-nowrap">
        Программа
      </a>
    </div>
    <Handle type="source" position={data.isMobile ? Position.Bottom : Position.Right} className="!bg-terracotta !w-4 !h-4 !border-none" style={data.isMobile ? {} : { top: '80%' }} />
  </div>
);

const PromptNode = ({ data }: any) => (
  <div className={`p-5 md:p-6 rounded-[2rem] w-[90vw] max-w-[380px] ${GLASS_STYLE}`}>
    <div className={LABEL_STYLE}>
      <FileText size={14} className="text-zinc-500" /> PROMPT
    </div>
    <div className={`bg-zinc-50 dark:bg-black/40 rounded-[1.25rem] p-5 ${BORDER_STYLE} font-sans`}>
      <div className="text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-200 font-medium italic">
        Современная светлая гостиная, панорамные окна, диван нейтрального цвета, деревянный пол, минимализм, тёплый рассеянный свет
      </div>
    </div>
    <Handle type="target" position={data.isMobile ? Position.Top : Position.Left} className="!bg-terracotta !w-4 !h-4 !border-none" style={data.isMobile ? {} : { top: '20%' }} />
    <Handle type="source" position={data.isMobile ? Position.Bottom : Position.Right} className="!bg-zinc-600 !w-4 !h-4 !border-none" style={data.isMobile ? {} : { top: '80%' }} />
  </div>
);

const ReferenceNode = ({ data }: any) => (
  <div className={`p-5 md:p-6 rounded-[2rem] w-[90vw] max-w-[340px] ${GLASS_STYLE}`}>
    <div className={LABEL_STYLE}>
      <ImageIcon size={14} className="text-zinc-500" /> РЕФЕРЕНСЫ
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className={`aspect-square rounded-xl bg-zinc-50 dark:bg-black/40 overflow-hidden ${BORDER_STYLE} p-1`}>
        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80" className="w-full h-full object-cover rounded-lg" alt="Референс интерьера — гостиная" loading="lazy" />
      </div>
      <div className={`aspect-square rounded-xl bg-zinc-50 dark:bg-black/40 overflow-hidden ${BORDER_STYLE} p-1`}>
        <img src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=200&q=80" className="w-full h-full object-cover rounded-lg" alt="Референс интерьера — спальня" loading="lazy" />
      </div>
    </div>
    <Handle type="source" position={data.isMobile ? Position.Bottom : Position.Right} className="!bg-zinc-600 !w-4 !h-4 !border-none" style={data.isMobile ? {} : { top: '80%' }} />
  </div>
);

const AIModelNode = ({ data }: any) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [values, setValues] = useState({ view: 'Вид сбоку (3/4)', ratio: '1:1', res: '2K' });

  const RATIO_CONFIG = [
    { label: '1:1', icon: <Square size={14} /> },
    { label: '16:9', icon: <RectangleHorizontal size={14} /> },
    { label: '9:16', icon: <Smartphone size={14} /> },
    { label: '4:3', icon: <Tv size={14} /> },
    { label: '3:4', icon: <RectangleVertical size={14} /> },
    { label: '21:9', icon: <Monitor size={14} /> },
  ];

  const DROPDOWNS = [
    { id: 'view', label: 'Вид', icon: <Camera size={14} />, options: ['Вид сбоку (3/4)', 'Фронтальный', 'Панорама'] },
    { id: 'ratio', label: 'Формат', icon: <Ratio size={14} />, options: RATIO_CONFIG.map(r => r.label), config: RATIO_CONFIG },
    { id: 'res', label: 'Качество', icon: <Maximize size={14} />, options: ['1K', '2K', '4K'] }
  ];

  return (
    <div className={`p-5 md:p-6 rounded-[2rem] w-[90vw] max-w-[300px] ${GLASS_STYLE} relative`}>
      <div className={LABEL_STYLE}>
        <div className="w-2 h-2 rounded-full bg-artevrika" /> Настройка
      </div>
      <div className="space-y-2 relative">
        {DROPDOWNS.map((dd) => (
          <div key={dd.id} className="relative nodrag" onMouseDown={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenDropdown(openDropdown === dd.id ? null : dd.id)}
              className={`w-full flex items-center justify-between p-3 bg-zinc-50 dark:bg-black/40 rounded-xl ${BORDER_STYLE} text-[12px] font-sans`}
            >
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                {dd.id === 'ratio' ? (
                  RATIO_CONFIG.find(r => r.label === values.ratio)?.icon || dd.icon
                ) : (
                  dd.icon
                )}
                <span>{values[dd.id as keyof typeof values]}</span>
              </div>
              <ChevronDown size={12} className={`text-zinc-400 transition-transform ${openDropdown === dd.id ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openDropdown === dd.id && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1a1e] border border-zinc-200 dark:border-white/10 rounded-xl shadow-2xl py-1">
                  {dd.id === 'ratio' ? (
                    dd.config?.map((opt: any) => (
                      <button 
                        key={opt.label} 
                        onClick={() => { setValues({...values, ratio: opt.label}); setOpenDropdown(null); }} 
                        className="w-full text-left px-4 py-2 hover:bg-zinc-50 dark:hover:bg-white/5 text-[12px] text-zinc-600 dark:text-zinc-300 flex items-center gap-3"
                      >
                        <span className="text-zinc-400">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))
                  ) : (
                    dd.options.map((opt) => (
                      <button key={opt} onClick={() => { setValues({...values, [dd.id]: opt}); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-zinc-50 dark:hover:bg-white/5 text-[12px] text-zinc-600 dark:text-zinc-300">
                        {opt}
                      </button>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <Handle id="top-in" type="target" position={data.isMobile ? Position.Top : Position.Left} style={data.isMobile ? { left: '30%' } : { top: '20%' }} className="!bg-zinc-600 !w-4 !h-4 !border-none" />
      <Handle id="bottom-in" type="target" position={data.isMobile ? Position.Top : Position.Left} style={data.isMobile ? { left: '70%' } : { top: '40%' }} className="!bg-zinc-600 !w-4 !h-4 !border-none" />
      <Handle type="source" position={data.isMobile ? Position.Bottom : Position.Right} className="!bg-artevrika !w-4 !h-4 !border-none" style={data.isMobile ? {} : { top: '80%' }} />
    </div>
  );
};

const ResultNode = ({ data }: any) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => setImgIdx(prev => (prev + 1) % data.images.length), 5000);
      return () => clearInterval(timer);
    }
  }, [data.images.length, isPlaying]);

  return (
    <div className={`p-6 md:p-8 rounded-[2.5rem] w-[90vw] max-w-[800px] ${GLASS_STYLE}`}>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-artevrika shadow-[0_0_10px_#38D39F]" />
          <span className="text-[12px] font-black uppercase tracking-[0.3em] dark:text-white text-zinc-900 font-heading">Nano Banana Pro</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">v5.2</div>
      </div>
      
      <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-inner group">
        <AnimatePresence mode="wait">
          <motion.img key={data.images[imgIdx]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} src={data.images[imgIdx]} className="absolute inset-0 w-full h-full object-cover" />
        </AnimatePresence>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
           <div className="flex flex-col gap-2">
             <div className="bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-white/50 w-fit">
               {data.loading ? `GENERATING... ${data.progress}%` : `SEED_839658`}
             </div>
             <div className="flex items-center gap-2 nodrag" onMouseDown={(e) => e.stopPropagation()}>
               <button onClick={() => setIsPlaying(!isPlaying)} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 text-white border border-white/5">{isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}</button>
             </div>
           </div>

           <button onClick={(e) => {e.stopPropagation(); data.onGenerate();}} disabled={data.loading} className="px-6 py-3 rounded-full bg-terracotta text-white flex items-center gap-3 hover:scale-105 transition-all shadow-xl font-heading text-[10px] font-black uppercase tracking-widest nodrag">
              {data.loading ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} fill="currentColor" />}
              <span>Генерировать</span>
           </button>
        </div>
      </div>
      <Handle type="target" position={data.isMobile ? Position.Top : Position.Left} className="!bg-artevrika !w-4 !h-4 !border-none" style={data.isMobile ? {} : { top: '20%' }} />
      <Handle type="source" position={data.isMobile ? Position.Bottom : Position.Right} className="!bg-artevrika !w-4 !h-4 !border-none" style={data.isMobile ? {} : { top: '80%' }} />
    </div>
  );
};

const VideoNode = ({ data }: any) => {
  const [modelIdx, setModelIdx] = useState(0);
  const HERO_VIDEO_SRC = '/video/hero-video.mp4';
  const models = useMemo(() => [
    'VEO 3.1', 'Kling 3', 'Sora 2', 'Runway Gen-4.5', 'Grok Imagine Video', 'Wan 2.5', 'Hunyuan'
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setModelIdx(prev => (prev + 1) % models.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [models.length]);

  return (
    <div className={`p-6 md:p-8 rounded-[2.5rem] w-[90vw] max-w-[800px] ${GLASS_STYLE}`}>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-3 h-6 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-terracotta shadow-[0_0_10px_#f25151]" />
          <AnimatePresence mode="wait">
            <motion.span 
              key={models[modelIdx]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-[12px] font-black uppercase tracking-[0.3em] text-terracotta font-heading"
            >
              {models[modelIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Cinema Engine</div>
      </div>
      
      <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-inner group">
        <video
          src={HERO_VIDEO_SRC}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,81,81,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center gap-4">
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full bg-terracotta" animate={{ width: ['0%', '100%'] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
          </div>
          <div className="text-[9px] font-mono text-terracotta font-black tracking-widest uppercase">Rendering...</div>
        </div>
      </div>
      <Handle type="target" position={data.isMobile ? Position.Top : Position.Left} className="!bg-artevrika !w-4 !h-4 !border-none" style={data.isMobile ? {} : { top: '20%' }} />
    </div>
  );
};

const nodeTypes = { title: TitleNode, prompt: PromptNode, reference: ReferenceNode, aimodel: AIModelNode, result: ResultNode, video: VideoNode };
const ALIGN_EPSILON = 2;

const HeroInner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isOfferFocused, setIsOfferFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const { fitView } = useReactFlow();

  const IMAGES = useMemo(() => [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200', 
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200', 
    'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=1200'
  ], []);

  const handleGenerate = useCallback(() => { 
    setLoading(true); setProgress(0); 
    const interval = setInterval(() => { 
      setProgress(p => { 
        if (p >= 100) { clearInterval(interval); setLoading(false); return 100; } 
        return Math.min(100, p + Math.floor(Math.random() * 20)); 
      }); 
    }, 150); 
  }, []);

  const getIdealNodes = useCallback((width: number, isLoading: boolean, currentProgress: number) => {
    const isMobile = width < 1024;
    const commonData = { isMobile };
    const resData = { ...commonData, images: IMAGES, onGenerate: handleGenerate, loading: isLoading, progress: Math.round(currentProgress) };

    if (isMobile) {
      return [
        { id: '1', type: 'title', position: { x: 0, y: 0 }, data: commonData, draggable: false },
        { id: '2', type: 'prompt', position: { x: 0, y: 800 }, data: commonData, draggable: true },
        { id: '3', type: 'reference', position: { x: 0, y: 1150 }, data: commonData, draggable: true },
        { id: '4', type: 'aimodel', position: { x: 0, y: 1550 }, data: commonData, draggable: true },
        { id: '5', type: 'result', position: { x: -80, y: 2000 }, data: resData, draggable: true },
        { id: '6', type: 'video', position: { x: -80, y: 2700 }, data: commonData, draggable: true },
      ];
    }

    // Adjusted Desktop Grid for larger TitleNode
    return [
      { id: '1', type: 'title', position: { x: -150, y: 50 }, data: commonData, draggable: false },
      { id: '3', type: 'reference', position: { x: 850, y: -50 }, data: commonData, draggable: true },
      { id: '2', type: 'prompt', position: { x: 850, y: 320 }, data: commonData, draggable: true },
      { id: '4', type: 'aimodel', position: { x: 1280, y: 150 }, data: commonData, draggable: true },
      { id: '5', type: 'result', position: { x: 1650, y: -50 }, data: resData, draggable: true },
      { id: '6', type: 'video', position: { x: 1650, y: 600 }, data: commonData, draggable: true },
    ];
  }, [IMAGES, handleGenerate]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const isLayoutAligned = useMemo(() => {
    if (nodes.length === 0) return true;
    const idealNodes = getIdealNodes(windowWidth, loading, progress);
    if (nodes.length !== idealNodes.length) return false;

    const idealMap = new Map(idealNodes.map((node) => [node.id, node.position]));
    return nodes.every((node) => {
      const initialPos = idealMap.get(node.id);
      if (!initialPos) return false;

      return (
        Math.abs(node.position.x - initialPos.x) <= ALIGN_EPSILON &&
        Math.abs(node.position.y - initialPos.y) <= ALIGN_EPSILON
      );
    });
  }, [getIdealNodes, loading, nodes, progress, windowWidth]);
  const shouldResetViewport = isOfferFocused || !isLayoutAligned;

  useEffect(() => {
    const ideal = getIdealNodes(windowWidth, loading, progress);
    setNodes(ideal);
    
    setEdges([
      { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: COLORS.terracotta, strokeWidth: 4, strokeDasharray: '8, 8' } },
      { id: 'e3-4', source: '3', target: '4', targetHandle: 'top-in', style: { stroke: '#71717a', strokeWidth: 2 } },
      { id: 'e2-4', source: '2', target: '4', targetHandle: 'bottom-in', style: { stroke: '#71717a', strokeWidth: 2 } },
      { id: 'e4-5', source: '4', target: '5', style: { stroke: COLORS.green, strokeWidth: 4 }, markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.green } },
      { id: 'e5-6', source: '5', target: '6', style: { stroke: COLORS.terracotta, strokeWidth: 3, strokeDasharray: '5,5' }, animated: true },
    ]);

    const timeout = setTimeout(() => fitView({ padding: 0.15, duration: 800 }), 150);
    setIsOfferFocused(false);
    return () => clearTimeout(timeout);
  }, [windowWidth, fitView, getIdealNodes]);

  const handleViewportToggle = useCallback(() => {
    if (shouldResetViewport) {
      const alignedNodes = getIdealNodes(windowWidth, loading, progress);
      if (!isLayoutAligned) {
        setNodes(alignedNodes);
      }
      fitView({ padding: 0.15, duration: 600 });
      setIsOfferFocused(false);
      return;
    }

    const offerNode = nodes.find((node) => node.id === '1');
    if (offerNode) {
      fitView({
        nodes: [offerNode],
        padding: 0.22,
        duration: 600,
        minZoom: 0.55,
        maxZoom: 1.2,
      });
      setIsOfferFocused(true);
    }
  }, [fitView, getIdealNodes, isLayoutAligned, loading, nodes, progress, setNodes, shouldResetViewport, windowWidth]);

  useEffect(() => {
    setNodes((nds) => nds.map((n) => n.id === '5' ? { ...n, data: { ...n.data, loading, progress } } : n));
  }, [loading, progress, setNodes]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-7rem)] relative z-10">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} nodeTypes={nodeTypes} proOptions={{ hideAttribution: true }} panOnDrag={false} zoomOnScroll={false} nodesDraggable={true} panOnScroll={false} preventScrolling={false} minZoom={0.2} maxZoom={1.2}>
        <Background variant={BackgroundVariant.Dots} gap={40} size={2.5} color={isDarkMode ? "#1f1f23" : "#d1d5db"} />
      </ReactFlow>
      <div className="absolute inset-y-0 right-4 md:right-6 z-40 pointer-events-none">
        <div className="sticky top-1/2 -translate-y-1/2 w-12 rounded-2xl overflow-hidden bg-white/18 dark:bg-white/8 backdrop-blur-2xl backdrop-saturate-200 border border-white/30 dark:border-white/20 shadow-[0_18px_45px_rgba(0,0,0,0.28)] pointer-events-auto">
          <button
            onClick={handleViewportToggle}
            aria-label={shouldResetViewport ? 'Вернуть вид по умолчанию' : 'Сфокусироваться на первой ноде'}
            title={shouldResetViewport ? 'Вернуть вид по умолчанию' : 'Сфокусироваться на первой ноде'}
            className="group relative h-12 w-12 bg-white/8 text-zinc-700 transition-colors hover:bg-white/20 hover:text-[#f25151] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.08]"
          >
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {shouldResetViewport ? (
                <LayoutDashboard
                  size={24}
                  strokeWidth={2.2}
                  className="block -translate-y-px transition-transform duration-200 group-hover:scale-110"
                />
              ) : (
                <Fullscreen
                  size={24}
                  strokeWidth={2.2}
                  className="block -translate-y-px transition-transform duration-200 group-hover:scale-110"
                />
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative w-screen max-w-[100vw] h-[100dvh] pt-28 overflow-hidden flex flex-col transition-colors duration-500 bg-white dark:bg-magic-mesh">
      {/* Animated Magical Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Slow spinning gradient orb 1 */}
        <motion.div 
          animate={{ 
            x: [0, 100, -50, 0], 
            y: [0, -100, 50, 0],
            rotate: 360 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-terracotta/5 dark:bg-terracotta/10 blur-[200px] rounded-full" 
        />
        {/* Slow spinning gradient orb 2 */}
        <motion.div 
          animate={{ 
            x: [0, -150, 50, 0], 
            y: [0, 100, -100, 0],
            rotate: -360 
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-artevrika/5 dark:bg-artevrika/10 blur-[250px] rounded-full" 
        />
        {/* Center glowing nebula effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,211,159,0.03)_0%,transparent_70%)] animate-pulse" />
      </div>

      <ReactFlowProvider><HeroInner /></ReactFlowProvider>

      <motion.a
        href="#pain-points"
        initial={{ y: 0, opacity: 0.8 }}
        animate={{ y: [0, 6, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-5 inset-x-0 mx-auto w-fit z-20 flex flex-col items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-terracotta transition-colors"
      >
        <div className="relative h-7 w-7 flex items-center justify-center">
          <Mouse size={22} strokeWidth={1.8} />
          <motion.span
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: [ -4, 3, -4 ], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-2 h-1.5 w-1.5 rounded-full bg-current"
          />
        </div>
        <span className="font-heading font-black text-[10px] uppercase tracking-[0.16em]">
          Листайте вниз
        </span>
      </motion.a>
    </section>
  );
};
