/**
 * This file is part of Onion
 *
 * Copyright (c) 2014-2016, Humberto Lourenço <betto@m3uzz.com>.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in
 *     the documentation and/or other materials provided with the
 *     distribution.
 *
 *   * Neither the name of Humberto Lourenço nor the names of his
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @category   Java Script
 * @package    Onion
 * @author     Humberto Lourenço <betto@m3uzz.com>
 * @copyright  2014-2016 Humberto Lourenço <betto@m3uzz.com>
 * @license    http://www.opensource.org/licenses/BSD-3-Clause  The BSD 3-Clause License
 * @link       http://github.com/m3uzz/onionfw
 */

var formSubmitOk = false;

$.fn.debug = function(data, force) {
	var forceDebug = false;
	
	if (typeof (force) != 'undefined')
	{
		forceDebug = force;
	}
	
	if (OnionDebugJs || forceDebug)
	{
		console.log(data);
	}
	
	return true;
}

$.fn.checkValidate = function() {	 
	var alert = "[]";
	form = this.serializeArray();
	formSubmitOk = true;
	
	if (typeof form == 'object' && Object.keys(form).length > 0)
	{
		alert = JSON.parse(alert);
		
		for (key in form)
		{
			fieldName = form[key].name;

			if (fieldName.indexOf("[]") != -1)
			{
				fieldName = fieldName.slice(0,-2);
			}
			
			$(this).debug(fieldName);
			element = $('#' + fieldName);
			
			if (typeof element == 'object' && element.attr('required'))
			{
				$(this).debug('required');
				
				if (!element[0]['validity']['valid'] || element.val() == "")
				{
					formSubmitOk = false;
					$(this).debug(element[0]['id']);
					
					if (element.hasClass('datepickerField') && element.parent().hasClass('date-time'))
					{
						id = element[0]['id'].replace('Date','');
						label = $("label[for=" + id).html() + " data";
					}
					else if (element.hasClass('timepickerField') && element.parent().hasClass('date-time'))
					{
						id = element[0]['id'].replace('Time','');
						label = $("label[for=" + id).html() + " hora";
					}
					else
					{
						id = element[0]['id'];
						label = $("label[for=" + id).html();
					}
					
					$(this).debug(id);
					
					alert.push({'id':'formValidateError', 'hidden':false, 'push':true, 'type':'warning', 'msg':'Campo "' + label + '" não foi preenchido, ou não é válido!'});
				}
			}
		}

		element.pushMessageShow('#pushAlert', '#pushMessage', '#pushTemplate', alert);
	}
	
	return formSubmitOk;
};

$.fn.serializeObject = function() {
   var o = {};
   var a = this.serializeArray();
   
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           
           o[this.name].push(this.value || '');
       } 
       else {
           o[this.name] = this.value || '';
       }
   });
   
   return o;
};

$.fn.actFormSubmit = function(formId, containerId, fnDone, fnFail) {
	var func = {'done':fnDone, 'fail':fnFail};
	
	requestType = $(formId).attr('data-request');
	requestMethod = $(formId).attr('method');
	url = $(formId).attr("action");
	params = $(formId).serializeObject();
	
	$(this).debug(requestType);
	$(this).debug(requestMethod);
	$(this).debug(url);
	$(this).debug(params);
	
	if (requestType == "AJAX") {
		if (containerId != undefined)
		{
			$(containerId).html($("#loading").html());
		}
		
		$.ajaxSetup({async:true});
		
		if (requestMethod.toUpperCase() == "POST" ) {
			$(this).debug("AJAX POST");
			
			$.post(
				url, 
				params,
				function( data ) {
					if (containerId != undefined)
					{
						$(containerId).parent().html(data);
					}
				},
				"html" 
			).done (function( data ) {
				if (fnDone != undefined)
				{
					func['done'](data);
				}
			}).fail(function( data ) {
				if (fnFail != undefined)
				{
					func['fail'](data);
				}
			});	
		} 
		else {
			$(this).debug("AJAX GET");
			
			$.get(
				url, 
				params,
				function( data ) {
					if (containerId != undefined)
					{
						$(containerId).parent().html(data);
					}
				}, 
				"html"
			).done (function( data ) {
				if (fnDone != undefined)
				{
					func['done'](data);
				}
			}).fail(function( data ) {
				if (fnFail != undefined)
				{
					func['fail'](data);
				}
			});				
		}
		
		return false;
	} 
	else {
		$(this).debug("HTML " + requestMethod);
		
		if (requestMethod == "GET")
		{
			var vars = {};
			url.replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function( m, key, value ) {
				vars[key] = value !== undefined ? value : '';
			});

			$(this).debug(vars);
			
			if (typeof vars == 'object' && Object.keys(vars).length > 0)
			{
				for (key in vars)
				{
					$('<input>').attr({
					    type: 'hidden',
					    id: key,
					    name: key,
					    value: vars[key]
					}).appendTo(formId);
				}
			}
		}
		
		$(formId).submit();
	}
};

