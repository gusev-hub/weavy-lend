
import React, { useMemo, useState, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Node, 
  Edge, 
  MarkerType, 
  Position, 
  Handle, 
  useNodesState, 
  useEdgesState, 
  BackgroundVariant, 
  ReactFlowProvider, 
  useReactFlow 
} from 'reactflow';
import { COLORS } from '../constants';

// --- SHARED UI SYSTEM ---
const BORDER_STYLE = "border-[1px] border-zinc-300 dark:border-white/15";
const GLASS_STYLE = `bg-white/70 dark:bg-[#121214]/70 backdrop-blur-2xl ${BORDER_STYLE} hover:ring-[8px] hover:ring-[#f25151]/10 transition-all duration-300 shadow-2xl overflow-visible`;

// Module node settings
const NODE_WIDTH = 450;
const NODE_HEIGHT = 480;

const ModuleNode = ({ data }: any) => (
  <div className={`w-[${NODE_WIDTH}px] min-h-[${NODE_HEIGHT}px] p-8 rounded-[3rem] ${GLASS_STYLE} relative group cursor-grab active:cursor-grabbing flex flex-col justify-between`}>
    <div>
      <div className="flex items-center justify-between mb-6">
        <div 
          className="px-5 py-2 rounded-2xl text-[10px] font-heading font-black text-white uppercase tracking-[0.2em] shadow-xl"
          style={{ backgroundColor: data.isBonus ? '#4b5563' : COLORS.terracotta }}
        >
          Модуль {data.id}
        </div>
        <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono font-black bg-zinc-50 dark:bg-black/20 px-3 py-1.5 rounded-2xl border border-zinc-200 dark:border-white/5 uppercase tracking-[0.2em]">
          {data.lessons} УРОКОВ
        </div>
      </div>
      
      <h4 className="font-heading font-bold text-[22px] mb-6 leading-[1.1] group-hover:text-terracotta transition-colors dark:text-white text-zinc-900 uppercase tracking-tighter">
        {data.title}
      </h4>
      
      <div className="space-y-4 mb-8">
        {data.highlights?.map((h: string, idx: number) => (
          <div key={idx} className="flex items-start gap-3 text-[15px] font-sans font-medium text-zinc-600 dark:text-zinc-400 leading-snug">
            <div className="w-2 h-2 rounded-full bg-artevrika mt-2 flex-shrink-0 shadow-[0_0_10px_#38D39F]" />
            <span>{h}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-4 pt-6 border-t border-zinc-100 dark:border-white/5 mt-auto">
      <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-black/40 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform border border-zinc-100 dark:border-white/5">
        📦
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase font-heading font-black tracking-[0.2em]">Результат:</span>
        <span className="text-[14px] text-artevrika font-heading font-bold uppercase leading-tight tracking-tight">{data.artifact}</span>
      </div>
    </div>

    {data.id !== '0' && (
      <Handle type="target" position={Position.Left} style={{ top: '25%' }} className="!w-4 !h-4 !bg-zinc-600 !border-none !shadow-xl" />
    )}
    <Handle type="source" position={Position.Right} style={{ top: '75%' }} className="!w-4 !h-4 !bg-terracotta !border-none !shadow-xl" />
  </div>
);

const FinalNode = ({ data }: any) => (
  <div className={`w-[${NODE_WIDTH}px] p-10 rounded-[3.5rem] ${GLASS_STYLE} flex flex-col items-center justify-center text-center group cursor-grab active:cursor-grabbing`}>
    <div className="w-28 h-28 bg-artevrika rounded-[2.5rem] flex items-center justify-center text-[50px] mb-8 shadow-2xl group-hover:scale-110 transition-transform rotate-3 group-hover:rotate-12 duration-500 text-white">
      🎓
    </div>
    <span className="text-[10px] font-heading font-black uppercase text-artevrika tracking-[0.5em] mb-4">Финал обучения</span>
    <h3 className="text-[28px] font-heading font-bold text-zinc-900 dark:text-white mb-6 tracking-tighter uppercase leading-[0.9]">
      Выпускной <br/> проект
    </h3>
    <div className="flex flex-col gap-3 text-zinc-500 dark:text-zinc-400 text-[15px] font-sans font-medium">
      <span className="border-b border-zinc-200 dark:border-white/10 pb-3">📁 Альбом (10–14 кадров)</span>
      <span className="border-b border-zinc-200 dark:border-white/10 pb-3">🔗 Набор weavy-графов</span>
      <span>📱 Собственное Design App</span>
    </div>
    <Handle type="target" position={Position.Left} style={{ top: '25%' }} className="!w-6 !h-6 !bg-artevrika !border-none !shadow-xl" />
  </div>
);

const nodeTypes = {
  module: ModuleNode,
  final: FinalNode,
};

const MODULES_DATA = [
  { id: '0', title: 'Онбординг и «снятие мин»', lessons: 4, artifact: 'Бриф проекта v0 + Workspace', highlights: ['weavy.ai vs MidJourney', 'Настройка рабочего пространства', 'Карта пайплайна'] },
  { id: '1', title: 'Роль weavy + выбор проекта', lessons: 3, artifact: 'Бриф выпускного проекта v1', highlights: ['Точки внедрения AI', '9 критериев качества', 'Экономика AI-студии'] },
  { id: '2', title: 'weavy.ai: грамматика графов', lessons: 3, artifact: 'Граф v1 + правила именования', highlights: ['Canvas, ноды, связи', 'Генеративные vs Негенеративные', 'Базовый пайплайн'] },
  { id: '3', title: 'LLM-контур: данные → бриф', lessons: 4, artifact: 'Бриф + Набор промптов v1', highlights: ['Анкета клиента → ТЗ', 'Дизайн-бриф помещений', 'LLM as technical writer'] },
  { id: '4', title: 'Pinterest → Стилевое ДНК', lessons: 3, artifact: 'Стилевая библия v1', highlights: ['Структура референсов', 'Описание стиля через LLM', 'Правила консистентности'] },
  { id: '5', title: 'Nano Banana Pro: промптинг', lessons: 3, artifact: 'Галерея v1 (6–10 кадров)', highlights: ['14 пунктов промпта', 'Бриф-промпт vs Исполнительный', 'Фиксация Seed'] },
  { id: '6', title: 'Пайплайны по типам входа', lessons: 4, artifact: 'Набор входных данных', highlights: ['Виртуальная меблировка', 'Viewport 3D → Концепт', 'План 2D → Аксонометрия'] },
  { id: '7', title: 'Production-правки', lessons: 4, artifact: 'Набор «до/после»', highlights: ['Маски и Inpaint', 'Замена материалов (A/B)', 'Relight-сцена'] },
  { id: '8', title: 'Экономика и воспроизводимость', lessons: 3, artifact: 'Таблица режимов', highlights: ['Стоимость попыток', 'Выбор моделей (NBP/Flux)', 'Батч-генерация'] },
  { id: '9', title: 'Серии, ракурсы, альбом', lessons: 4, artifact: 'Финальный альбом v1', highlights: ['От кадра к серии', 'Механизм консистентности', 'Экспорт PDF'] },
  { id: '10', title: 'Workflow: Design App, стандарты', lessons: 3, artifact: 'Published App + SOP', highlights: ['Упаковка в Design App', 'Версионирование графов', 'Командный доступ'] },
  { id: '11', title: 'Бонус: Атмосферное видео', lessons: 3, artifact: 'Видеонабор (15–30 сек)', isBonus: true, highlights: ['Image-to-Video модели', 'Переход день-ночь', 'Экспорт для Reels'] },
];

const CourseProgramInner: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const { fitView } = useReactFlow();

  const isMobile = windowWidth < 1024;
  const cols = isMobile ? 1 : 3;
  const stepX = isMobile ? 0 : 500;
  const stepY = 540; 
  
  const totalRows = Math.ceil((MODULES_DATA.length + 1) / cols);
  const containerHeight = totalRows * stepY;

  const initialNodes: Node[] = useMemo(() => {
    const gridWidth = (cols - 1) * stepX;
    const xOffset = -gridWidth / 2 - (NODE_WIDTH / 2);

    const nodes: Node[] = MODULES_DATA.map((m, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      return {
        id: m.id,
        type: 'module',
        position: { x: (col * stepX) + xOffset, y: row * stepY },
        data: { ...m, isMobile },
        draggable: true,
      };
    });

    const finalIdx = MODULES_DATA.length;
    const finalCol = isMobile ? 0 : Math.floor(cols / 2);
    const finalRow = Math.floor(finalIdx / cols);

    nodes.push({
      id: 'final',
      type: 'final',
      position: { x: (finalCol * stepX) + xOffset, y: finalRow * stepY },
      data: { isMobile },
      draggable: true,
    });

    return nodes;
  }, [isMobile, cols, stepX, stepY]);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    for (let i = 0; i < MODULES_DATA.length - 1; i++) {
      edges.push({
        id: `e${i}-${i+1}`,
        source: MODULES_DATA[i].id,
        target: MODULES_DATA[i+1].id,
        animated: true,
        style: { stroke: COLORS.terracotta, strokeWidth: 3 },
        markerEnd: { type: MarkerType.ArrowClosed, color: COLORS.terracotta }
      });
    }
    edges.push({
      id: `efinal`,
      source: MODULES_DATA[MODULES_DATA.length - 1].id,
      target: 'final',
      animated: true,
      style: { stroke: '#38D39F', strokeWidth: 4 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#38D39F' }
    });
    return edges;
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    const timer = setTimeout(() => {
        fitView({ padding: 0.05, duration: 800, minZoom: 0.35 });
    }, 150);
    return () => clearTimeout(timer);
  }, [initialNodes, fitView, setNodes, isMobile]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ height: `${containerHeight}px` }} className="w-full relative transition-all duration-500 -mt-16">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={true}
        panOnDrag={true}
        zoomOnScroll={false}
        panOnScroll={false}
        preventScrolling={false}
        minZoom={0.1}
        maxZoom={1.5}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={40} 
          size={1.5} 
          color={document.documentElement.classList.contains('dark') ? "#1f1f23" : "#d1d5db"} 
        />
      </ReactFlow>
    </div>
  );
};

