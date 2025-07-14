// Lista ejemplo: reemplaza con tu propia lista
const materias = [
  "Fundamentos de Programación",
  "Matemática I",
  "Física I",
  "Estructura de Datos",
  "Base de Datos",
  "Sistemas Operativos",
  "Aplicaciones Móviles",
  "Seguridad Informática"
];

const malla = document.getElementById('malla');
const progreso = document.getElementById('progreso');

// Cargar desde LocalStorage
let cursadas = JSON.parse(localStorage.getItem('cursadas')) || [];

function actualizarProgreso() {
  const porcentaje = Math.round((cursadas.length / materias.length) * 100);
  progreso.textContent = `${porcentaje}%`;
}

materias.forEach((nombre, index) => {
  const div = document.createElement('div');
  div.textContent = nombre;
  div.classList.add('materia');
  if (cursadas.includes(index)) div.classList.add('cursada');

  div.onclick = () => {
    if (cursadas.includes(index)) {
      cursadas = cursadas.filter(i => i !== index);
      div.classList.remove('cursada');
    } else {
      cursadas.push(index);
      div.classList.add('cursada');
    }
    localStorage.setItem('cursadas', JSON.stringify(cursadas));
    actualizarProgreso();
  };

  malla.appendChild(div);
});

actualizarProgreso();

