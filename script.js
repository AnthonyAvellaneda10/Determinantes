tamMatriz = 3;

function aumentar(op){
    if (op == '+') {
      tamMatriz++;
    } else {

        if(tamMatriz > 1){
            tamMatriz--;
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mínimo matriz de orden 1',
                confirmButtonText: 'Entendido',
                footer: '¡Recuerde que lo mínimo para ser una matriz, es de orden 1!',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            })
        }
    }
    generarMatriz(tamMatriz)
}

function generarMatriz(tamMatriz){

  document.getElementById('fila').innerHTML = tamMatriz;
  document.getElementById('columna').innerHTML = tamMatriz;

  c=new String();
  e=document.getElementById('matriz_generada');
  // c +=`<table name"tblMatrices" id="tblMatrices" border=1>`;
  // c+=`<tr>`;
  
  // c+='<td align="center" valing="middle">';
  c+='<table name="tblMtzA" id="tablaNumeros">';
  
  // c+='<thead>'
  // c+='<tr>'
  // for(k = 0; k < tamMatriz; k++){
  //     c+='<th> COLUMNA '+ (k+1) +'</th>' 
  // }
  // c+='</tr>'
  // c+='</thead>'

  for ( i = 0; i < tamMatriz; i++) {
      
      c+='<tr>';
      for ( j = 0; j < tamMatriz; j++) {
          c+='<td><input autocomplete="off" name="Números" id="number" class="input" type="text" autofocus></td>';
          // c+='<td><input type="text" size="1" placeholder="0"/></td>';
      }
      c+='</tr>';
  }
  c+='</table>';

  e.innerHTML=c;
  
  
}

generarMatriz(tamMatriz)

function multiplicarPorN(){
  
  let numeros = [];
  numeros = operacionMatriz()
  let valor = document.getElementById('exponente');
  let exponente = parseFloat(valor.value);

  if (exponente == '' || exponente == null || exponente == undefined) {
    alert("No ingreso nada")
  }else{
    // Realizar la operación matricial deseada
    let resultado = []; // Aquí debe implementar la operación deseada
    for (let i = 0; i < numeros.length; i++) {
        resultado.push([]);
        for (let j = 0; j < numeros[i].length; j++) {
            resultado[i].push(numeros[i][j] * exponente); // Ejemplo de multiplicar por 2
        }
    }
    
    // Crear una tabla con el resultado de la operación
    let tablaResultado = document.createElement('table');
    for (let i = 0; i < resultado.length; i++) {
        let fila = document.createElement('tr');
        for (let j = 0; j < resultado[i].length; j++) {
            let celda = document.createElement('td');
            if (Number.isInteger(resultado[i][j])) {
              celda.innerText = resultado[i][j].toString();
            }else{
              celda.innerText = resultado[i][j].toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 3});;

            }
            fila.appendChild(celda);
        }
        tablaResultado.appendChild(fila);
    }
    
    // Reemplazar la tabla de inputs por la tabla con el resultado de la operación
    let matrizGenerada = document.getElementById('resultado');
    matrizGenerada.innerHTML = '';
    matrizGenerada.appendChild(tablaResultado);

  }
  
  
}

function elevarMatriz() {
  let tabla = document.getElementById('resultado');
  tabla.innerHTML = ''; // borra el contenido anterior de la tabla
  
  let valor = document.getElementById('exponente-1');
  let exponente = parseFloat(valor.value);

  if (exponente == '' || exponente == null || exponente == undefined) {
    alert("No ingreso nada")
  }
  else if (!valido()) {
    Swal.fire({
      title: '¡Ups!',
      text: 'No puede dejar campos vacíos',
      icon: 'warning',
      confirmButtonText: 'Entendido',
      footer: '¡Todos los campos son obligatorios!',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
  });
  }
  else{
    let matriz = [];
    // numeros = operacionMatriz()
    matriz = operacionMatriz();

    mostrarLoader()

    setTimeout(() => {
      let resultado = elevar(matriz, exponente);
      mostrarResultado(resultado);
      ocultarLoader();
    }, 1000); // Esperar un segundo antes de mostrar el resultado

    // let resultado = elevar(matriz, exponente);
    // mostrarResultado(resultado);
  }
  
}

function elevar(matriz, exponente) {
  let resultado = matriz;
  for (let i = 1; i < exponente; i++) {
    resultado = multiplicar(resultado, matriz);
  }
  return resultado;
}

function multiplicar(matriz1, matriz2) {
  let resultado = [];
  for (let i = 0; i < matriz1.length; i++) {
    resultado[i] = [];
    for (let j = 0; j < matriz1.length; j++) {
      resultado[i][j] = 0;
      for (let k = 0; k < matriz1.length; k++) {
        resultado[i][j] += matriz1[i][k] * matriz2[k][j];
      }
    }
  }
  return resultado;
}

