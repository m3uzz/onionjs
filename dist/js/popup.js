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

$.fn.popUpWindow = function(url, params, wName, wWidth, wHeight, wTop, wLeft, wScroll, wWindow){
	var wUrl;
	var wOpions;

	console.log(url);
	console.log(params);
	
	if (typeof (wWidth) === 'undefined')
	{
		wWidth == '600';
	}
	else if (wWidth.slice(-1) == '%')
	{
		pWidth = Number(wWidth.substr(0, wWidth.length -1));
		wWidth = Math.round((screen.width * pWidth) / 100);
	}
	
	if (typeof (wHeight) === 'undefined')
	{
		wHeight == '600';
	}
	else if (wHeight.slice(-1) == '%')
	{
		pHeight = Number(wHeight.substr(0, wHeight.length -1));
		wHeight = Math.round((screen.height * pHeight) / 100);
	}

	if (typeof (wLeft) === 'undefined' || wLeft == ''  || wLeft == null)
	{
		wLeft = Math.round((screen.width - wWidth) / 2);
	}

	if (typeof (wTop) === 'undefined' || wTop == '' || wTop == null)
	{
		wTop = Math.round((screen.height - wHeight) / 2);		
	}
	
	if(wScroll == true){
	  wScrolling = "yes";
	}
	else{
	  wScrolling = "no";
	}
	
	if(wWindow == "" || wWindow == null)
	{
		wWindow = 'popup';
	}
	
	wUrl = url + '?' + params + '&w=' + wWindow;
	wOpions = '"resizable=no, scrollbars=' + wScrolling + ', width=' + wWidth + ', height=' + wHeight + ', left=' + wLeft + ', top=' + wTop + '"';
	window.open(wUrl, wName, wOpions);
}