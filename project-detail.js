function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str == null ? '' : str;
  return div.innerHTML;
}

function getIdFromUrl(){
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderNotFound(container){
  container.innerHTML = `
    <section class="detail-header">
      <div class="wrap">
        <p class="breadcrumb"><a href="projects.html">← all projects</a></p>
        <h1>Project not found</h1>
        <p class="tagline">This project doesn't exist yet — check the link, or add it from the Admin page.</p>
        <a class="btn primary" href="projects.html">Back to projects</a>
      </div>
    </section>
  `;
}

function renderHeroImage(project){
  if (project.cover){
    return `<div class="hero-image"><img src="${escapeHtml(project.cover)}" alt="${escapeHtml(project.title)} cover photo"></div>`;
  }
  return `<div class="hero-image placeholder">no cover photo yet — add one from the Admin page</div>`;
}

function renderGallery(project){
  if (!project.gallery || project.gallery.length === 0) return '';
  const items = project.gallery.map(src =>
    `<div class="g-item"><img src="${escapeHtml(src)}" alt="${escapeHtml(project.title)} screenshot"></div>`
  ).join('');
  return `
    <h3>Screens</h3>
    <div class="gallery">${items}</div>
  `;
}

function renderCode(project){
  if (!project.code) return '';
  return `
    <h3>Code sample</h3>
    <div class="code-block">${escapeHtml(project.code)}</div>
  `;
}

function renderDescription(project){
  return (project.description || []).map(p => `<p>${escapeHtml(p)}</p>`).join('');
}

function renderHighlights(project){
  if (!project.highlights || project.highlights.length === 0) return '';
  const items = project.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('');
  return `<h3>Highlights</h3><ul>${items}</ul>`;
}

function renderLinks(project){
  const l = project.links || {};
  const rows = [];
  if (l.repo) rows.push(`<a class="btn ghost" href="${escapeHtml(l.repo)}" target="_blank" rel="noopener">View code</a>`);
  if (l.demo) rows.push(`<a class="btn primary" href="${escapeHtml(l.demo)}" target="_blank" rel="noopener">Live demo</a>`);
  if (rows.length === 0) return '';
  return `<div class="side-field"><div class="k">links</div><div class="v" style="display:flex; flex-direction:column; gap:8px;">${rows.join('')}</div></div>`;
}

function renderPrevNext(project, allProjects){
  const idx = allProjects.findIndex(p => p.id === project.id);
  const prev = allProjects[idx - 1];
  const next = allProjects[idx + 1];
  return `
    <div class="detail-nav">
      <span>${prev ? `<a href="project.html?id=${encodeURIComponent(prev.id)}">← ${escapeHtml(prev.title)}</a>` : ''}</span>
      <a href="projects.html">all projects</a>
      <span>${next ? `<a href="project.html?id=${encodeURIComponent(next.id)}">${escapeHtml(next.title)} →</a>` : ''}</span>
    </div>
  `;
}

function renderProject(project, allProjects){
  const statusLabel = project.status === 'in-progress' ? 'In progress' : 'Complete';

  return `
    <section class="detail-header">
      <div class="wrap">
        <p class="breadcrumb"><a href="projects.html">projects</a> / ${escapeHtml(project.title)}</p>
        <h1>${escapeHtml(project.title)}</h1>
        <p class="tagline">${escapeHtml(project.tagline || project.summary)}</p>
        <div class="detail-meta">
          <div>
            <div class="k">status</div>
            <div class="v">${escapeHtml(statusLabel)}</div>
          </div>
          <div>
            <div class="k">role</div>
            <div class="v">${escapeHtml(project.role || '—')}</div>
          </div>
          <div>
            <div class="k">stack</div>
            <div class="v">${escapeHtml((project.tech || []).slice(0,3).join(', ')) || '—'}${project.tech && project.tech.length > 3 ? '…' : ''}</div>
          </div>
          <div>
            <div class="k">year</div>
            <div class="v">${escapeHtml(project.year || '—')}</div>
          </div>
        </div>
        ${renderHeroImage(project)}
      </div>
    </section>

    <section style="border-bottom:none;">
      <div class="wrap">
        <div class="detail-body">
          <div class="prose">
            <h3>Overview</h3>
            ${renderDescription(project)}
            ${renderHighlights(project)}
            ${renderGallery(project)}
            ${renderCode(project)}
          </div>
          <aside>
            <div class="side-field" style="border-top:none;">
              <div class="k">tech stack</div>
              <div class="v tags">${(project.tech || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('') || '—'}</div>
            </div>
            ${renderLinks(project)}
            <div class="side-field">
              <a class="btn ghost" href="admin.html">Edit this project →</a>
            </div>
          </aside>
        </div>
        ${renderPrevNext(project, allProjects)}
      </div>
    </section>
  `;
}

function init(){
  const container = document.getElementById('detail-main');
  const id = getIdFromUrl();
  const allProjects = loadProjects();
  const project = allProjects.find(p => p.id === id);

  if (!project){
    renderNotFound(container);
    document.title = 'Project not found — Hanan Khoder Kattar';
    return;
  }

  container.innerHTML = renderProject(project, allProjects);
  document.title = `${project.title} — Hanan Khoder Kattar`;
}

init();
