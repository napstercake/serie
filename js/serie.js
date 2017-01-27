/**
 * @class Clase principal para el ejemplo.
 * @autor Ricardo Gonzales [js.ricardo.gonzales@gmail.com]
 */

 	// Constantes.
	var SERIE_UI_COMPONENTS = {
			add:	$('#add'),
			order: 	$('#order'),
			number: $('#number')
		},
		SERIE_UI_SECTIONS = {
			result: $('#result'),
			msg: 	$('#msg')
		},
		SERIE_NUMBERS_ARRAY = [];

	/**
	 * 
	 */
	(function() {

		'use strict';

		var ui = SERIE_UI_COMPONENTS;

		// Inicializar.
		init();

		// Agregar item.
		ui.add.on('click', function(e) {
			add();
		});

		// Ordenar lista.
		ui.order.on('click', function(e) {
			order();
		});

	})();

	/**
	 * Inicializar.
	 */
	function init() {
		var sections = SERIE_UI_SECTIONS;
		var ui = SERIE_UI_COMPONENTS;
		sections.result.hide(); // Ocultar caja de resultados
		sections.msg.hide(); // Ocultar cualquier mensaje
		ui.number.focus();// Poner el foco en el input de entrada
		ui.order.hide(); // Ocultar boton de ordenamiento
	}

	/**
	 * Método para agregar el numero al arreglo.
	 */
	function add() {
		var ui = SERIE_UI_COMPONENTS,
			sections = SERIE_UI_SECTIONS;
		
		// Validar si existe un arreglo con el cual poder comparar y si el valor ingresado existe en el mismo.
		if (SERIE_NUMBERS_ARRAY.length >= 1 && valueExistOnArray(ui.number.val())) {
			showMsg('error', 'El valor ya ha sido ingresado.'); // Error
		} else {
			// Validacion de valor de entrada numérico.
			if (jQuery.isNumeric(ui.number.val())) {
				SERIE_NUMBERS_ARRAY.push(ui.number.val()); // Agregar valor al arreglo
				if (sections.msg.is(':visible')) {
					sections.msg.hide(); // Ocultar si existe un mensaje visible.
				}
			} else {
				showMsg('error', 'El valor ingresado debe ser numérico.'); // Error
			}
		}

		ui.number.val(''); // Limpiar caja de texto.
		ui.number.focus(); // Colocar foco.
		
		// Mostrar boton para ordenar la lista
		if (SERIE_NUMBERS_ARRAY.length >= 2 && !ui.order.is(':visible')) {
			ui.order.fadeIn('fast');
		}

	}

	/**
	 * Método para el ordenamiento del arreglo.
	 */
	function order() {
		// Función para ordenar ascendentemente
		var finalArray = SERIE_NUMBERS_ARRAY.sort(function(a, b){return a-b});
		// Mostrar resultados.
		showResult(finalArray); 
	}

	/**
	 * Método para validar si un numero está ya contenido
	 * en el arreglo de la clase.
	 * @param {number} - Entero que es enviado para validarse.
	 */
	function valueExistOnArray(number) {
		var result = false;

		// Iterar el array
		for (var i=0; i < SERIE_NUMBERS_ARRAY.length; i++) {
			if (SERIE_NUMBERS_ARRAY[i] === number) {
				result = true;
				break; // Si se encuentra, quiebra el for.
			} else {
				result = false;
			}
		}

		return result;
	}

	/**
	 * Método para mostrar mensaje al usuario.
	 * @param {msgType} - Tipo de mensaje [Error, Success..]
	 * @param {msgTitle} - String con el mensaje.
	 */
	function showMsg(msgType, msgTitle) {
		var sections = SERIE_UI_SECTIONS,
			innerDiv = '';

		sections.msg.fadeIn('fast', function() {
			innerDiv = '<div class="'+msgType+'">' + msgTitle + '</div>';
			$(this).html(innerDiv);
		});
	}

	/**
	 * Método para mostrar el resultado del ordenamiento
	 * @param {object} - Arreglo de numeros.
	 */
	function showResult(object) {
		var sections = SERIE_UI_SECTIONS,
			innerDiv = '';

		// Mostrar
		sections.result.fadeIn('fast', function() {
			object.forEach(function(entry) {
				innerDiv += '<span>' + entry + '</span>';
			});
			$(this).html(innerDiv); // Agregar al DOm
		});
	}