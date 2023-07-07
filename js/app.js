
// Constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// Realizar cotización con los datos
Seguro.prototype.cotizarSeguro = function() { // Debemos acceder a los datos del objeto, arrow function no es opción
    let cantidad;
    const base = 2000;
    
    switch (this.marca){
        case "1": 
            cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    // Leer el año. Cada año mas viejo, reduce el costo 3%
    const diferencia = new Date().getFullYear() - this.year;
    const descuento = diferencia * 0.03;
    cantidad -= (cantidad * descuento);

    /*
        Básico = 30% extra
        Completo = 50% extra
    */
   if(this.tipo === 'basico'){
        cantidad *= 1.3
   }
   else {
        cantidad *= 1.5
   }

   return cantidad
}

function UI() { }

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;
    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('OPTION');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarAlerta = (mensaje, tipo) => { // Podemos usar function o arrow function mientras no accedamos a las propiedades del objeto
    const div = document.createElement('DIV');

    if(tipo === 'error') {
        div.classList.add('error');
    } 
    else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;
    
    // Deshabilitar el botón hasta que termine la alerta
    const cotizarBtn = document.querySelector('#cotizar-btn');
    cotizarBtn.disabled = true;

    // Agregar al HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
        // Habilitar el boton de nuevo
        cotizarBtn.disabled = false;
    }, 2000);

}

UI.prototype.mostrarResultado = (total, seguro) => {
    const resultadoDiv = document.querySelector("#resultado");
    // Crear el resultado
    const div = document.createElement('DIV');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 2000);
}

UI.prototype.alertsDelete = function() {
    const formulario = document.querySelector('#cotizar-seguro');

    const errorElements = formulario.querySelectorAll('.error.mensaje.mt-10');
    errorElements.forEach(function(element) {
        element.remove();
    });

    const correctoElements = formulario.querySelectorAll('.correcto.mensaje.mt-10');
    correctoElements.forEach(function(element) {
        element.remove();
    });
};

// Instanciar objetos
const ui = new UI();

document.addEventListener('DOMContentLoaded', e => {
    ui.llenarOpciones(); // Llenar select con los años
});

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    // Leer marca seleccionada
    const marca = document.querySelector('#marca').value;

    // Leer año seleccionado
    const year = document.querySelector('#year').value;
    
    // Leer cobertura seleccionada
    const tipo = document.querySelector('input[name = "tipo"]:checked').value;
    
    // Ocultar alertas previas
    ui.alertsDelete();

    // Mostrar alertas
    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarAlerta("Todos los campos son obligatorios","error");
        return
    }
    ui.mostrarAlerta("Cotizando...","exito");

    // Ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }

    // Instanciar seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // Prototype para mostrar en la ui la cotización final
    ui.mostrarResultado(total, seguro);
}