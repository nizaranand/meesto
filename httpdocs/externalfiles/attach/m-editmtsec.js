// attachment javasccript functions

var getlinkdata = {
	get: function(url) {
		requestToGetSiteData = new Request.JSON({  
			url: "http://www.meesto.com/externalfiles/attach/getsiteinfo.php", 
			onRequest: function() {
				$('editbtns').set('styles',{'display':'none'});
				$('btnsbmt').set('styles',{'display':'none'});
				$('loader').set('styles',{'display':'block'});
				var newElem0 = new Element('div', {'id': 'link_loader', 'align': 'left', 'styles': {'background': '#fff', 'border-bottom': '2px solid #C5C5C5', 'padding-bottom': '12px', 'margin-top': '6px'}, 'html': '<table cellpadding="0" cellspacing="0"><tr><td align="left" valign="top"><table cellpadding="0" cellspacing="0"><tr><td align="left" valign="top"><img src="http://www.meesto.com/images/spinner.gif"/></td><td align="left" valign"center" style="padding-left: 2px;">getting link information...<br /><span class="subtext" style="font-size: 14px;">this might be a minute or so</span></td></tr></table></td><td align="left" valign="top" id="loadercncl_btn" style="padding-left: 12px;"><input type="button" value="cancel" onclick="getlinkdata.stopRequest();"/></td></tr></table>'});
				newElem0.inject($('attachments'), 'top');
				parent.PopBox.close();
			},
			onSuccess: function(response){
				var newatchct = parseFloat($('atchmnt_ct').get('value'))+1;
				
				if (response['type']=='image') { //if link is an image
					
					var newElem = new Element('div', {'id': 'atch'+newatchct, 'align': 'left', 'styles': {'background': '#fff', 'border-bottom': '2px solid #C5C5C5', 'padding-bottom': '12px', 'margin-top': '6px'}, 'html': '<div align="left"><table cellpadding="0" cellspacing="0" width="444px"><tr><td align="left" valign="top" style="width: 90px; height: 80px;"><div id="atch'+newatchct+'_thumbnailviewer" style="width: 90px; height: 80px; overflow: hidden; position: relative;"><div id="atch'+newatchct+'_thumbnaillist" style="position: absolute; top: 0px; left: 0px;"><table cellpadding="0" cellspacing="0"><tr><td align="center" valign="top" width="90px"><div align="center" valign="top" style="width: 90px; height: 80px;"><img src="'+response['thumbnails'][0][0]+'"  width="'+response['thumbnails'][0][1]+'px" height="'+response['thumbnails'][0][2]+'px"/></div></td></tr></table></div></div></td><td align="left" valign="top" style="padding-left: 24px;"><input type="button" value="remove" onclick="$(\'atchmnt_ct\').set(\'value\', (parseFloat($(\'atchmnt_ct\').get(\'value\'))-1));$(\'atch'+newatchct+'\').destroy();"/></td></td></table></div><div align="left"><input type="hidden" id="atch'+newatchct+'_thmubdisplaynum" name="atch'+newatchct+'_thmubdisplaynum" value="1"/><input type="hidden" id="atch'+newatchct+'_thumbsexist" name="atch'+newatchct+'_thumbsexist" value="y"/><input type="hidden" id="atch'+newatchct+'_type" name="atch'+newatchct+'_type" value="'+response['type']+'"/><input type="hidden" id="atch'+newatchct+'_url" name="atch'+newatchct+'_url" value="'+response['url']+'"/><input type="hidden" id="atch'+newatchct+'_host" name="atch'+newatchct+'_host" value="'+response['host']+'"/></div>'});
					
				} else { //if link is anything besides an image
					var tncount = response['thumbnails'].length;
					if (tncount>1) {
							//geta all images as string
							var tnstr = '';
							for(i=0; i<tncount; i++) {
								tnstr += '<td align="center" valign="top" width="90px"><div align="center" valign="top" style="width: 90px; height: 80px;"><img id="ui-img'+i+'" src="'+response['thumbnails'][i][0]+'"  width="'+response['thumbnails'][i][1]+'px" height="'+response['thumbnails'][i][2]+'px"/></div></td>';
							}
						var newElem = new Element('div', {'id': 'atch'+newatchct, 'align': 'left', 'styles': {'background': '#fff', 'border-bottom': '2px solid #C5C5C5', 'padding-bottom': '12px', 'margin-top': '6px'}, 'html': '<div align="left"><table cellpadding="0" cellspacing="0" width="444px"><tr><td align="left" valign="top" style="width: 90px; height: 80px;"><div id="atch'+newatchct+'_thumbnailviewer" style="width: 90px; height: 80px; overflow: hidden; position: relative;"><div id="atch'+newatchct+'_thumbnaillist" style="position: absolute; top: 0px; left: 0px;"><table cellpadding="0" cellspacing="0"><tr>'+tnstr+'</tr></table></div></div></td><td align="left" valign="top" width="334px" style="padding-left: 12px;"><table cellpadding="0" cellspacing="0"><tr><td align="left"><input type="text" id="atch'+newatchct+'_title" name="atch'+newatchct+'_title" size="40" maxlength="400" autocomplete="off" onfocus="if (trim(this.value) == \'type title here\') {this.value=\'\';};this.className=\'inputfocus\';" onblur="if (trim(this.value) == \'\') {this.value=\'type title here\';this.className=\'inputplaceholder\';} else {this.className=\'inputplaceholderblur\';}" onkeyup="if (trim(this.value) != \'\') {$(\'submit\').set(\'styles\',{\'display\':\'block\'});} else if (trim(this.value) == \'\') {$(\'submit\').set(\'styles\',{\'display\':\'none\'});}" value="'+response['title']+'"></td></tr><tr><td align="left" class="subtext" style="font-size: 14px;">'+response['host']+'</td></tr><tr><td align="left" style="padding-left: 12px; padding-top: 4px;"><textarea name="atch'+newatchct+'_details" id="atch'+newatchct+'_details" cols="40" rows="2" onfocus="if (trim(this.value) == \'type description here (optional)\') {this.value=\'\';};this.className=\'inputfocus\';" onblur="if (trim(this.value) == \'\') {this.value=\'type description here (optional)\';this.className=\'inputplaceholder\';} else {this.className=\'inputplaceholderblur\';}"'+response['description']+'</textarea></td></tr><tr><td align="left" id="descritp" style="padding-left: 10px; padding-top: 6px;"><table cellpadding="0" cellspacing="0" id="atch'+newatchct+'_thumbpicker"><tr><td align="right" style="cursor: pointer;"><img src="http://www.meesto.com/images/attachlink/btnprevOff.png" id="atch'+newatchct+'_btnprev" onclick="if(parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)>1){$(\'atch'+newatchct+'_tnurl\').set(\'value\', $(\'ui-img\'+(parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)-2)).getProperty(\'src\') );$(\'atch'+newatchct+'_thmubdisplaynum\').set(\'value\', parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)-1);$(\'atch'+newatchct+'_thumbnaillist\').set(\'tween\', { duration: 200 }).tween(\'left\', (-90*parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)+90));$(\'atch'+newatchct+'_showthmubdisplaynum\').innerHTML=$(\'atch'+newatchct+'_thmubdisplaynum\').value;$(\'atch'+newatchct+'_btnnext\').set(\'src\', \'http://www.meesto.com/images/attachlink/btnnext.png\'); if(parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)==1){this.set(\'src\', \'http://www.meesto.com/images/attachlink/btnprevOff.png\');}}"/></td><td align="left" style="cursor: pointer;"><img src="http://www.meesto.com/images/attachlink/btnnext.png" id="atch'+newatchct+'_btnnext" onclick="if(parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)<'+tncount+'){$(\'atch'+newatchct+'_tnurl\').set(\'value\', $(\'ui-img\'+parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)).getProperty(\'src\') );$(\'atch'+newatchct+'_thmubdisplaynum\').set(\'value\', parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)+1);$(\'atch'+newatchct+'_thumbnaillist\').set(\'tween\', { duration: 200 }).tween(\'left\', (-90*parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)+90));$(\'atch'+newatchct+'_showthmubdisplaynum\').innerHTML=$(\'atch'+newatchct+'_thmubdisplaynum\').value;$(\'atch'+newatchct+'_btnprev\').set(\'src\', \'http://www.meesto.com/images/attachlink/btnprev.png\'); if(parseFloat($(\'atch'+newatchct+'_thmubdisplaynum\').value)=='+tncount+'){this.set(\'src\', \'http://www.meesto.com/images/attachlink/btnnextOff.png\');}}"/></td><td align="left" style="padding-left: 4px; padding-right: 2px;">choose thumbnail<td align="right" id="atch'+newatchct+'_showthmubdisplaynum">1</td><td align="left" style="padding-left: 2px;">of '+tncount+'</td></tr></table></td></tr><tr><td align="left" class="subtext" style="padding-left: 14px; padding-top: 4px;"><table cellpadding="0" cellspacing="0" onclick="if($(\'atch'+newatchct+'_ui-thumbsexist\').get(\'checked\') == false){$(\'atch'+newatchct+'_ui-thumbsexist\').set(\'checked\', true);$(\'atch'+newatchct+'_thumbnailviewer\').set(\'styles\',{\'display\':\'none\'});$(\'atch'+newatchct+'_thumbpicker\').set(\'styles\',{\'display\':\'none\'});$(\'atch'+newatchct+'_thumbsexist\').set(\'value\', \'n\');}else{$(\'atch'+newatchct+'_ui-thumbsexist\').set(\'checked\', false);$(\'atch'+newatchct+'_thumbnailviewer\').set(\'styles\',{\'display\':\'block\'});$(\'atch'+newatchct+'_thumbpicker\').set(\'styles\',{\'display\':\'block\'});$(\'atch'+newatchct+'_thumbsexist\').set(\'value\', \'y\');}" style="cursor: pointer;"><tr><td align="left"><input type="checkbox" name="atch'+newatchct+'_ui-thumbsexist" id="atch'+newatchct+'_ui-thumbsexist" value="y"  onclick="if($(\'atch'+newatchct+'_ui-thumbsexist\').get(\'checked\') == false){$(\'atch'+newatchct+'_ui-thumbsexist\').set(\'checked\', true);$(\'atch'+newatchct+'_thumbnailviewer\').set(\'styles\',{\'display\':\'none\'});$(\'atch'+newatchct+'_thumbpicker\').set(\'styles\',{\'display\':\'none\'});$(\'atch'+newatchct+'_thumbsexist\').set(\'value\', \'n\');}else{$(\'atch'+newatchct+'_ui-thumbsexist\').set(\'checked\', false);$(\'atch'+newatchct+'_thumbnailviewer\').set(\'styles\',{\'display\':\'block\'});$(\'atch'+newatchct+'_thumbpicker\').set(\'styles\',{\'display\':\'block\'});$(\'atch'+newatchct+'_thumbsexist\').set(\'value\', \'y\');}"/></td><td align="left" style="padding-left: 4px;">don\'t show thumbnail</td></tr></table></td></tr></table></td><td align="left" valign="top" style="padding-left: 24px;"><input type="button" value="remove" onclick="$(\'atchmnt_ct\').set(\'value\', (parseFloat($(\'atchmnt_ct\').get(\'value\'))-1));$(\'atch'+newatchct+'\').destroy();"/></td></tr></table></div><div align="left"><input type="hidden" id="atch'+newatchct+'_thmubdisplaynum" name="atch'+newatchct+'_thmubdisplaynum" value="1"/><input type="hidden" id="atch'+newatchct+'_thumbsexist" name="atch'+newatchct+'_thumbsexist" value="y"/><input type="hidden" id="atch'+newatchct+'_type" name="atch'+newatchct+'_type" value="'+response['type']+'"/><input type="hidden" id="atch'+newatchct+'_url" name="atch'+newatchct+'_url" value="'+response['url']+'"/><input type="hidden" id="atch'+newatchct+'_host" name="atch'+newatchct+'_host" value="'+response['host']+'"/><input type="hidden" id="atch'+newatchct+'_tnurl" name="atch'+newatchct+'_tnurl" value="'+response['thumbnails'][0][0]+'"/></div>'});	
					} else {
						var newElem = new Element('div', {'id': 'atch'+newatchct, 'align': 'left', 'styles': {'background': '#fff', 'border-bottom': '2px solid #C5C5C5', 'padding-bottom': '12px', 'margin-top': '6px'}, 'html': '<div align="left"><table cellpadding="0" cellspacing="0" width="444px"><tr><td align="left" valign="top" style="width: 90px; height: 80px;"><div id="atch'+newatchct+'_thumbnailviewer" style="width: 90px; height: 80px; overflow: hidden; position: relative;"><div id="atch'+newatchct+'_thumbnaillist" style="position: absolute; top: 0px; left: 0px;"><table cellpadding="0" cellspacing="0"><tr><td align="center" valign="top" width="90px"><div align="center" valign="top" style="width: 90px; height: 80px;"><img src="'+response['thumbnails'][0][0]+'"  width="'+response['thumbnails'][0][1]+'px" height="'+response['thumbnails'][0][2]+'px"/></div></td></tr></table></div></div></td><td align="left" valign="top" width="334px" style="padding-left: 12px;"><table cellpadding="0" cellspacing="0"><tr><td align="left"><input type="text" id="atch'+newatchct+'_title" name="atch'+newatchct+'_title" size="40" maxlength="400" autocomplete="off" onfocus="if (trim(this.value) == \'type title here\') {this.value=\'\';};this.className=\'inputfocus\';" onblur="if (trim(this.value) == \'\') {this.value=\'type title here\';this.className=\'inputplaceholder\';} else {this.className=\'inputplaceholderblur\';}" onkeyup="if (trim(this.value) != \'\') {$(\'submit\').set(\'styles\',{\'display\':\'block\'});} else if (trim(this.value) == \'\') {$(\'submit\').set(\'styles\',{\'display\':\'none\'});}" value="'+response['title']+'"></td></tr><tr><td align="left" class="subtext" style="font-size: 14px;">'+response['host']+'</td></tr><tr><td align="left" style="padding-left: 12px; padding-top: 4px;"><textarea name="atch'+newatchct+'_details" id="atch'+newatchct+'_details" cols="40" rows="2" onfocus="if (trim(this.value) == \'type description here (optional)\') {this.value=\'\';};this.className=\'inputfocus\';" onblur="if (trim(this.value) == \'\') {this.value=\'type description here (optional)\';this.className=\'inputplaceholder\';} else {this.className=\'inputplaceholderblur\';}"'+response['description']+'</textarea></td></tr><tr><td align="left" class="subtext" style="padding-left: 14px; padding-top: 4px;"><table cellpadding="0" cellspacing="0" onclick="if($(\'atch'+newatchct+'_ui-thumbsexist\').get(\'checked\') == false){$(\'atch'+newatchct+'_ui-thumbsexist\').set(\'checked\', true);$(\'atch'+newatchct+'_thumbnailviewer\').set(\'styles\',{\'display\':\'none\'});$(\'atch'+newatchct+'_thumbpicker\').set(\'styles\',{\'display\':\'none\'});$(\'atch'+newatchct+'_thumbsexist\').set(\'value\', \'n\');}else{$(\'atch'+newatchct+'_ui-thumbsexist\').set(\'checked\', false);$(\'atch'+newatchct+'_thumbnailviewer\').set(\'styles\',{\'display\':\'block\'});$(\'atch'+newatchct+'_thumbpicker\').set(\'styles\',{\'display\':\'block\'});$(\'atch'+newatchct+'_thumbsexist\').set(\'value\', \'y\');}" style="cursor: pointer;"><tr><td align="left"><input type="checkbox" name="atch'+newatchct+'_ui-thumbsexist" id="atch'+newatchct+'_ui-thumbsexist" value="y"  onclick="if($(\'atch'+newatchct+'_ui-thumbsexist\').get(\'checked\') == false){$(\'atch'+newatchct+'_thumbsexist\').set(\'value\', \'n\');$(\'atch'+newatchct+'_ui-thumbsexist\').set(\'checked\', true);$(\'atch'+newatchct+'_thumbnailviewer\').set(\'styles\',{\'display\':\'none\'});$(\'atch'+newatchct+'_thumbpicker\').set(\'styles\',{\'display\':\'none\'});}else{$(\'atch'+newatchct+'_thumbsexist\').set(\'value\', \'y\');$(\'atch'+newatchct+'_ui-thumbsexist\').set(\'checked\', false);$(\'atch'+newatchct+'_thumbnailviewer\').set(\'styles\',{\'display\':\'block\'});$(\'atch'+newatchct+'_thumbpicker\').set(\'styles\',{\'display\':\'block\'});}"/></td><td align="left" style="padding-left: 4px;">don\'t show thumbnail</td></tr></table></td></tr></table></td><td align="left" valign="top" style="padding-left: 24px;"><input type="button" value="remove" onclick="$(\'atchmnt_ct\').set(\'value\', (parseFloat($(\'atchmnt_ct\').get(\'value\'))-1));$(\'atch'+newatchct+'\').destroy();"/></td></tr></table></div><div align="left"><input type="hidden" id="atch'+newatchct+'_thmubdisplaynum" name="atch'+newatchct+'_thmubdisplaynum" value="1"/><input type="hidden" id="atch'+newatchct+'_thumbsexist" name="atch'+newatchct+'_thumbsexist" value="y"/><input type="hidden" id="atch'+newatchct+'_type" name="atch'+newatchct+'_type" value="'+response['type']+'"/><input type="hidden" id="atch'+newatchct+'_url" name="atch'+newatchct+'_url" value="'+response['url']+'"/><input type="hidden" id="atch'+newatchct+'_host" name="atch'+newatchct+'_host" value="'+response['host']+'"/><input type="hidden" id="atch'+newatchct+'_tnurl" name="atch'+newatchct+'_tnurl" value="'+response['thumbnails'][0][0]+'"/></div>'});	
					}
					
				}
				newElem.inject($('attachments'), 'top');
				$('atchmnt_ct').set('value', newatchct);
				$('link_loader').destroy();
				$('loader').set('styles',{'display':'none'});
				$('editbtns').set('styles',{'display':'block'});
				$('btnsbmt').set('styles',{'display':'block'});
			}
		}).get({'u': url});
	},
	
	stopRequest: function() {
		requestToGetSiteData.cancel();
		$('link_loader').destroy();
		$('loader').set('styles',{'display':'none'});
		$('editbtns').set('styles',{'display':'block'});
		$('btnsbmt').set('styles',{'display':'block'});
	}
}

