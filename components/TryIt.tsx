
import React, { useState, useRef } from 'react';
import ReactFlow, { 
  Handle, 
  Position, 
  Background, 
  Node,
  useNodesState,
  useEdgesState
} from 'reactflow';
import { MoveHorizontal, Layers } from 'lucide-react';

// --- CUSTOM NODES ---

const AssetNode = ({ data }: any) => (
  <div className="p-3 rounded-2xl bg-white dark:bg-[#1a1a1e] border border-zinc-200 dark:border-white/5 shadow-xl w-[180px]">
    <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">{data.label}</div>
    <div className="rounded-lg overflow-hidden aspect-video border border-zinc-100 dark:border-white/5">
      <img src={data.image} className="w-full h-full object-cover grayscale opacity-60" alt="Исходное изображение интерьера" loading="lazy" />
    </div>
    <Handle type="source" position={Position.Right} className="!bg-artevrika" />
  </div>
);

const PromptInputNode = ({ data }: any) => (
  <div className="p-4 rounded-2xl bg-[#242424] border border-white/10 shadow-2xl w-[260px]">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
      <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Активный промпт</div>
    </div>
    <p className="text-[11px] leading-relaxed text-zinc-300 font-medium italic">
      «{data.text}»
    </p>
    <Handle type="source" position={Position.Right} className="!bg-terracotta" />
  </div>
);

const CompareNode = ({ data }: any) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const newPos = ((x - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, newPos)));
  };

  return (
    <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-2xl w-[500px]">
      <div className="bg-[#0c0c0e] rounded-[2.4rem] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <Layers className="text-artevrika" size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Узел сравнения результатов</span>
          </div>
          <div className="flex gap-2">
            <div className="px-2 py-1 rounded bg-zinc-800 text-[8px] font-mono text-zinc-400 font-sans">720p</div>
            <div className="px-2 py-1 rounded bg-artevrika/10 text-[8px] font-mono text-artevrika font-sans">Success</div>
          </div>
        </div>

        {/* Slider Area */}
        <div 
          ref={containerRef}
          className="relative aspect-[16/10] bg-black nodrag cursor-ew-resize group"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          <img src={data.after} className="absolute inset-0 w-full h-full object-cover" alt="Результат AI-обработки" loading="lazy" />
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img src={data.before} className="absolute inset-0 w-full h-full object-cover grayscale" alt="Исходное изображение" loading="lazy" />
          </div>
          
          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-sm shadow-xl z-10"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-4 border-black/20 group-active:scale-110 transition-transform">
              <MoveHorizontal size={18} />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 text-[8px] font-black uppercase text-white/50 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full font-heading">Чертеж</div>
          <div className="absolute bottom-4 right-4 text-[8px] font-black uppercase text-artevrika bg-artevrika/20 backdrop-blur-md px-3 py-1.5 rounded-full font-heading">AI Генерация</div>
        </div>

        {/* Footer info */}
        <div className="p-6 bg-zinc-900/50 flex justify-between items-center">
          <div className="flex gap-4">
             <div className="flex flex-col">
               <span className="text-[7px] text-zinc-500 uppercase font-bold tracking-widest mb-1 font-heading">Время рендера</span>
               <span className="text-[11px] text-white font-mono">12.4s</span>
             </div>
             <div className="flex flex-col border-l border-white/5 pl-4">
               <span className="text-[7px] text-zinc-500 uppercase font-bold tracking-widest mb-1 font-heading">Модель</span>
               <span className="text-[11px] text-artevrika font-mono">weavy-pro-v3</span>
             </div>
          </div>
        </div>
      </div>
      
      <Handle type="target" position={Position.Left} id="asset" style={{ top: '30%' }} className="!bg-artevrika" />
      <Handle type="target" position={Position.Left} id="prompt" style={{ top: '70%' }} className="!bg-terracotta" />
    </div>
  );
};

const nodeTypes = {
  asset: AssetNode,
  prompt: PromptInputNode,
  compare: CompareNode
};

export const TryIt: React.FC = () => {
  const initialNodes: Node[] = [
    { 
      id: 'n1', 
      type: 'asset', 
      position: { x: 50, y: 150 }, 
      data: { 
        label: 'Исходный чертеж', 
        image: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?w=400' 
      } 
    },
    { 
      id: 'n2', 
      type: 'prompt', 
      position: { x: 50, y: 320 }, 
      data: { 
        text: 'Создай фотореалистичный интерьер гостиной в стиле скандинавский минимализм, используя планировку с чертежа. Свет из окон — золотой час.' 
      } 
    },
    { 
      id: 'n3', 
      type: 'compare', 
      position: { x: 450, y: 100 }, 
      data: { 
        before: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1000',
        after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000' 
      } 
    },
  ];

  const initialEdges = [
    { id: 'e1', source: 'n1', target: 'n3', targetHandle: 'asset', animated: true, style: { stroke: '#38D39F', strokeWidth: 2 } },
    { id: 'e2', source: 'n2', target: 'n3', targetHandle: 'prompt', animated: true, style: { stroke: '#f25151', strokeWidth: 2 } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <section id="try-it" className="py-24 bg-[#08080a] relative overflow-hidden">
      <div className="container-fluid mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-heading text-[10px] uppercase tracking-[0.4em] text-artevrika font-black mb-4 block">Инструментарий weavy.ai</span>
            <h2 className="text-[clamp(32px,4vw,52px)] font-heading font-bold tracking-tighter uppercase text-white leading-none">
              Попробуй <span className="inline-flex whitespace-nowrap px-[0.12em] -mx-[0.12em] pb-[0.06em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic leading-[1.05] drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.14em] [text-decoration-thickness:0.06em]">в действии</span>
            </h2>
          </div>
          <p className="text-[clamp(16px,1.2vw,18px)] text-zinc-500 font-sans leading-relaxed max-w-sm">
            Интерактивная эмуляция рабочего процесса. Потяните слайдер на финальной ноде, чтобы увидеть магию трансформации.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto relative h-[750px] rounded-[4rem] border border-white/5 shadow-2xl overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          className="bg-[#08080a]"
          panOnDrag={false}
          zoomOnScroll={false}
          panOnScroll={false}
          preventScrolling={false}
          nodesDraggable={true}
        >
          <Background color="#1a1a1e" gap={40} size={1} />
        </ReactFlow>

        <div className="absolute bottom-10 left-10 z-20">
          <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-4 font-heading">
             <div className="w-3 h-3 rounded-full bg-artevrika animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Live Editor Preview v3.1</span>
          </div>
        </div>
      </div>
    </section>
  );
};
