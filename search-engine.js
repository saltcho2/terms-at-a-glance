(function(root){
  const normalize=value=>{
    let text=String(value||'').normalize('NFC').toLowerCase().trim();
    if(/^https?:\/\//.test(text)||/^[\w.-]+\.[a-z]{2,}(?:[/:?#]|$)/.test(text)){
      try{text=new URL(/^https?:\/\//.test(text)?text:'https://'+text).hostname;}catch{}
    }
    return text.replace(/^www\./,'').replace(/\/$/,'');
  };
  const initials=['r','R','s','e','E','f','a','q','Q','t','T','d','w','W','c','z','x','v','g'];
  const vowels=['k','o','i','O','j','p','u','P','h','hk','ho','hl','y','n','nj','np','nl','b','m','ml','l'];
  const finals=['','r','R','rt','s','sw','sg','e','f','fr','fa','fq','ft','fx','fv','fg','a','q','qt','t','T','d','w','c','z','x','v','g'];
  function keyboardSpelling(value){return [...value].map(char=>{const code=char.charCodeAt(0)-0xac00;if(code<0||code>=11172)return char;return initials[Math.floor(code/588)]+vowels[Math.floor(code%588/28)]+finals[code%28];}).join('').toLowerCase();}
  function distance(a,b){
    if(Math.abs(a.length-b.length)>2)return 99;
    const d=Array.from({length:a.length+1},(_,i)=>Array.from({length:b.length+1},(_,j)=>i?j?0:i:j));
    for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){
      d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
      if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
    }
    return d[a.length][b.length];
  }
  function create(catalog){
    const entries=Object.entries(catalog).map(([key,s])=>({key,values:[...new Set([key,s.name,s.domain,...(s.aliases||[])].map(normalize))]}));
    function matches(query,{exactOnly=false}={}){
      const q=normalize(query).slice(0,120);if(!q)return [];
      return entries.map(({key,values})=>{
        let score=99;
        for(const v of values){
          if(v===q){score=0;break;}
          if(exactOnly)continue;
          if(q.length>=4&&/[가-힣]/.test(v)&&keyboardSpelling(v)===q)score=Math.min(score,.5);
          if(q.length>=2&&v.startsWith(q))score=Math.min(score,1+v.length/1000);
          else if(q.length>=3&&v.includes(q))score=Math.min(score,2+v.length/1000);
          const koreanShort=/^[가-힣]{3,}$/.test(q)&&/^[가-힣]{3,}$/.test(v);
          if((q.length>=4&&v.length>=4||koreanShort)&&Math.abs(v.length-q.length)<=2){const diff=distance(q,v);if(diff<=(q.length>=8?2:1)&&diff/Math.max(q.length,v.length)<=(koreanShort?.34:.25))score=Math.min(score,3+diff+v.length/1000);}
        }
        return {key,score,exact:score===0};
      }).filter(x=>x.score<99).sort((a,b)=>a.score-b.score||catalog[a.key].name.localeCompare(catalog[b.key].name,'ko'));
    }
    return {matches};
  }
  root.TermsSearch={create,keyboardSpelling};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.TermsSearch;
})(typeof window!=='undefined'?window:globalThis);
