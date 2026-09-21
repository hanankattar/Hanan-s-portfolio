function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str == null ? '' : str;
  return div.innerHTML;
}

let editingId = null;
let coverDataUrl = "";
let galleryDataUrls = [];

const els = {
  list: document.getElementById('admin-list'),
  count: document.getElementById('project-count'),
  form: document.getElementById('project-form'),
  formHeading: document.getElementById('form-heading'),
  formModeLabel: document.getElementById('form-mode-label'),
  submitBtn: document.getElementById('btn-submit'),
  cancelBtn: document.getElementById('btn-cancel'),
  formStatus: document.getElementById('form-status'),
  toolbarStatus: document.getElementById('toolbar-status'),

  title: document.getElementById('f-title'),
  status: document.getElementById('f-status'),
  summary: document.getElementById('f-summary'),
  tagline: document.getElementById('f-tagline'),
  role: document.getElementById('f-role'),
  year: document.getElementById('f-year'),
  tech: document.getElementById('f-tech'),
  description: document.getElementById('f-description'),
  highlights: document.getElementById('f-highlights'),
  code: document.getElementById('f-code'),
  coverUpload: document.getElementById('f-cover-upload'),
  coverPath: document.getElementById('f-cover-path'),
  coverPreviewWrap: document.getElementById('cover-preview'),
  coverPreviewImg: document.getElementById('cover-preview-img'),
  galleryUpload: document.getElementById('f-gallery-upload'),
  galleryPreview: document.getElementById('gallery-preview'),
  repo: document.getElementById('f-repo'),
  demo: document.getElementById('f-demo'),
  pinned: document.getElementById('f-pinned'),
};

function renderList(){
  const projects = loadProjects();
  els.count.textContent = `${projects.length} project${projects.length === 1 ? '' : 's'}`;

  if (projects.length === 0){
    els.list.innerHTML = `<div class="empty-state">No projects yet — add one below</div>`;
    return;
  }

  els.list.innerHTML = projects.map((p, i) => `
    <div class="admin-row">
      <span class="a-id">#${String(i+1).padStart(2,'0')}</span>
      <div>
        <div class="a-title">${escapeHtml(p.title)}${p.pinned ? ' <span class="tag" style="margin-left:6px;">senior project</span>' : ''}</div>
        <div class="a-meta">${escapeHtml(p.status === 'in-progress' ? 'in progress' : 'complete')} · ${escapeHtml(p.id)}</div>
      </div>
      <a class="btn-small" href="project.html?id=${encodeURIComponent(p.id)}" target="_blank">View</a>
      <span style="display:flex; gap:8px;">
        <button type="button" class="btn-small" data-edit="${escapeHtml(p.id)}">Edit</button>
        <button type="button" class="btn-small danger" data-delete="${escapeHtml(p.id)}">Delete</button>
      </span>
    </div>
  `).join('');

  els.list.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => startEdit(btn.getAttribute('data-edit')));
  });
  els.list.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-delete');
      const project = loadProjects().find(p => p.id === id);
      if (confirm(`Delete "${project ? project.title : id}"? This can't be undone.`)){
        deleteProject(id);
        if (editingId === id) resetForm();
        renderList();
      }
    });
  });
}

function resetForm(){
  editingId = null;
  coverDataUrl = "";
  galleryDataUrls = [];
  els.form.reset();
  els.coverPreviewWrap.style.display = 'none';
  els.galleryPreview.innerHTML = '';
  els.formHeading.textContent = 'Add a new project';
  els.formModeLabel.textContent = 'new';
  els.submitBtn.textContent = 'Add project';
  els.cancelBtn.style.display = 'none';
  els.formStatus.textContent = '';
}

