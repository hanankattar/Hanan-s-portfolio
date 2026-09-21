function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str == null ? '' : str;
  return div.innerHTML;
}

function renderThumb(project){
  if (project.cover){
    return `<div class="thumb"><img src="${escapeHtml(normalizeImageUrl(project.cover))}" alt="${escapeHtml(project.title)} cover photo" loading="lazy"></div>`;
  }
  return `<div class="thumb placeholder">add a cover photo<br>from the Admin page</div>`;
}

function renderTags(tech){
  return (tech || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
}

function renderRow(project, index){
  const num = String(index + 1).padStart(2, '0');
  const statusClass = project.status === 'in-progress' ? 'in-progress' : '';
  const statusLabel = project.status === 'in-progress' ? 'in progress' : 'complete';

  return `
    <a class="record-row" href="project.html?id=${encodeURIComponent(project.id)}">
      <span class="r-id">#${num}</span>
      ${renderThumb(project)}
      <div class="r-body">
        <h3 class="r-title">${escapeHtml(project.title)}</h3>
        <p class="r-summary">${escapeHtml(project.summary)}</p>
        <div class="tags">${renderTags(project.tech)}</div>
      </div>
      <span class="r-status ${statusClass}"><span class="dot"></span>${statusLabel}</span>
    </a>
  `;
}

function renderPinned(project){
  return `
    <a class="record-row" href="project.html?id=${encodeURIComponent(project.id)}" style="border: 1px solid var(--line); background: var(--card-bg); padding: 20px; border-radius: 2px; align-items: start;">
      <span class="r-id">senior<br>project</span>
      ${renderThumb(project)}
      <div class="r-body">
        <h3 class="r-title">${escapeHtml(project.title)}</h3>
        <p class="r-summary">${escapeHtml(project.summary)}</p>
        <div class="tags">${renderTags(project.tech)}</div>
      </div>
      <span class="r-status in-progress"><span class="dot"></span>in progress</span>
    </a>
  `;
}

function renderList(){
  const projects = loadProjects();
  const pinned = projects.filter(p => p.pinned);
  const rest = projects.filter(p => !p.pinned);

  const pinnedOuter = document.getElementById('pinned-outer');
  const pinnedContainer = document.getElementById('pinned-section');
  if (pinned.length > 0){
    pinnedOuter.style.display = '';
    pinnedContainer.innerHTML = `
      <div class="section-head">
        <h2>Senior project</h2>
        <span class="field-label">in progress</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:14px;">
        ${pinned.map(renderPinned).join('')}
      </div>
    `;
  } else {
    pinnedOuter.style.display = 'none';
    pinnedContainer.innerHTML = '';
  }

  const listContainer = document.getElementById('record-list');
  if (rest.length === 0){
    listContainer.innerHTML = `<div class="empty-state">No projects yet — add one from the Admin page</div>`;
    return;
  }
  listContainer.innerHTML = rest.map(renderRow).join('');
}

renderList();
