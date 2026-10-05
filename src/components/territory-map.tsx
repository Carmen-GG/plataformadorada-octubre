import { useMemo, useState } from "react";
import { formatCount, type PublicStats } from "@/lib/public-stats";

type MetricKey = "adhesiones" | "entidades" | "mocionesPresentadas" | "mocionesAceptadas" | "testimonios";
const METRICS: Array<{key:MetricKey;label:string}> = [
  {key:"adhesiones",label:"Adhesiones"},{key:"entidades",label:"Entidades"},{key:"mocionesPresentadas",label:"Mociones"},{key:"mocionesAceptadas",label:"Aprobadas"},{key:"testimonios",label:"Testimonios"}
];
const POINTS: Record<string,{x:number;y:number;label?:string}> = {
  Galicia:{x:274,y:70},Asturias:{x:390,y:30},Cantabria:{x:484,y:40},"País Vasco":{x:550,y:53},Navarra:{x:605,y:77},"La Rioja":{x:560,y:93},Castilla_y_Leon:{x:444,y:140,label:"Castilla y León"},Aragón:{x:651,y:187},Cataluña:{x:762,y:133},Madrid:{x:499,y:227},"Castilla-La Mancha":{x:535,y:293},Extremadura:{x:383,y:300},"Comunitat Valenciana":{x:651,y:287},Murcia:{x:615,y:393},Andalucía:{x:444,y:440},"Illes Balears":{x:817,y:281},Canarias:{x:164,y:604},Ceuta:{x:425,y:604},Melilla:{x:497,y:604}
};
const MAP_BASE_URL="https://commons.wikimedia.org/wiki/Special:Redirect/file/Blank_Spain_Map_(Autonomous_Communities).svg";
function displayName(name:string){return POINTS[name]?.label??name}
function valueFor(stats:PublicStats,community:string,key:MetricKey){if(key==="testimonios")return Number(stats.testimoniosPorComunidad?.[community]??0);if(key.startsWith("mociones"))return Number(stats.mociones?.[community]?.[key]??0);return Number(stats.porComunidad?.[community]?.[key]??0)}
function fill(value:number,max:number){if(max<=0)return "var(--map-land)";const ratio=Math.max(.12,Math.min(1,value/max));return `color-mix(in oklab, var(--map-adhesiones) ${Math.round(25+ratio*65)}%, var(--map-land))`}

export function TerritoryMap({stats}:{stats:PublicStats|null}){
  const [metric,setMetric]=useState<MetricKey>("adhesiones");
  const communities=Object.keys(POINTS);
  const values=useMemo(()=>communities.map(c=>({community:c,value:stats?valueFor(stats,c,metric):0})),[stats,metric]);
  const max=Math.max(...values.map(x=>x.value),1);
  return <div className="space-y-6">
    <div className="flex flex-wrap gap-2" role="group" aria-label="Elegir indicador del mapa">
      {METRICS.map(m=><button key={m.key} type="button" aria-pressed={metric===m.key} onClick={()=>setMetric(m.key)} className={metric===m.key?"rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground":"glass-soft rounded-full px-4 py-2.5 text-sm font-semibold text-primary"}>{m.label}</button>)}
    </div>
    <div className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
      <div className="overflow-hidden rounded-3xl border border-border bg-[var(--map-land)] shadow-sm">
        {!stats && <div className="p-3 text-sm" role="status">Cargando datos territoriales…</div>}
        <svg viewBox="0 0 923 658" role="img" aria-labelledby="territory-map-title territory-map-description" className="block h-auto w-full">
          <title id="territory-map-title">{METRICS.find(x=>x.key===metric)?.label} por comunidad autónoma</title>
          <desc id="territory-map-description">Mapa de España. Cada círculo indica el valor del indicador seleccionado. Debajo se ofrece una tabla accesible con los mismos datos.</desc>
          <image href={MAP_BASE_URL} x="0" y="0" width="923" height="658" preserveAspectRatio="none" opacity=".75" />
          <rect x="0" y="0" width="923" height="658" fill="var(--map-land)" opacity=".18" />
          {values.map(({community,value})=>{const p=POINTS[community]!; const r=10+Math.min(18,Math.sqrt(value)*.25); const selected=metric; const title=`${displayName(community)} · ${METRICS.find(x=>x.key===selected)?.label}: ${stats?formatCount(value):"Cargando"}`; return <g key={community} tabIndex={0}><title>{title}</title><circle cx={p.x} cy={p.y} r={r} fill={fill(value,max)} stroke="white" strokeWidth="3"/><text x={p.x} y={p.y+3} textAnchor="middle" fontSize={r>17?8:7} fontWeight="700" fill="var(--ink)">{stats?formatCount(value):"…"}</text><text x={p.x} y={p.y+r+14} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--ink)" paintOrder="stroke" stroke="white" strokeWidth="3">{displayName(community)}</text></g>})}
        </svg>
      </div>
      <div className="rounded-3xl border border-border bg-card p-5">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">{METRICS.find(x=>x.key===metric)?.label}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold">Por comunidad autónoma</h3>
        <div className="mt-4 max-h-[540px] overflow-auto">
          <table className="w-full text-sm"><caption className="sr-only">{METRICS.find(x=>x.key===metric)?.label} por comunidad autónoma</caption><thead><tr className="border-b border-border text-left"><th className="px-2 py-2">Comunidad</th><th className="px-2 py-2 text-right">Total</th></tr></thead><tbody>{values.sort((a,b)=>b.value-a.value).map(x=><tr key={x.community} className="border-b border-border/60"><th scope="row" className="px-2 py-2 text-left font-medium">{displayName(x.community)}</th><td className="px-2 py-2 text-right font-semibold">{stats?formatCount(x.value):"…"}</td></tr>)}</tbody></table>
        </div>
      </div>
    </div>
    <p className="text-xs leading-5 text-muted-foreground">El color y tamaño de los círculos representan el indicador seleccionado. Los datos son agregados y no permiten identificar a personas.</p>
  </div>;
}
