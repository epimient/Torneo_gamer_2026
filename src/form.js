// Torneo Gamer 2026 — Formulario de pre-registro
'use strict';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyc2K4Qm2CkGPLchBwfwF0cE2TEju9gHOO9-NBzFBRFn8LEzcTBvsq-6wcYRfksOIX8/exec';

let currentMode = '';

// --- Abrir / cerrar modal ---
window.openForm = function (mode) {
  currentMode = mode;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  resetForm();
};

window.closeForm = function (e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
};

// --- Navegación pasos ---
function resetForm() {
  document.getElementById('formStep1').style.display = 'block';
  document.getElementById('formStep2').style.display = 'none';
  document.getElementById('formConfirm').style.display = 'none';
  document.getElementById('formStep1Fields').reset();
  document.getElementById('codigoDisplay').textContent = 'TGA-000';
}

function validateStep1() {
  const nombre = document.getElementById('fieldNombre').value.trim();
  const programa = document.getElementById('fieldPrograma').value.trim();
  const correo = document.getElementById('fieldCorreo').value.trim();
  const telefono = document.getElementById('fieldTelefono').value.trim();
  if (!nombre || !programa || !correo || !telefono) {
    alert('Todos los campos son obligatorios');
    return false;
  }
  if (!correo.includes('@')) {
    alert('Correo electrónico inválido');
    return false;
  }
  return true;
}

window.goStep1 = function () {
  document.getElementById('formStep2').style.display = 'none';
  document.getElementById('formStep1').style.display = 'block';
};

window.goStep2 = function () {
  if (!validateStep1()) return;
  const title = document.getElementById('step2Title');
  const container = document.getElementById('formDynamic');
  container.innerHTML = '';

  if (currentMode === 'individual') {
    title.textContent = 'Juego individual';
    container.innerHTML = `
      <label class="form__field">
        <span class="form__label">Juego</span>
        <select class="form__select" id="fieldJuego">
          <option value="Clash Royale">Clash Royale</option>
          <option value="Mortal Kombat">Mortal Kombat</option>
          <option value="FIFA">FIFA</option>
        </select>
      </label>
      <label class="form__field">
        <span class="form__label">Nickname (opcional)</span>
        <input type="text" class="form__input" id="fieldNickname" placeholder="Tu nombre de jugador" />
      </label>
    `;
  } else if (currentMode === 'dupla') {
    title.textContent = 'Dupla — Brawlhalla';
    container.innerHTML = `
      <label class="form__field">
        <span class="form__label">Nombre de la dupla</span>
        <input type="text" class="form__input" id="fieldDupla" required />
      </label>
      <label class="form__field">
        <span class="form__label">Compa&ntilde;ero</span>
        <input type="text" class="form__input" id="fieldCompanero" placeholder="Nombre completo del compa&ntilde;ero" required />
      </label>
    `;
  } else if (currentMode === 'equipo') {
    title.textContent = 'Equipo — Valorant';
    let miembrosHTML = '';
    for (let i = 1; i <= 5; i++) {
      miembrosHTML += `
        <label class="form__field">
          <span class="form__label">Integrante ${i}${i === 1 ? ' (Capit&aacute;n)' : ''}</span>
          <input type="text" class="form__input" data-miembro="${i}" required />
        </label>
      `;
    }
    miembrosHTML += `
      <label class="form__field">
        <span class="form__label">Suplente (opcional)</span>
        <input type="text" class="form__input" data-miembro="6" />
      </label>
    `;
    container.innerHTML = `
      <label class="form__field">
        <span class="form__label">Nombre del equipo</span>
        <input type="text" class="form__input" id="fieldEquipo" required />
      </label>
      <div class="form__members-grid">
        ${miembrosHTML}
      </div>
    `;
  } else {
    title.textContent = 'Espectador solidario';
    container.innerHTML = `
      <p style="color:var(--color-on-surface-variant);font-size:14px;margin-bottom:var(--space-4);">
        Como espectador solidario apoyas la causa PRO STUDIATON. Puedes participar en rifas, retos rel&aacute;mpago y zona de espectadores.
      </p>
      <input type="hidden" id="fieldJuego" value="Espectador" />
    `;
  }

  document.getElementById('formStep1').style.display = 'none';
  document.getElementById('formStep2').style.display = 'block';
};

// --- Envío ---
window.submitForm = async function () {
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Registrando...';
  btn.disabled = true;

  const data = {
    nombre: document.getElementById('fieldNombre').value.trim(),
    programa: document.getElementById('fieldPrograma').value.trim(),
    correo: document.getElementById('fieldCorreo').value.trim(),
    telefono: document.getElementById('fieldTelefono').value.trim(),
    tipo: currentMode
  };

  if (currentMode === 'individual') {
    data.juego = document.getElementById('fieldJuego').value;
    data.nickname = document.getElementById('fieldNickname').value.trim();
  } else if (currentMode === 'dupla') {
    data.juego = 'Brawlhalla';
    data.dupla = document.getElementById('fieldDupla').value.trim();
    data.miembros = [
      data.nombre,
      document.getElementById('fieldCompanero').value.trim()
    ];
  } else if (currentMode === 'equipo') {
    data.juego = 'Valorant';
    data.equipo = document.getElementById('fieldEquipo').value.trim();
    const inputs = document.querySelectorAll('[data-miembro]');
    data.miembros = Array.from(inputs).map(inp => inp.value.trim()).filter(Boolean);
  } else {
    data.juego = 'Espectador';
  }

  let codigo = 'TGA-000';

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    // Con no-cors no podemos leer la respuesta
    // Generamos código local como fallback
    codigo = 'TGA-' + String(Math.floor(Math.random() * 900) + 100);
  } catch (err) {
    codigo = 'TGA-' + String(Math.floor(Math.random() * 900) + 100);
  }

  document.getElementById('codigoDisplay').textContent = codigo;
  document.getElementById('formStep2').style.display = 'none';
  document.getElementById('formConfirm').style.display = 'block';
  btn.textContent = 'Generar código de registro';
  btn.disabled = false;
};
