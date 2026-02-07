(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();function y(t){return t&&([t.quantity,t.unit,t.description].filter(Boolean).join(" ").trim()||t.description)||""}const g=t=>{const{cooking_time:e,image_url:i,ingredients:n=[],publisher:r,servings:s,source_url:c,title:a}=t,f=(n||[]).map(h=>`
              <div class="ingredient-item">
                <i class="fa-solid fa-check"></i>
                <span>${y(h)}</span>
              </div>
            `).join("");return`<div class="hero">
            <img class="image" src="${i}" alt="${a}" />
            <span class="recipe-tag">${a}</span>
          </div>
          <div class="recipe-meta">
            <span class="meta-item">
              <i class="fa-regular fa-clock"></i>
              ${e} MINUTES
            </span>
            <span class="meta-item">
              <i class="fa-regular fa-user"></i>
              <span class="servings-num">${s}</span> SERVINGS
              <div class="servings-controls">
                <button type="button" aria-label="Decrease servings">−</button>
                <button type="button" aria-label="Increase servings">+</button>
              </div>
            </span>
            <button type="button" class="bookmark-btn" aria-label="Bookmark">
              <i class="fa-regular fa-bookmark"></i>
            </button>
          </div>
          <div class="recipe-ingredients">
            <h3>Recipe Ingredients</h3>
            <div class="ingredients-grid">
              ${f}
            </div>
          </div>
          <div class="how-to-cook">
            <h3>How to Cook It</h3>
            <p>This recipe was carefully designed and tested by <strong>${r}</strong>. ${c?`Please <a href="${c}" target="_blank" rel="noopener">check out directions at their website</a>.`:""}</p>
          </div>`},v="https://forkify-api.jonas.io/api/v2",b=async t=>{try{const i=await(await fetch(`${v}/recipes/${t}`)).json(),n=i?.data?.recipe;if(console.log(n),!n){console.error("Recipe not found or invalid response",i);return}return n}catch(e){console.error(e)}};let o=document.querySelector("input"),$=document.querySelector(".recipe-list");const L="https://forkify-api.jonas.io/api/v2",k=async()=>{if(o.value){o.blur();try{const e=await(await fetch(`${L}/recipes?search=${o.value}`)).json();return console.log(e),$.innerHTML="",e?.data?.recipes}catch(t){console.log(t)}}};let I=document.querySelector(".recipe-list"),S=document.querySelector(".recipe-detail-panel"),w=document.querySelector(".recipe-detail-content"),l=document.getElementById("emoji"),d=document.getElementById("instruction");const m=async()=>{const t=await k();if(console.log(t),t.length===0){l.className="fa-solid fa-circle-exclamation",d.innerText="No recipes found. Try another keyword.",w.classList.add("hidden"),S.classList.remove("has-recipe");return}l.className="fa-regular fa-face-smile",d.innerText="Recipes found. Click any item to view details.",t.forEach(e=>{let i=document.createElement("div");i.className="recipe-item",I.appendChild(i),i.dataset.id=e.id,i.innerHTML=`
            <img src="${e.image_url}" alt="${e.title}"/>
            <div>
                <h4>${e.title}</h4>
                <p>${e.publisher}</p>
            </div>`})};let q=document.querySelector("input"),E=document.querySelector(".search-btn"),u=document.querySelector(".recipe-list"),N=document.querySelector(".recipe-detail-panel"),p=document.querySelector(".recipe-detail-content");u.addEventListener("click",async t=>{const e=t.target.closest(".recipe-item");if(!e)return;u.querySelectorAll(".recipe-item").forEach(r=>r.classList.remove("active")),e.classList.add("active");const i=e.dataset.id,n=await b(i);p.innerHTML=g(n),p.classList.remove("hidden"),N.classList.add("has-recipe")});E.addEventListener("click",m);q.addEventListener("keydown",t=>{t.key==="Enter"&&m()});