export const CourseProgram: React.FC = () => {
  return (
    <section id="programma" className="pt-8 pb-20 md:pt-12 md:pb-28 bg-white dark:bg-[#08080a] transition-colors duration-500 overflow-visible">
      <div className="container-fluid mb-4 text-center flex flex-col items-center">
        <span className="font-heading text-[11px] uppercase tracking-[0.6em] text-artevrika font-black mb-8 block">
          Учебный план
        </span>
        <h2 className="text-[clamp(32px,4vw,56px)] font-heading font-black mb-6 tracking-tighter dark:text-white text-zinc-900 leading-[1] uppercase">
          Программа <br />
          <span className="inline-flex whitespace-nowrap px-[0.12em] -mx-[0.12em] pb-[0.06em] bg-gradient-to-r from-artevrika via-[#ffbb00] via-terracotta via-[#ffbb00] to-artevrika bg-[length:300%_auto] animate-shimmer bg-clip-text text-transparent italic leading-[1.05] drop-shadow-[0_0_15px_rgba(242,81,81,0.2)] underline decoration-terracotta/40 underline-offset-[0.14em] [text-decoration-thickness:0.06em]">мастерства</span>
        </h2>
        <p className="text-[clamp(16px,1.2vw,18px)] font-sans font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
          От настройки рабочего пространства до выпуска собственного AI-приложения для дизайна. 41 урок в 12 модулях.
        </p>
      </div>

      <div className="w-full relative">
        <ReactFlowProvider>
          <CourseProgramInner />
        </ReactFlowProvider>
      </div>
    </section>
  );
};
