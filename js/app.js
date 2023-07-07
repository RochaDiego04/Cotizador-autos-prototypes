
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

    // Agregar al HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);

}


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
    
    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarAlerta("Todos los campos son obligatorios","error");
        return
    }
    ui.mostrarAlerta("Cotizando...","exito");

    // Instanciar seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // Prototype para la ui y la cotización final
    // ui.mostrarResultado(total, seguro);
}