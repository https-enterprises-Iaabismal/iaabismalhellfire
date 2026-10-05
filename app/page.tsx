"use client"
import Link from "next/link"
export default function Home(){
 return (
 <div style={{background:'#070709',color:'#F5F1E8',minHeight:'100vh',fontFamily:'serif'}}>
  <header style={{display:'flex',justifyContent:'space-between',padding:'16px 24px',borderBottom:'1px solid #1A1817',alignItems:'center'}}>
   <div style={{display:'flex',gap:'12px',alignItems:'center'}}><div style={{background:'#C2362C',width:'32px',height:'32px',display:'grid',placeItems:'center',borderRadius:'8px',fontWeight:'bold'}}>H</div><b>HELLFIRE</b></div>
   <Link href="/feed/metal" style={{background:'#D63A2F',color:'#fff',padding:'10px 18px',borderRadius:'999px',textDecoration:'none',fontSize:'13px'}}>Feed Metal →</Link>
  </header>
  <div style={{maxWidth:'1200px',margin:'0 auto',padding:'48px 24px',display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'32px'}}>
   <div>
    <div style={{color:'#D63A2F',fontSize:'11px',letterSpacing:'0.2em'}}>IA ABISMAL · AEROCORE-X</div>
    <h1 style={{fontSize:'54px',lineHeight:'1.05',margin:'16px 0'}}>EL NÚCLEO<br/>DEL METAL,<br/>EN PRODUCCIÓN.</h1>
    <p style={{color:'#8A8885',maxWidth:'420px',lineHeight:'1.6'}}>Hellfire indexa mil pistas extremas, aplica acceso por nivel y deja el catálogo listo para radios, sellos y productos de nicho.</p>
    <div style={{display:'flex',gap:'12px',marginTop:'24px'}}><Link href="/feed/metal" style={{background:'#D63A2F',color:'#fff',padding:'14px 24px',borderRadius:'999px',textDecoration:'none'}}>Empezar gratis →</Link><Link href="/feed/metal" style={{background:'#161413',color:'#fff',padding:'14px 24px',borderRadius:'999px',textDecoration:'none',border:'1px solid #232020'}}>Ver niveles</Link></div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginTop:'48px',maxWidth:'400px'}}><div><div style={{fontSize:'10px',color:'#6A6865'}}>PISTAS ÚNICAS</div><div style={{fontSize:'32px'}}>1.000</div></div><div><div style={{fontSize:'10px',color:'#6A6865'}}>SUBGÉNEROS</div><div style={{fontSize:'32px'}}>10</div></div><div><div style={{fontSize:'10px',color:'#6A6865'}}>NIVELES DE ACCESO</div><div style={{fontSize:'32px'}}>3</div></div><div><div style={{fontSize:'10px',color:'#6A6865'}}>BANDAS INDEXADAS</div><div style={{fontSize:'32px'}}>105</div></div></div>
   </div>
   <div style={{background:'#151313',border:'1px solid #232020',borderRadius:'20px',padding:'16px',height:'fit-content'}}><div style={{fontSize:'10px',color:'#6A6865'}}>AHORA</div><div style={{fontWeight:'bold'}}>FREEZING MOON</div><div style={{fontSize:'12px',color:'#8A8885'}}>Mayhem · 1994</div><div style={{height:'4px',background:'#232020',margin:'12px 0'}}><div style={{width:'40%',height:'100%',background:'#D63A2F'}}/></div><div style={{fontSize:'13px',display:'grid',gap:'10px'}}><div style={{background:'#1E1C1B',padding:'10px',borderRadius:'10px'}}>▶ Freezing Moon - Mayhem · Black <span style={{float:'right',fontSize:'10px'}}>Free</span></div><div>▷ Altars of Madness - Morbid Angel · Death</div><div>▷ Raining Blood - Slayer · Thrash</div><div>🔒 In the Nightside Eclipse - Emperor · Black - Pro</div></div></div>
  </div>
 </div>
 )
}