$.fn.beep = function () {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

$.fn.pushMessageShow = function (alertArea, messageArea, templateId, data) {
	var qt = 0;
	var template = '';
	var length = 0;

	if (typeof data == 'object' && Object.keys(data).length > 0)
	{
		length = Object.keys(data).length;
		qt = Number($(alertArea).html()) + length;
		$(alertArea).html(qt);
		//$(alertArea).parent().addClass('btn-warning');
	
		for (key in data)
		{
			message = $('#pushMessage').find('#' + data[key].id);
			$(this).debug(message);
			
			if (message != 'undefined')
			{
				template = $(templateId).html();
				template = $(template).attr('id', data[key].id);
				template = $(template).addClass('alert-' + data[key].type);
				template = $(template).append(data[key].msg);
				
				if (data[key].hidden == true)
				{
					template = $(template).addClass('hidden');
				}
				
				$(messageArea).append(template);
				
				$(document).on('click', '#pushMessage blockquote button', function(e){
					msgs = $('#pushMessage').html();
					
					qtDisplayed = $(msgs).length;
					
					if (qtDisplayed > 0)
					{
						$(alertArea).html(qtDisplayed);
					}
					else
					{
						$(alertArea).html('');
						$(alertArea).parent().removeClass('btn-warning');
					}
				});
			}
		}
		
		$(this).beep();
	}
	
	return true;
}

$.fn.notificationEvent = function() {    
	var ms = new EventSource('/backend/push');
	
	ms.onmessage = function (e) {
		if (e.data != '""')
		{
			data = JSON.parse(e.data);
			$(this).pushMessageShow('#pushAlert', '#pushMessage', '#pushTemplate', data);
		}
	};
	
	return ms;
}

$(document).ready(function() {
	var managerPush = null;
	
	$(window).focus(function(){
		$(this).debug('focus');
		
		if($('#push').length)
		{
			$(this).debug('start push');
			managerPush = $(this).notificationEvent();
		}
	});
	
	$(window).blur(function(){
		$(this).debug('blur');
		
		if($('#push').length)
		{
			$(this).debug('stop push');
			managerPush.close();
			managerPush = null;
		}
	});
	
	$("#push").unbind('click').bind('click', function(){
		$('#pushMessage blockquote').removeClass('hidden');
		$('#pushMessage').toggle();
	});
	
	$('input:not(:password)').change(function() {
		if ($(this).attr('toUpper') != 'false' && !$(this).hasClass('noUpper'))
	    {
			$(this).val($(this).val().toUpperCase());
	    }
	});
	
	$(".openPopUpBtn").unbind('click').bind('click', function() {
		$(this).popUpWindow(
			$(this).attr('data-url'),
			$(this).attr('data-params'),
			$(this).attr('data-wname'),
			$(this).attr('data-wwidth'),
			$(this).attr('data-wheight'),
			$(this).attr('data-wtop'),
			$(this).attr('data-wleft'),
			$(this).attr('data-wscroll'),
			$(this).attr('data-wwindow')
		);
	});
	
	$(".openDialogModalBtn").unbind('click').bind('click', function() {
		$("#ajaxSimpleModal .modal-title").html($(this).attr("data-title"));
		$("#ajaxSimpleModal #ajaxSimpleModalConfirmBtn").attr($(this).attr('data-pName'), $(this).attr('data-pValue'));
		$("#ajaxSimpleModal #ajaxSimpleModalConfirmBtn").html($(this).attr('data-btnName'));
		
		if ($(this).attr('data-btnDismiss') != 'false')
		{
			$("#ajaxSimpleModal #ajaxSimpleModalConfirmBtn").attr('data-dismiss', 'modal');	
		}
		
		$("#ajaxSimpleModal .modal-body").html($("#loading").html());
		
		params = {'w':'modal'};
		
		$.ajaxSetup({async:true});
		
		$.post($(this).attr("data-act"), params, function( data ) {
			$("#ajaxSimpleModal .modal-body").html(data);
			}, "html" 
		);
		
		$('#ajaxSimpleModal').modal('show');
	});
	
	$("#ajaxSimpleModalConfirmBtn").unbind('click').bind('click', function() {
		formId = $(this).attr('data-form');
		$(formId).attr('action', $(formId).attr('data-act'));
		containerId = $(formId).attr('data-container');
		returned = $(this).actFormSubmit(formId,containerId);
		return returned;
	});
	
	$("#ajaxSimpleModalCancelBtn").unbind('click').bind('click', function() {
		$(this).parent().parent().find('.modal-body').html("");
	});
});

$(window).bind("beforeunload", function() {
	if ($('form').length && $('#submitbutton').length && $('form').attr('novalidate') != 'novalidate')
	{
		if(!formSubmitOk)
		{
			if (!confirm("Os dados do formulário ainda não estão salvos!\r\nDeseja mesmo sair da página?"))
			{
				return false;
			}
			
			return true;
		}
	}
});