var attachments = {
	ap: function(url, apid) {
		parent.PopBox.close();
		var newatchct = parseFloat($('atchmnt_ct').get('value'))+1;
		var newElem = new Element('div', {'id': 'atch'+newatchct, 'align': 'left', 'styles': {'background': '#fff', 'border-bottom': '2px solid #C5C5C5', 'padding-bottom': '12px', 'margin-top': '6px'}, 'html': '<div align="left"><table cellpadding="0" cellspacing="0"><tr><td align="center" valign="top"><img src="'+url+'"/></td><td align="center" valign="top" style="padding-left: 6px;">Album Photo</td><td align="left" valign="top" style="padding-left: 24px;"><input type="button" value="remove" onclick="$(\'atchmnt_ct\').set(\'value\', (parseFloat($(\'atchmnt_ct\').get(\'value\'))-1));$(\'atch'+newatchct+'\').destroy();"/></td></tr></table></div><div align="left"><input type="hidden" id="atch'+newatchct+'_type" name="atch'+newatchct+'_type" value="ap"/><input type="hidden" id="atch'+newatchct+'_apid" name="atch'+newatchct+'_apid" value="'+apid+'"/></div>'});
		newElem.inject($('attachments'), 'top');
		$('atchmnt_ct').set('value', newatchct);
	},
	upload: function(url, atchid) {
		parent.PopBox.close();
		var newatchct = parseFloat($('atchmnt_ct').get('value'))+1;
		var newElem = new Element('div', {'id': 'atch'+newatchct, 'align': 'left', 'styles': {'background': '#fff', 'border-bottom': '2px solid #C5C5C5', 'padding-bottom': '12px', 'margin-top': '6px'}, 'html': '<div align="left"><table cellpadding="0" cellspacing="0"><tr><td align="center" valign="top"><img src="'+url+'"/></td><td align="center" valign="top" style="padding-left: 6px;">Uploaded Photo</td><td align="left" valign="top" style="padding-left: 24px;"><input type="button" value="remove" onclick="$(\'atchmnt_ct\').set(\'value\', (parseFloat($(\'atchmnt_ct\').get(\'value\'))-1));$(\'atch'+newatchct+'\').destroy();"/></td></tr></table></div><div align="left"><input type="hidden" id="atch'+newatchct+'_type" name="atch'+newatchct+'_type" value="upld_p"/><input type="hidden" id="atch'+newatchct+'_atchid" name="atch'+newatchct+'_atchid" value="'+atchid+'"/></div>'});
		newElem.inject($('attachments'), 'top');
		$('atchmnt_ct').set('value', newatchct);
	},
	lnk: function(type, host, tn_url, title, description, atchid) {
		parent.PopBox.close();
		var newatchct = parseFloat($('atchmnt_ct').get('value'))+1;
		if (type=='img') {
			var newElem = new Element('div', {'id': 'atch'+newatchct, 'align': 'left', 'styles': {'background': '#fff', 'border-bottom': '2px solid #C5C5C5', 'padding-bottom': '12px', 'margin-top': '6px'}, 'html': '<div align="left"><table cellpadding="0" cellspacing="0" width="444px"><tr><td align="left" valign="top" style="width: 90px; height: 80px;"><div id="atch'+newatchct+'_thumbnailviewer" style="width: 90px; height: 80px; overflow: hidden; position: relative;"><div id="atch'+newatchct+'_thumbnaillist" style="position: absolute; top: 0px; left: 0px;"><table cellpadding="0" cellspacing="0"><tr><td align="center" valign="top" width="90px"><div align="center" valign="top" style="width: 90px; height: 80px;"><img src="'+tn_url+'"/></div></td></tr></table></div></div></td><td align="left" valign="top" style="padding-left: 24px;"><input type="button" value="remove" onclick="$(\'atchmnt_ct\').set(\'value\', (parseFloat($(\'atchmnt_ct\').get(\'value\'))-1));$(\'atch'+newatchct+'\').destroy();"/></td></td></table></div><div align="left"><input type="hidden" id="atch'+newatchct+'_type" name="atch'+newatchct+'_type" value="prevlnk_img"/><input type="hidden" id="atch'+newatchct+'_atchid" name="atch'+newatchct+'_atchid" value="'+atchid+'"/></div>'});
		} else {
			var newElem = new Element('div', {'id': 'atch'+newatchct, 'align': 'left', 'styles': {'background': '#fff', 'border-bottom': '2px solid #C5C5C5', 'padding-bottom': '12px', 'margin-top': '6px'}, 'html': '<div align="left"><table cellpadding="0" cellspacing="0" width="444px"><tr><td align="left" valign="top" style="width: 90px; height: 80px;"><div id="atch'+newatchct+'_thumbnailviewer" style="width: 90px; height: 80px; overflow: hidden; position: relative;"><div id="atch'+newatchct+'_thumbnaillist" style="position: absolute; top: 0px; left: 0px;"><table cellpadding="0" cellspacing="0"><tr><td align="center" valign="top" width="90px"><div align="center" valign="top" style="width: 90px; height: 80px;"><img src="'+tn_url+'"/></div></td></tr></table></div></div></td><td align="left" valign="top" width="334px" style="padding-left: 12px;"><table cellpadding="0" cellspacing="0"><tr><td align="left">'+title+'</td></tr><tr><td align="left" class="subtext" style="font-size: 14px;">'+host+'</td></tr><tr><td align="left" class="subtext" style="padding-left: 12px; padding-top: 4px;">'+description+'</td></tr></table></td><td align="left" valign="top" style="padding-left: 24px;"><input type="button" value="remove" onclick="$(\'atchmnt_ct\').set(\'value\', (parseFloat($(\'atchmnt_ct\').get(\'value\'))-1));$(\'atch'+newatchct+'\').destroy();"/></td></tr></table></div><div align="left"><input type="hidden" id="atch'+newatchct+'_type" name="atch'+newatchct+'_type" value="prevlnk_site"/><input type="hidden" id="atch'+newatchct+'_atchid" name="atch'+newatchct+'_atchid" value="'+atchid+'"/></div>'});	
		}
		newElem.inject($('attachments'), 'top');
		$('atchmnt_ct').set('value', newatchct);
	}
}