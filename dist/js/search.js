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
	checkboxSearchStatus = true;

	$(".searchField").unbind('click').bind('click', function() {
		$("#actFormSearch").children("input[name=f]").val($(this).attr('data-field'));
		$("#searchQuery").attr('placeholder', $(this).attr('title'));
	});
	
	$("#searchQuery").bind("keypress", function(e) {
		if (e.which == '13') {
			$("#actFormSearch").children("input[name=p]").val('');
			$("#actFormSearch").children("input[name=q]").val($(this).val());
			$("#actFormSearch").attr("action", $(this).attr("data-act"));
			return $("#actFormSearch").actFormSubmit("#actFormSearch", "#gridSearchContent");
		}
	});	
	
	$("#searchBtn").unbind('click').bind('click', function() {
		$("#actFormSearch").children("input[name=q]").val($("#searchQuery").val());
		$("#actFormSearch").attr("action", $(this).attr("data-act"));
		return $("#actFormSearch").actFormSubmit("#actFormSearch", "#gridSearchContent");	
	});

	$("#searchClear").unbind('click').bind('click', function() {
		$("#searchQuery").val('');
	});
	
	$(".selectNumRows").unbind('click').bind('click', function() {
		$("#actFormSearch").children("input[name=p]").val('0');
		$("#actFormSearch").children("input[name=rows]").val($(this).attr("data-rows"));
		$("#actFormSearch").attr("action", $(this).attr("data-act"));
		return $("#actFormSearch").actFormSubmit("#actFormSearch", "#gridSearchContent");	
	});	

	$(".colOrder").unbind('click').bind('click', function() {
		$("#actFormSearch").children("input[name=col]").val($(this).attr("data-col"));
		$("#actFormSearch").children("input[name=ord]").val($(this).attr("data-ord"));
		$("#actFormSearch").attr("action", $(this).attr("data-act"));
		return $("#actFormSearch").actFormSubmit("#actFormSearch", "#gridSearchContent");	
	});
	
	$(".pagination li a").unbind('click').bind('click', function() {
		$(this).attr("href", "#");
		$("#actFormSearch").children("input[name=p]").val($(this).attr("data-page"));
		$("#actFormSearch").attr("action", $(this).attr("data-act"));
		return $("#actFormSearch").actFormSubmit("#actFormSearch", "#gridSearchContent");	
	});

	$("#modalConfirmBtn").unbind('click').bind('click', function() {
		return $("#actFormSearch").actFormSubmit("#actFormSearch", "#gridSearchContent");	
	});
	
	$("#modalSearchReloadBtn").unbind('click').bind('click', function() {
		$("#actFormSearch").children("input[name=p]").val('');
		$("#actFormSearch").attr("action", $(this).attr("data-act"));
		return $("#actFormSearch").actFormSubmit("#actFormSearch", "#gridSearchContent");	
	});	
	
	$("#changeSearchRowCheck").unbind('click').bind('click', function() {
		checkboxChange = false;
		
		$("input[name='sck[]']").each(function(){
			$(this).prop('checked', checkboxSearchStatus);
			checkboxChange = true;
		});
		
		title = $(this).attr('title');
		inv = $(this).attr('data-inv');
		
		if (checkboxChange) {
			$(this).attr('title', inv);
			$(this).attr('data-inv', title);
			$(this).children("i").attr("class", (Boolean(checkboxSearchStatus) ? "glyphicon glyphicon-check" : "glyphicon glyphicon-unchecked"));
			checkboxSearchStatus = !checkboxSearchStatus;
		}
	});
	
	$(".gridRow").unbind('click').bind('click', function() {
		sck = $(this).find("input[name='sck[]']");
		sck.prop('checked', !sck.prop('checked'));
	});	
	
	$("input[name='sck[]']").unbind('click').bind('click', function() {
		$(this).prop('checked', !$(this).prop('checked'));
	});	
});