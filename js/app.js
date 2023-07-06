
// Constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
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

}