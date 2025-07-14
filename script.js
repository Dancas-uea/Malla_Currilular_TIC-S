// Datos de la malla curricular (simplificados)
const mallaData = {
    semesters: [
        {
            number: 1,
            courses: [
                { code: "UEA-L-UFB-005", name: "MATEMÁTICA I", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-027", name: "FUNDAMENTOS DE PROGRAMACIÓN", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-029", name: "FUNDAMENTOS DE TECNOLOGÍAS DE LA INFORMACIÓN", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-030", name: "FÍSICA I", credits: 2, hours: 32 },
                { code: "UEA-L-UFB-019", name: "REALIDAD NACIONAL", credits: 1, hours: 16 }
            ]
        },
        {
            number: 2,
            courses: [
                { code: "UEA-L-UFB-028", name: "MATEMÁTICA II", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-033", name: "ESTRUCTURA DE DATOS", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-034", name: "PROGRAMACIÓN ORIENTADA A OBJETOS", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-035", name: "FUNDAMENTOS DE SISTEMAS DIGITALES", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-036", name: "FÍSICA II", credits: 3, hours: 64 }
            ]
        },
        {
            number: 3,
            courses: [
                { code: "UEA-L-UFPTI-001", name: "SISTEMAS OPERATIVOS", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-002", name: "BASES DE DATOS", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-003", name: "REDES DE COMPUTADORAS", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-037", name: "ESTADÍSTICA", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-038", name: "METODOLOGÍA DE LA INVESTIGACIÓN", credits: 3, hours: 64 }
            ]
        },
        {
            number: 4,
            courses: [
                { code: "UEA-L-UFPTI-004", name: "ADMINISTRACIÓN DE SISTEMAS OPERATIVOS", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-005", name: "ADMINISTRACIÓN DE BASES DE DATOS", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-006", name: "TECNOLOGÍAS DE CONMUTACIÓN Y ENRUTAMIENTO", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-007", name: "INGENIERÍA DE SOFTWARE", credits: 3, hours: 64 },
                { code: "UEA-L-UFB-010", name: "REDACCIÓN DE INFORMES TÉCNICOS", credits: 3, hours: 64 }
            ]
        },
        {
            number: 5,
            courses: [
                { code: "UEA-L-UFPTI-008", name: "SISTEMAS EMBEBIDOS", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-009", name: "APLICACIONES MÓVILES", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-010", name: "INTERACCIÓN HUMANO - COMPUTADOR", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-011", name: "SISTEMAS DISTRIBUIDOS", credits: 3, hours: 64 },
                { code: "UEA-L-UFPTI-012", name: "DESARROLLO DE APLICACIONES WEB", credits: 3, hours: 64 }
            ]
        },
        {
            number: 6,
            courses: [
                { code: "UEA-L-UFPTI-013", name: "REDES INALÁMBRICAS DE SENSORES", credits: 3, hours: 48 },
                { code: "UEA-L-UFPTI-014", name: "ESCALABILIDAD DE REDES", credits: 3, hours: 48 },
                { code: "UEA-L-UFPTI-015", name: "SEGURIDAD INFORMÁTICA", credits: 3, hours: 48 },
                { code: "UEA-L-UFPTI-016", name: "MINERÍA DE DATOS", credits: 3, hours: 48 },
                { code: "UEA-L-UFB-021", name: "PRÁCTICAS DE SERVICIO COMUNITARIO", credits: 3, hours: 144 }
            ]
        },
        {
            number: 7,
            courses: [
                { code: "UEA-L-UFPTI-017", name: "GESTIÓN Y GOBIERNO DE TI", credits: 3, hours: 48 },
                { code: "UEA-L-UFPTI-018", name: "LEGISLACIÓN INFORMÁTICA", credits: 3, hours: 48 },
                { code: "UEA-L-UFPTI-019", name: "DEONTOLOGÍA DE LA PRAXIS PROFESIONAL", credits: 3, hours: 48 },
                { code: "UEA-L-UTTI-001", name: "PRÁCTICAS LABORALES I", credits: 4, hours: 144 },
                { code: "UEA-L-UFB-031", name: "EMPRENDIMIENTO", credits: 2, hours: 32 }
            ]
        },
        {
            number: 8,
            courses: [
                { code: "UEA-L-UTTI-002", name: "GESTIÓN DE PROYECTO TI", credits: 3, hours: 64 },
                { code: "UEA-L-UTTI-003", name: "REDACCIÓN CIENTÍFICA", credits: 3, hours: 64 },
                { code: "UEA-L-UTTI-004", name: "PRÁCTICAS LABORALES II", credits: 6, hours: 240 },
                { code: "UEA-L-UFB-006", name: "INSTALACIONES ELÉCTRICAS Y DE CABLEADO ESTRUCTURADO", credits: 1, hours: 16 }
            ]
        }
    ],
    totalCredits: 120,
    totalHours: 5760
};

// Variables globales
let completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];
let progressChart = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderSemesters();
    renderProgressChart();
    updateProgress();

    // Event listeners para los botones
    document.getElementById('save-btn').addEventListener('click', saveProgress);
    document.getElementById('reset-btn').addEventListener('click', resetProgress);
});