function mostrarResultado(resultado) {
  
  let tabla = document.getElementById('resultado');

  // tabla = '';
  let html = '';
  html += '<table>';
  for (let i = 0; i < resultado.length; i++) {
    html += '<tr>';
    for (let j = 0; j < resultado.length; j++) {

      if (Number.isInteger(resultado[i][j])) {
        // resultado.innerHTML = "La determinante es: " + det.toString();
        html += '<td>' + resultado[i][j].toString() + '</td>';
      } else {
        // resultado.innerHTML = "La determinante es: " + det.toFixed(3);
        html += '<td>' + resultado[i][j].toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 3}); + '</td>';
      }
      // html += '<td>' + resultado[i][j] + '</td>';
    }
    html += '</tr>';
  }
  html += '</table>'
  tabla.innerHTML = html;

  // Ocultar el loader
  // let loader = document.querySelector('.loader');
  // loader.classList.remove('show');
}


function calcularDeterminante() {
  // Capturar valores de la matriz
  let matriz = [];
  let tabla = document.getElementById("tablaNumeros");
  for (let i = 0; i < tabla.rows.length; i++) {
    matriz.push([]);
    for (let j = 0; j < tabla.rows[i].cells.length; j++) {
      let valor = parseFloat(tabla.rows[i].cells[j].querySelector("input").value);
      if (isNaN(valor)) {
        valor = 0;
      }
      matriz[i].push(valor);
    }
  }

  // Calcular determinante
  let det = determinante(matriz);
  
  // Mostrar resultado
  let resultado = document.getElementById("resultado");

  if (Number.isInteger(det)) {
    resultado.innerHTML = "La determinante es: " + det.toString();
  } else {
    resultado.innerHTML = "La determinante es: " + det.toFixed(3);
  }

  
}

function determinante(matriz) {
  let n = matriz.length;
  if (n == 1) {
    return matriz[0][0];
  }
  if (n == 2) {
    return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
  }
  let det = 0;
  for (let i = 0; i < n; i++) {
    let submatriz = [];
    for (let j = 1; j < n; j++) {
      submatriz.push([]);
      for (let k = 0; k < n; k++) {
        if (k != i) {
          submatriz[j - 1].push(matriz[j][k]);
        }
      }
    }
    det += matriz[0][i] * Math.pow(-1, i) * determinante(submatriz);
  }
  return det;
}


function calcularTranspuesta() {
  let numeros = [];
  let tablaNumeros = document.getElementById('tablaNumeros');

  // Obtener los valores ingresados en la tabla de inputs
  for (let i = 0; i < tablaNumeros.rows.length; i++) {
    numeros.push([]);
    for (let j = 0; j < tablaNumeros.rows[i].cells.length; j++) {
      let valor = parseFloat(tablaNumeros.rows[i].cells[j].querySelector('input').value);
      if (isNaN(valor)) {
        valor = 0; // Si el usuario no ingresó un número, consideramos que es 0
      }
      numeros[i].push(valor);
    }
  }

  let transpuesta = [];
  for (let i = 0; i < numeros.length; i++) {
    transpuesta.push([]);
    for (let j = 0; j < numeros[i].length; j++) {
      transpuesta[i][j] = numeros[j][i];
    }
  }

  mostrarResultado(transpuesta);
}


function calcularRango(matriz) {
  let filaActual = 0;
  let colActual = 0;
  let filas = matriz.length;
  let columnas = matriz[0].length;

  while (filaActual < filas && colActual < columnas) {
    // Buscamos el elemento no nulo en la columna actual
    let filaPivote = filaActual;
    while (filaPivote < filas && matriz[filaPivote][colActual] == 0) {
      filaPivote++;
    }

    if (filaPivote == filas) {
      // Si no se encuentra ningún elemento no nulo en la columna actual, avanzamos a la siguiente columna
      colActual++;
    } else {
      // Si encontramos un elemento no nulo en la columna actual, lo intercambiamos con el primer elemento de la fila actual
      if (filaPivote != filaActual) {
        let temp = matriz[filaPivote];
        matriz[filaPivote] = matriz[filaActual];
        matriz[filaActual] = temp;
      }

      // Dividimos la fila actual por el elemento pivote para obtener un 1 en la posición (filaActual, colActual)
      let elementoPivote = matriz[filaActual][colActual];
      for (let j = colActual; j < columnas; j++) {
        matriz[filaActual][j] /= elementoPivote;
      }

      // Hacemos ceros en el resto de elementos de la columna actual
      for (let i = filaActual + 1; i < filas; i++) {
        let factor = matriz[i][colActual];
        for (let j = colActual; j < columnas; j++) {
          matriz[i][j] -= factor * matriz[filaActual][j];
        }
      }

      // Avanzamos a la siguiente fila y columna
      filaActual++;
      colActual++;
    }
  }

  // Contamos cuántas filas no nulas quedaron después de la eliminación gaussiana
  let rango = 0;
  for (let i = 0; i < filas; i++) {
    let esFilaNula = true;
    for (let j = 0; j < columnas; j++) {
      if (matriz[i][j] != 0) {
        esFilaNula = false;
        break;
      }
    }
    if (!esFilaNula) {
      rango++;
    }
  }

  return rango;
}


