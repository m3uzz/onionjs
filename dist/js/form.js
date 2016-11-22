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

$(document).ready(function() {
	$('[data-toggle="popover"]').popover();
	$('[data-toggle="tooltip"]').tooltip()
		
	$("#generatePasswordBtn").unbind('click').bind('click', function() {
		
		$.ajaxSetup({async:true});
		
		$.get($(this).attr("data-act"), function( data ) {
			  $("#stPassword").val(data);
			  $("#stConfirmation").val(data);
			}, "json" );		
	});
	
	$(".openFormModalBtn").unbind('click').bind('click', function() {
		$("#ajaxFormModal .modal-title").html($(this).attr("data-title"));
		$("#ajaxFormModalConfirmBtn").html($(this).attr("data-btn"));
		$("#ajaxFormModalConfirmBtn").attr('data-return', $(this).attr("data-return"));
		$("#ajaxFormModalConfirmBtn").attr('data-return-label', $(this).attr("data-return-label"));
		$("#ajaxFormModalConfirmBtn").attr('data-fnCall', $(this).attr("data-fnCall"));
		
		$("#ajaxFormModal .modal-body").html($("#loading").html());
		
		selectType = $(this).attr("data-select");
		
		if (selectType !== 'multi')
		{
			selectType = 'radio';
		}
		else
		{
			selectType = 'checkbox';
		}
		
		filter = $(this).attr("data-filter");
		params = {'w':'modal','st':selectType,'filter':filter};

		$.ajaxSetup({async:true});
		
		$.post(
				$(this).attr("data-act"), 
				params,
				"html" 
			).done (function( data ) {
				$("#ajaxFormModal .modal-body").html(data);
			}).fail(function( data ) {
				$("#ajaxFormModal .modal-body").html('<i class="glyphicon-collapse-warning-sign"></i>');
			});	

		
		$('#ajaxFormModal').modal('show');
		
		return true;
	});
	
	$("#ajaxFormModalConfirmBtn").unbind('click').bind('click', function() {
		var func = $(this).attr('data-fnCall');
		rowChecked = new Array();

		$("input[name='sck[]']:checked").each(function(){
			rowChecked.push($(this).val());
		});

		$('#' + $(this).attr('data-return-label')).val($("input[name='lb-" + rowChecked + "']").val());
		$('#' + $(this).attr('data-return')).val(rowChecked);

		if (func != undefined && func != '')
		{
			try{
				eval(func+'('+rowChecked+')');
			}catch (e){}
		}
		
		$("#ajaxFormModal .modal-body").html("");
	});
	
	$("#ajaxFormModalCancelBtn").unbind('click').bind('click', function() {
		$("#ajaxFormModal .modal-body").html("");
	});
	
	$("a[data-toggle=collapse]").unbind('click').bind('click', function() {
		icon = $(this).parent().parent().find("i");
		
		if (icon.hasClass('glyphicon-collapse-up'))
		{
			icon.removeClass('glyphicon-collapse-up');
			icon.addClass('glyphicon-collapse-down');
		}
		else
		{
			icon.removeClass('glyphicon-collapse-down');
			icon.addClass('glyphicon-collapse-up');
		}
	});
	
	$("input[type=submit], button[type=submit]").unbind('click').bind('click', function() {
		if ($('form').attr('novalidate') != 'novalidate')
		{
			$(this).button('loading');
			
			if (!$('form').checkValidate()) {
				$(this).button('reset');
			}
		}
	});
	
	var cache = {};
	
	$(".searchField").autocomplete({
		minLength: 2, //this.element[0].attr('data-minLength'),
		source: function( request, response)
		{
	        var term = request.term;
	        var element = this.element[0];
	        var url = $(element).attr('data-act');
	        var param = {"filter":$(element).attr('data-filter'), "field":$(element).attr('data-field'), "term":request.term};
	        var elementCach = {};
	        var func = $(element).attr('data-fnCall');

	        $(this).debug('source');
	        
	        if ($(element).attr('id') in cache)
	        {
	        	elementCach = cache[$(element).attr('id')];

		        if (term in elementCach)
		        {
		        	$(this).debug("cache");
		        	response(elementCach[term]);
		        	return;
		        }
	        }
	        
	        $(this).debug(url);
	        $(this).debug(param);
	        
	        $.getJSON
	        (
	        	url,
	        	param, 
	        	function(data, status, xhr)
	        	{
	        		$(this).debug(data);
	        		elementCach[term] = data;
	        		response(data);
	        	}
	        );
	        
	        cache[$(element).attr('id')] = elementCach;
	        
			if (func != undefined && func != '')
			{
				try{
					eval(func+'('+elementCach+')');
				}catch (e){}
			}
	    },
		select: function(event, ui)
		{
			$(this).debug('select');
			$(this).debug($(this).attr('data-return'));
			$(this).debug(ui.item.value);
			$(this).debug(ui.item.id);
			
			$('#' + $(this).attr('data-return')).val(ui.item.id);
			
			var func = $(this).attr('data-fnCall');
			$(this).debug(func);
			if (func != undefined && func != '')
			{
				try{
					eval(func+'('+ui.item.id+')');
				}catch (e){}
			}
		},
	    change: function(event, ui)
		{
	    	$(this).debug('change');
			$(this).debug($(this).attr('data-return'));
			$(this).debug(ui.item);
			
			if (!ui.item)
			{
				$('#' + $(this).attr('data-return')).val("");
				$(this).val("");
			}
		}
    });
});