// Renderizar los semestres
function renderSemesters() {
    const semestersContainer = document.querySelector('.semesters-container');
    semestersContainer.innerHTML = '';

    mallaData.semesters.forEach(semester => {
        const semesterElement = document.createElement('div');
        semesterElement.className = 'semester';

        const semesterHeader = document.createElement('div');
        semesterHeader.className = 'semester-header';
        semesterHeader.textContent = `Semestre ${semester.number}`;

        const coursesList = document.createElement('div');
        coursesList.className = 'courses-list';

        semester.courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course';
            if (completedCourses.includes(course.code)) {
                courseElement.classList.add('completed');
            }

            courseElement.innerHTML = `
                ${course.name}
                <span class="course-credits">${course.credits} créditos</span>
            `;

            courseElement.addEventListener('click', () => {
                toggleCourseCompletion(course.code);
            });

            coursesList.appendChild(courseElement);
        });

        semesterElement.appendChild(semesterHeader);
        semesterElement.appendChild(coursesList);
        semestersContainer.appendChild(semesterElement);
    });
}

// Alternar el estado de completado de un curso
function toggleCourseCompletion(courseCode) {
    const index = completedCourses.indexOf(courseCode);
    if (index === -1) {
        completedCourses.push(courseCode);
    } else {
        completedCourses.splice(index, 1);
    }

    // Actualizar la UI
    renderSemesters();
    updateProgress();
    updateChart();
}

// Calcular el progreso
function calculateProgress() {
    let completedCredits = 0;
    let completedCoursesCount = 0;
    const semesterProgress = Array(8).fill(0);

    mallaData.semesters.forEach((semester, index) => {
        semester.courses.forEach(course => {
            if (completedCourses.includes(course.code)) {
                completedCredits += course.credits;
                completedCoursesCount++;
                semesterProgress[index]++;
            }
        });
    });

    const percentage = Math.round((completedCredits / mallaData.totalCredits) * 100);

    return {
        percentage,
        completedCredits,
        completedCoursesCount,
        semesterProgress,
        totalCourses: mallaData.semesters.reduce((total, semester) => total + semester.courses.length, 0)
    };
}

// Actualizar la barra de progreso
function updateProgress() {
    const progress = calculateProgress();
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    progressFill.style.width = `${progress.percentage}%`;
    progressText.textContent = `${progress.percentage}% completado (${progress.completedCredits}/${mallaData.totalCredits} créditos)`;
}

// Renderizar el gráfico de progreso
function renderProgressChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    const progress = calculateProgress();
    const semesterLabels = mallaData.semesters.map((_, index) => `Semestre ${index + 1}`);
    const semesterData = progress.semesterProgress.map((count, index) => {
        return {
            count,
            total: mallaData.semesters[index].courses.length
        };
    });

    progressChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: semesterLabels,
            datasets: [
                {
                    label: 'Cursos completados',
                    data: semesterData.map(d => d.count),
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Total de cursos',
                    data: semesterData.map(d => d.total),
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1,
                    type: 'bar'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(...mallaData.semesters.map(s => s.courses.length)) + 1,
                    title: {
                        display: true,
                        text: 'Número de cursos'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Semestres'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const data = semesterData[context.dataIndex];
                            
                            if (context.datasetIndex === 0) {
                                return `${label}: ${data.count} de ${data.total}`;
                            }
                            return `${label}: ${data.total}`;
                        }
                    }
                },
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Actualizar el gráfico
function updateChart() {
    const progress = calculateProgress();
    const semesterData = progress.semesterProgress.map((count, index) => {
        return {
            count,
            total: mallaData.semesters[index].courses.length
        };
    });

    progressChart.data.datasets[0].data = semesterData.map(d => d.count);
    progressChart.update();
}

// Guardar el progreso en localStorage
function saveProgress() {
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    alert('Progreso guardado correctamente');
}

// Reiniciar el progreso
function resetProgress() {
    if (confirm('¿Estás seguro de que quieres reiniciar tu progreso? Esta acción no se puede deshacer.')) {
        completedCourses = [];
        localStorage.removeItem('completedCourses');
        renderSemesters();
        updateProgress();
        updateChart();
    }
}
