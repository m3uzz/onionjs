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
	checkboxStatus = true;

	$(".typeBtn").unbind('click').bind('click', function() {
		$("#actForm").attr("action", $(this).attr("data-act"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");
	});
	
	$(".filterBtn").unbind('click').bind('click', function() {
		$("#actForm").attr("action", $(this).attr("data-act"));
		$("#actForm").children("input[name=dtInit]").val($(this).attr("data-init"));
		$("#actForm").children("input[name=dtEnd]").val($(this).attr("data-end"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");
	});
	
	$(".exportBtn").unbind('click').bind('click', function() {
		$("#actForm").attr("action", $(this).attr("data-act"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");
	});
	
	$("#dateFilterBtn").unbind('click').bind('click', function() {
		$("#actForm").children("input[name=dtInit]").val($("#dtInit").val());
		$("#actForm").children("input[name=dtEnd]").val($("#dtEnd").val());
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");
	});
	
	$(".searchField").unbind('click').bind('click', function() {
		$("#actForm").children("input[name=f]").val($(this).attr('data-field'));
		$("#searchQuery").attr('placeholder', $(this).attr('title'));
	});
	
	$("#searchQuery").bind("keypress", function(e) {
		if (e.which == '13') {
			$("#actForm").children("input[name=p]").val('');
			$("#actForm").children("input[name=q]").val($(this).val());
			$("#actForm").attr("action", $(this).attr("data-act"));
			return $("#actForm").actFormSubmit("#actForm", "#gridContent");
		}
	});	
	
	$("#searchBtn").unbind('click').bind('click', function() {
		$("#actForm").children("input[name=q]").val($("#searchQuery").val());
		$("#actForm").attr("action", $(this).attr("data-act"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
	});

	$("#searchClear").unbind('click').bind('click', function() {
		$("#searchQuery").val('');
	});
	
	$(".rowActBtn").unbind('click').bind('click', function() {
		$("#actForm").children("input[name=id]").val($(this).attr("data-value"));
		
		params = ''; 
		
		if ($(this).attr("data-params") != '')
		{
			params = '?' + $(this).attr("data-params");
		}
		
		$("#actForm").attr("action", $(this).attr("data-act") + params);
		
		if ($(this).attr("data-confirm") == "true") {
			$('#modalConfirmation div.modal-body').html('<p>' + $(this).attr("data-msg") + '</p>');
			$('#modalConfirmation').modal('show');
		}
		else {
			return $("#actForm").actFormSubmit("#actForm", "#gridContent");
		}
			
	});
	
	$(".formSubmitBtn").unbind('click').bind('click', function() {
		$("#actForm").children("input[name=p]").val('');
		$("#actForm").attr("action", $(this).attr("data-act"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
	});
	
	$(".selectNumRows").unbind('click').bind('click', function() {
		$("#actForm").children("input[name=p]").val('0');
		$("#actForm").children("input[name=rows]").val($(this).attr("data-rows"));
		$("#actForm").attr("action", $(this).attr("data-act"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
	});	

	$(".colOrder").unbind('click').bind('click', function() {
		$("#actForm").children("input[name=col]").val($(this).attr("data-col"));
		$("#actForm").children("input[name=ord]").val($(this).attr("data-ord"));
		$("#actForm").attr("action", $(this).attr("data-act"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
	});
	
	$(".pagination li a").unbind('click').bind('click', function() {
		$(this).attr("href", "#");
		$("#actForm").children("input[name=p]").val($(this).attr("data-page"));
		$("#actForm").attr("action", $(this).attr("data-act"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
	});

	$(".massActBtn").unbind('click').bind('click', function() {
		rowChecked = new Array();

		$("input[name='ck[]']:checked").each(function(){
			rowChecked.push($(this).val());
		});
	
		$("input[type=hidden][name='ckd']").val(rowChecked);

		$("#actForm").attr("action", $(this).attr("data-act"));

		if(rowChecked.length > 0) {
			if ($(this).hasClass( "noConfirmation" ))
			{
				return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
			}
			else
			{
				$('#modalConfirmation div.modal-body').html('<p>' + $( this ).attr("data-msg") + '</p>');
				$('#modalConfirmation').modal('show');
			}
		}
		else {
			if ($(this).hasClass( "noCheck" ))
			{
				return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
			}
			else
			{
				$('#modalAlert div.modal-body').html('<p>You should check at least one row!</p>');
				$('#modalAlert').modal('show');
			}
		}
		
		return false;
	});
	
	$(".massActPopUpBtn").unbind('click').bind('click', function() {
		rowChecked = new Array();
		openPopUp = false;
		
		$("input[name='ck[]']:checked").each(function(){
			rowChecked.push($(this).val());
		});
	
		$("input[type=hidden][name='ckd']").val(rowChecked);

		if(rowChecked.length > 0) {
			if ($(this).hasClass( "noConfirmation" ))
			{
				openPopUp = true;	
			}
			else
			{
				$('#modalConfirmation div.modal-body').html('<p>' + $( this ).attr("data-msg") + '</p>');
				$('#modalConfirmation').modal('show');
			}
		}
		else {
			if ($(this).hasClass( "noCheck" ))
			{
				openPopUp = true;
			}
			else
			{
				$('#modalAlert div.modal-body').html('<p>You should check at least one row!</p>');
				$('#modalAlert').modal('show');
			}
		}
		
		if (openPopUp)
		{
			$(this).popUpWindow(
					$(this).attr('data-url'),
					$(this).attr('data-params') + "&ckd=" + rowChecked,
					$(this).attr('data-wname'),
					$(this).attr('data-wwidth'),
					$(this).attr('data-wheight'),
					$(this).attr('data-wtop'),
					$(this).attr('data-wleft'),
					$(this).attr('data-wscroll'),
					$(this).attr('data-wwindow')
				);			
		}
		
		return false;
	});

	$("#modalConfirmBtn").unbind('click').bind('click', function() {
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
	});
	
	$("#modalReloadBtn").unbind('click').bind('click', function() {
		$("#actForm").attr("action", $(this).attr("data-act"));
		return $("#actForm").actFormSubmit("#actForm", "#gridContent");	
	});	
	
	$("#changeRowCheck").unbind('click').bind('click', function() {
		checkboxChange = false;
		
		$("input[name='ck[]']").each(function(){
			$(this).prop('checked', checkboxStatus);
			checkboxChange = true;
		});
		
		title = $(this).attr('title');
		inv = $(this).attr('data-inv');
		
		if (checkboxChange) {
			$(this).attr('title', inv);
			$(this).attr('data-inv', title);
			$(this).children("i").attr("class", (Boolean(checkboxStatus) ? "glyphicon glyphicon-check" : "glyphicon glyphicon-unchecked"));
			checkboxStatus = !checkboxStatus;
		}
	});
	
	$(".gridRow").unbind('click').bind('click', function() {
		ck = $(this).find("input[name='ck[]']");
		ck.prop('checked', !ck.prop('checked'));
	});	
	
	$("input[name='ck[]']").unbind('click').bind('click', function() {
		$(this).prop('checked', !$(this).prop('checked'));
	});	
	
	$(".onion-grid-col-actions .dropdown-toggle").unbind('click').bind('click', function() {
		$(".table-responsive").css('overflow-x', 'visible');
	});
});