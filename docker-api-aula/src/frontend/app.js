async function searchAndSave(title) {
  const res = await fetch(`/cheapshark/games/${encodeURIComponent(title)}`)
  const data = await res.json()
  renderResults(data)
}

function renderResults(list) {
  const out = document.getElementById('results')
  out.innerHTML = ''
  if (!Array.isArray(list) || list.length === 0) {
    out.textContent = 'Nenhum resultado.'
    return
  }

  for (const g of list) {
    const el = document.createElement('div')
    el.className = 'game'
    el.innerHTML = `
      <img src="${g.thumb || ''}" alt="thumb" />
      <div class="meta">
        <strong>${g.external || g.internalName}</strong>
        <div>Preço: ${g.cheapest}</div>
        <div>Steam: ${g.steamAppID || '—'}</div>
      </div>
    `
    out.appendChild(el)
  }
}

async function loadSaved() {
  const res = await fetch('/games')
  const list = await res.json()
  const out = document.getElementById('saved')
  out.innerHTML = ''
  if (!Array.isArray(list) || list.length === 0) {
    out.textContent = 'Nenhum jogo salvo.'
    return
  }

  for (const g of list) {
    const el = document.createElement('div')
    el.className = 'game small'
    el.innerHTML = `<strong>${g.internalName}</strong> — ${g.cheapest}`
    out.appendChild(el)
  }
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const title = document.getElementById('title').value.trim()
  if (!title) return alert('Digite um título')
  searchAndSave(title)
})

document.getElementById('refreshSaved').addEventListener('click', loadSaved)

loadSaved()
