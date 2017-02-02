/**
 * Created by Fcordova on 02/02/2017.
 */

$(document).on("ready", function () {

	var i = 0,
		j = 0,
		$cntnums = $("#numeros"),
		$btnSubmit = $("#btnSubmit"),
		$boxMensaje = $(".text-mensaje"),
		$boxResultado = $(".contenido");

	//Limitamos a que solo se puedan ingresar números.
	$cntnums.numeric({
		disallow: true,
		allowPlus: false,
		allowMinus: false,
		allowDecSep: false,
		allowThouSep: false
	});

	//Función para ordenar los números ingresados
	window.ordenarNumeros = function (str) {
		var i, j;
		for (i = str.length - 1; i >= 0; i--) {
			for (j = 0; j <= i; j++) {
				if (str[j + 1] < str[j]) {
					var temp = str[j];
					str[j] = str[j + 1];
					str[j + 1] = temp;
				}
			}
		}
		return str.join("");
	};

	//Función para imprimir el resultado
	window.imprimirArreglo = function (str) {
		$boxResultado.animateNumber({number: str});
	};

	//Función para convertir los numeros en un Array y luego pasar a ordenarlos con window.ordenarNumeros
	window.convertirArreglo = function () {

		var arreglo = [],
			sNumber = $cntnums.val().toString(); //Convertimos lo ingresado en el input en un String

		//Validamos que el usuario haya ingresado algún número
		if (sNumber.length <= 0) {
			$boxMensaje.addClass("bg-danger").html("Debe ingresar un número").fadeIn("fast");
			return false;
		}

		//Agregamos los datos ingresados en el input en un Array llamado "arreglo"
		for (var i = 0, len = sNumber.length; i < len; i += 1) {
			arreglo.push(+sNumber.charAt(i));
		}

		//Limpiamos el array de posibles números duplicados
		var limpiezaArray = arreglo.filter(function (elem, index, self) {
			return index == self.indexOf(elem);
		});

		//Limpiamos los resultados anteriores
		$boxResultado.empty();

		//Ejecutamos la función "window.imprimirArreglo" para mostrar nuestro resultado
		window.imprimirArreglo(window.ordenarNumeros(limpiezaArray));

	};

	$cntnums.on("focus", function () {
		$boxMensaje.fadeOut("fast").html("");
	});

	$btnSubmit.on("click", function (e) {
		e.preventDefault();
		window.convertirArreglo();
	});

});