function rangoMatriz(){
  let matriz = operacionMatriz();
  let rango = calcularRango(matriz);
  let mensaje = `El rango de la matriz es ${rango}.`;
  let resultadoRango = document.getElementById('resultado');
  resultadoRango.innerHTML = mensaje;
}


function calcularInversa() {
  let numeros = operacionMatriz();
  let determinante = calculateDeterminant(numeros);

  if (determinante == 0) {
    alert('La matriz no tiene inversa');
    return;
  }

  let adjunta = calcularAdjunta(numeros);
  let transpuesta = computeTranspose(adjunta);
  let inversa = [];

  for (let i = 0; i < numeros.length; i++) {
    inversa[i] = [];
    for (let j = 0; j < numeros.length; j++) {
      inversa[i][j] = transpuesta[i][j] / determinante;
    }
  }

  mostrarResultado(inversa);
}

function calcularAdjunta(numeros) {
  let adjunta = [];
  for (let i = 0; i < numeros.length; i++) {
    adjunta[i] = [];
    for (let j = 0; j < numeros.length; j++) {
      let submatriz = obtenerSubmatriz(numeros, i, j);
      let signo = ((i + j) % 2 == 0) ? 1 : -1;
      adjunta[i][j] = signo * calculateDeterminant(submatriz);
    }
  }
  return adjunta;
}

function obtenerSubmatriz(numeros, fila, columna) {
  let submatriz = [];
  let n = numeros.length;
  for (let i = 0; i < n - 1; i++) {
    submatriz[i] = [];
    for (let j = 0; j < n - 1; j++) {
      let x = (i < fila) ? i : i + 1;
      let y = (j < columna) ? j : j + 1;
      submatriz[i][j] = numeros[x][y];
    }
  }
  return submatriz;
}

function calculateDeterminant(numeros) {
  let n = numeros.length;
  if (n == 1) {
    return numeros[0][0];
  } else if (n == 2) {
    return numeros[0][0] * numeros[1][1] - numeros[0][1] * numeros[1][0];
  } else {
    let det = 0;
    for (let j = 0; j < n; j++) {
      let submatriz = obtenerSubmatriz(numeros, 0, j);
      let signo = (j % 2 == 0) ? 1 : -1;
      det += signo * numeros[0][j] * calculateDeterminant(submatriz);
    }
    return det;
  }
}

function computeTranspose(numeros) {
  let transpuesta = [];
  for (let i = 0; i < numeros.length; i++) {
    transpuesta[i] = [];
    for (let j = 0; j < numeros.length; j++) {
      transpuesta[i][j] = numeros[j][i];
    }
  }
  return transpuesta;
}






function operacionMatriz(){
  let numeros = [];
  let tablaNumeros = document.getElementById('tablaNumeros');
  
  // Obtener los valores ingresados en la tabla de inputs
  for (let i = 0; i < tablaNumeros.rows.length; i++) {
      numeros.push([]);
      for (let j = 0; j < tablaNumeros.rows[i].cells.length; j++) {
          let valor = parseFloat(tablaNumeros.rows[i].cells[j].querySelector('input').value);
          if (isNaN(valor)) {
              valor = 0; // Si el usuario no ingresó un número, consideramos que es 0
          }
          numeros[i].push(valor);
      }
  }
  return numeros;
}

function mostrarLoader() {
  let loader = document.getElementById('loader');
  loader.style.display = 'block';
}

function ocultarLoader() {
  let loader = document.getElementById('loader');
  loader.style.display = 'none';
}

function limpiarMatriz() {
  let tablaNumeros = document.getElementById('tablaNumeros');
  
  // Establecer el valor de todos los inputs en 0
  for (let i = 0; i < tablaNumeros.rows.length; i++) {
    for (let j = 0; j < tablaNumeros.rows[i].cells.length; j++) {
      tablaNumeros.rows[i].cells[j].querySelector('input').value = '';
    }
  }
  
  // Limpiar el resultado
  let tablaResultado = document.getElementById('resultado');
  tablaResultado.innerHTML = '';
}

function valido() {
  let arr = document.querySelectorAll('.input');
  for (let i = 0; i < arr.length; i++) {
      if (arr[i].value.trim() == "") return false;
  }
  return true;
}