function startEdit(id){
  const project = loadProjects().find(p => p.id === id);
  if (!project) return;

  editingId = id;
  coverDataUrl = project.cover && project.cover.startsWith('data:') ? project.cover : "";
  galleryDataUrls = (project.gallery || []).filter(g => g.startsWith('data:'));

  els.title.value = project.title || '';
  els.status.value = project.status || 'done';
  els.summary.value = project.summary || '';
  els.tagline.value = project.tagline || '';
  els.role.value = project.role || '';
  els.year.value = project.year || '';
  els.tech.value = (project.tech || []).join(', ');
  els.description.value = (project.description || []).join('\n');
  els.highlights.value = (project.highlights || []).join('\n');
  els.code.value = project.code || '';
  els.coverPath.value = (project.cover && !project.cover.startsWith('data:')) ? project.cover : '';
  els.repo.value = (project.links && project.links.repo) || '';
  els.demo.value = (project.links && project.links.demo) || '';
  els.pinned.checked = !!project.pinned;

  if (project.cover){
    els.coverPreviewWrap.style.display = '';
    els.coverPreviewImg.src = project.cover;
  } else {
    els.coverPreviewWrap.style.display = 'none';
  }
  renderGalleryPreview();

  els.formHeading.textContent = `Editing: ${project.title}`;
  els.formModeLabel.textContent = 'editing';
  els.submitBtn.textContent = 'Save changes';
  els.cancelBtn.style.display = '';
  els.formStatus.textContent = '';

  els.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderGalleryPreview(){
  els.galleryPreview.innerHTML = galleryDataUrls.map((src, i) => `
    <div style="width:70px;height:52px;border:1px solid var(--line);border-radius:2px;overflow:hidden;position:relative;">
      <img src="${src}" style="width:100%;height:100%;object-fit:cover;">
    </div>
  `).join('');
}

els.coverUpload.addEventListener('change', () => {
  const file = els.coverUpload.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    coverDataUrl = reader.result;
    els.coverPreviewWrap.style.display = '';
    els.coverPreviewImg.src = coverDataUrl;
    els.coverPath.value = '';
  };
  reader.readAsDataURL(file);
});

els.galleryUpload.addEventListener('change', () => {
  const files = Array.from(els.galleryUpload.files || []);
  let remaining = files.length;
  if (remaining === 0) return;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      galleryDataUrls.push(reader.result);
      renderGalleryPreview();
    };
    reader.readAsDataURL(file);
  });
});

els.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const cover = coverDataUrl || els.coverPath.value.trim();

  const project = {
    id: editingId || "",
    title: els.title.value.trim(),
    status: els.status.value,
    summary: els.summary.value.trim(),
    tagline: els.tagline.value.trim(),
    role: els.role.value.trim(),
    year: els.year.value.trim(),
    tech: els.tech.value.split(',').map(s => s.trim()).filter(Boolean),
    description: els.description.value.split('\n').map(s => s.trim()).filter(Boolean),
    highlights: els.highlights.value.split('\n').map(s => s.trim()).filter(Boolean),
    code: els.code.value,
    cover: cover,
    gallery: galleryDataUrls.slice(),
    links: {
      repo: els.repo.value.trim(),
      demo: els.demo.value.trim()
    },
    pinned: els.pinned.checked
  };

  if (!project.title || !project.summary){
    els.formStatus.textContent = 'Title and summary are required.';
    return;
  }

  if (editingId){
    updateProject(editingId, project);
    els.formStatus.textContent = 'Saved.';
  } else {
    addProject(project);
    els.formStatus.textContent = 'Added.';
  }

  renderList();
  resetForm();
});

els.cancelBtn.addEventListener('click', resetForm);

document.getElementById('btn-export-datajs').addEventListener('click', () => {
  downloadTextFile('data.js', exportAsDataJsSource());
  els.toolbarStatus.textContent = 'Downloaded data.js — replace js/data.js with this file to save your changes permanently.';
});

document.getElementById('btn-export-json').addEventListener('click', () => {
  downloadTextFile('projects-backup.json', exportAsJson());
  els.toolbarStatus.textContent = 'Downloaded a JSON backup of your current project list.';
});

document.getElementById('import-file').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      importFromJson(reader.result);
      renderList();
      els.toolbarStatus.textContent = 'Imported successfully.';
    } catch (err){
      els.toolbarStatus.textContent = 'Import failed — make sure the file is a valid backup JSON.';
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});

document.getElementById('btn-reset').addEventListener('click', () => {
  if (confirm('Reset the project list back to the original starting set? This discards everything you\'ve added or changed here.')){
    resetToDefaults();
    renderList();
    resetForm();
    els.toolbarStatus.textContent = 'Reset to the starting project list.';
  }
});

renderList();

/* ---------- password gate ---------- */
const lockScreen = document.getElementById('lock-screen');
const adminContent = document.getElementById('admin-content');
const lockForm = document.getElementById('lock-form');
const lockPassword = document.getElementById('lock-password');
const lockStatus = document.getElementById('lock-status');

function unlock(){
  lockScreen.style.display = 'none';
  adminContent.style.display = '';
}

if (isAdminAuthed()){
  unlock();
}

lockForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ok = await checkAdminPassword(lockPassword.value);
  if (ok){
    setAdminAuthed();
    unlock();
  } else {
    lockStatus.textContent = 'Incorrect password.';
    lockPassword.value = '';
    lockPassword.focus();
  }
});

document.getElementById('logout-link').addEventListener('click', (e) => {
  e.preventDefault();
  clearAdminAuthed();
  location.reload();
});
