//---------------------------------------------------------------------------
// v1.1.9
// 参考Bronie FPeD http://userscripts.org/scripts/review/70450
//---------------------------------------------------------------------------
var $j = jQuery.noConflict();
var currURL = location.href;
var rank = {
	Recruit: 1,
	Private: 2,
	'Private *': 3,
	'Private **': 4,
	'Private ***': 5,
	Corporal: 6,
	'Corporal *': 7,
	'Corporal **': 8,
	'Corporal ***': 9,
	Sergeant: 10,
	'Sergeant *': 11,
	'Sergeant **': 12,
	'Sergeant ***': 13,
	Lieutenant: 14,
	'Lieutenant *': 15,
	'Lieutenant **': 16,
	'Lieutenant ***': 17,
	Captain: 18,
	'Captain *': 19,
	'Captain **': 20,
	'Captain ***': 21,
	Major: 22,
	'Major *': 23,
	'Major **': 24,
	'Major ***': 25,
	Commander: 26,
	'Commander *': 27,
	'Commander **': 28,
	'Commander ***': 29,
	'Lt Colonel': 30,
	'Lt Colonel *': 31,
	'Lt Colonel **': 32,
	'Lt Colonel ***': 33,
	Colonel: 34,
	'Colonel *': 35,
	'Colonel **': 36,
	'Colonel ***': 37,
	General: 38,
	'General *': 39,
	'General **': 40,
	'General ***': 41,
	'Field Marshal': 42,
	'Field Marshal *': 43,
	'Field Marshal **': 44,
	'Field Marshal ***': 45,
	'Supreme Marshal': 46,
	'Supreme Marshal *': 47,
	'Supreme Marshal **': 48,
	'Supreme Marshal ***': 49,
	'National Force': 50,
	'National Force *': 51,
	'National Force **': 52,
	'National Force ***': 53,
	'World Class Force': 54,
	'World Class Force *': 55,
	'World Class Force **': 56,
	'World Class Force ***': 57,
	'Legendary Force': 58,
	'Legendary Force *': 59,
	'Legendary Force **': 60,
	'Legendary Force ***': 61,
	'God of War': 62,
	'God of War *': 63,
	'God of War **': 64,
	'God of War ***': 65
};
var ccode = {
	Argentina: 'ARG',
	Venezuela: 'VEN',
	'United Kingdom': 'UK',
	Switzerland: 'CH',
	Netherlands: 'NL',
	'Czech Republic': 'Czech',
	'South Korea': 'SK',
	Indonesia: 'IND',
	Australia: 'AUS',
	'South Africa': 'ZA',
	'Republic of Moldova': 'Moldova',
	Philippines: 'PH',
	Singapore: 'SGP',
	'Bosnia and Herzegovina': 'BIH',
	Lithuania: 'LT',
	'North Korea': 'NK',
	'Republic of Macedonia (FYROM)': 'MKD',
	Montenegro: 'MNE',
	'Republic of China (Taiwan)': 'ROC',
	'New Zealand': 'NZ',
	'Saudi Arabia': 'SA',
	'United Arab Emirates': 'UAE'
};

function dmgCalc(militaryRank, strength, weaponPower, fights, bonus) {
	var damage = Math.floor((militaryRank + 5) * (strength + 400) * 0.005 * (1 + weaponPower * 0.01));
	return Math.floor(damage * bonus) * fights;
}

function str_replace(haystack, needle, replacement) {
	var temp = haystack.split(needle);
	return temp.join(replacement);
}

function add_inf() {
	var content = $j('#content'),
		str,
		mRank = content.find('div.citizen_military:eq(1)').find('a').text().trim();
	str = content.find('div.citizen_military:eq(0)').find('h4').text().trim();
	str = parseFloat(str_replace(str, ',', ''));

	content.find('div.citizen_military:last').after('<h3>Influence</h3><table border="0" width="100%" class="details"><thead><tr><th>Weapons</th><th>None</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>Q5</th></tr></thead><tbody><tr class="current"><td class="skill"><span class="skiller">Influence</span></td><td class="stat">' +
		dmgCalc(rank[mRank], str, 0, 1, 1) + '</td><td class="stat">' +
		dmgCalc(rank[mRank], str, 20, 1, 1) + '</td><td class="stat">' +
		dmgCalc(rank[mRank], str, 40, 1, 1) + '</td><td class="stat">' +
		dmgCalc(rank[mRank], str, 60, 1, 1) + '</td><td class="stat">' +
		dmgCalc(rank[mRank], str, 80, 1, 1) + '</td><td class="stat">' +
		dmgCalc(rank[mRank], str, 100, 1, 1) + '</td></tr></tbody></table><div class="clear"></div><h3>Influence Calculator<span style="float:right">Weapons: <select id="dmgWeapon" size="1"><option value="0">None</option><option value="20">Q1</option><option value="40">Q2</option><option value="60">Q3</option><option value="80">Q4</option><option value="100" selected="selected">Q5</option></select>&nbsp;&nbsp;&nbsp;&nbsp;Fights: <input id="dmgFights" name="dmgFights" value="65" size="4" maxlength="4" /></span></h3><div class="citizen_military" style="margin-bottom:2px"><div id="dmgResults"><strong>Total influence: </strong><h4 style="margin-left:10px">' +
		dmgCalc(rank[mRank], str, 100, 65, 1) + '</h4><div class="stat"><small>With NE bonus: <strong><span style="font-size:12px">' +
		dmgCalc(rank[mRank], str, 100, 65, 1.1) + '</span></strong></small></div></div></div>'
		);

	$j('#dmgFights').keyup(function () {
		var fights = $j('#dmgFights').val(),
			weaponPower = $j('#dmgWeapon').val();
		$j('#dmgResults').html('<strong>Total influence: </strong><h4 style="margin-left:10px">' +
			dmgCalc(rank[mRank], str, weaponPower, fights, 1) + '</h4><div class="stat"><small>With NE bonus: <strong><span style="font-size:12px">' +
			dmgCalc(rank[mRank], str, weaponPower, fights, 1.1) + '</span></strong></small></div>'
			);
	});

	$j('#dmgWeapon').change(function () {
		$j('#dmgFights').keyup();
	});
}

function add_news() {
	$j('#articles').find('a:first').before('<a href="/en/news/latest/all/China/1" class="mbutton"><img src="http://www.erepublik.com/images/flags/S/China.gif" alt="" /><span>Latest news of eChina</span></a>' +
		'<a href="/en/newspaper/ministry-of-sinodefence-196717/1" class="mbutton"><img src="http://www.erepublik.com/images/flags/S/China.gif" alt="" /><span>Daily Order of SinoDefence</span></a>'
		);
}

function dmgMilitary(bonus) {
	var str,
		mRank = $j('#rank_icon').attr('title');
	str = $j('#fighter_skill').text().trim();
	str = parseFloat(str_replace(str, ',', ''));
	if (typeof mRank == 'undefined' || mRank.length == 0) {
		mRank = $j('#rank_icon').attr('original-title').substr(15).trim();
	} else {
		mRank = mRank.substr(15).trim();
	}
	return dmgCalc(rank[mRank], str, 100, 1, bonus);
}

function sortStats(a, b) {
	var ta = a.split('_'),
		tb = b.split('_');
	if (parseInt(ta[1], 10) == parseInt(tb[1], 10)) {
		return parseInt(ta[2], 10) - parseInt(tb[2], 10);
	} else {
		return parseInt(ta[1], 10) - parseInt(tb[1], 10);
	}
}

function getKey() {
	var i, len, tmp,
		key = [];
	for (i = 0, len = localStorage.length; i < len; i++) {
		tmp = localStorage.key(i);
		if (tmp.charAt(0) != '@') {
			continue;
		}
		key.push(tmp);
	}
	key.sort(sortStats);
	return key;
}

function showStats() {
	var tmp, value, i, len,
		stats = [],
		stats_table = $j('#stats_table'),
		tstats = '',
		cmcInf = 0,
		cmcFight = 0,
		eliteInf = 0,
		eliteFight = 0,
		key = getKey();
	stats.push('<tr><th>Battle</th><th>Influence</th><th></th></tr>');
	for (i = 0, len = key.length; i < len; i++) {
		value = localStorage.getItem(key[i]).split('_');
		tmp = key[i].split('_');
		if (tmp[0].length == 1) {
			cmcFight += parseInt(value[0], 10);
			cmcInf += parseInt(value[1], 10);
			stats.push('<tr><td>' + tmp[1] + '_'  + tmp[2] + '_' + value[0] + '</td><td>' + value[1] + '</td><td><a href="javascript:;" class="delete_stat" id="' + key[i] + '">X</a></td></tr>');
		} else {
			eliteFight += parseInt(value[0], 10);
			eliteInf += parseInt(value[1], 10);
			stats.push('<tr style="background-color:LightGreen;"><td>' + tmp[1] + '_'  + tmp[2] + '_' + value[0] + '</td><td>' + value[1] + '</td><td><a href="javascript:;" class="delete_stat" id="' + key[i] + '">X</a></td></tr>');
		}
	}
	if (stats.length == 1) {
		stats = '';
	} else {
		stats = stats.join('');
	}
	stats_table.html(stats);
	stats_table.find('th').css({'border': '1px solid gray', 'padding': '2px'});
	stats_table.find('td').css({'border': '1px solid gray', 'padding': '1px'});
	if (cmcInf > 0) {
		tstats += '<tr><td>CMC Influence</td><td>' + cmcInf + '</td></tr><tr><td>CMC Q5fight</td><td>' + cmcFight + '</td></tr>';
	}
	if (eliteInf > 0) {
		tstats += '<tr><td>Elite Influence</td><td>' + eliteInf + '</td></tr><tr><td>Elite Q5fight</td><td>' + eliteFight + '</td></tr>';
	}
	if (cmcInf == 0 && eliteInf == 0) {
		tstats = '<tr><td style="text-align:center;font-weight:bold;"><a href="https://chrome.google.com/webstore/detail/agomcdedciahocgedolbgelnefkkhbip" target="_blank">battle pupil v1.1.9</a></td></tr>';
	}
	$j('#tstats_table').html(tstats);
	stats_table.find('tr:gt(0)').click(function () {
		var key = $j(this).find('a.delete_stat').attr('id'),
			value = localStorage.getItem(key),
			tmp = key.split('_');
		localStorage.removeItem(key);
		if (tmp[0].length == 1) {
			localStorage.setItem('@' + key, value);
		} else {
			key = key.substr(1);
			localStorage.setItem(key, value);
		}
		$j('#clear_btn').css('display', 'none');
		$j('#gen_txt').css('display', 'none');
		$j('#stats_report').html('');
		showStats();
	});
	stats_table.find('a.delete_stat').click(function () {
		localStorage.removeItem($j(this).attr('id'));
		$j('#clear_btn').css('display', 'none');
		$j('#gen_txt').css('display', 'none');
		$j('#stats_report').html('');
		showStats();
	});
}

function add_fight() {
	var battleId = currURL.substr(49),
		leftCrowns = $j('#popup_left_crowns').attr('crowns'),
		rightCrowns = $j('#popup_right_crowns').attr('crowns'),
		zoneId = parseInt(leftCrowns, 10) + parseInt(rightCrowns, 10) + 1,
		leftSide = $j('#pvp_header').find('h3:first').html(),
		myInf = $j('#total_damage').find('strong').text().trim(),
		dmg = dmgMilitary(1),
		neDmg = dmgMilitary(1.1),
		initFight,
		scriptNode = document.createElement('script'),
		text = [];
	if (leftSide.indexOf('Resistance') != -1) {
		leftSide = leftSide.substr(20);
	}
	if (leftSide.length > 8) {
		leftSide = ccode[leftSide];
	}
	if (localStorage.getItem('ne') != null && localStorage.getItem('ne') == battleId) {
		initFight = Math.round(myInf / neDmg);
	} else if (myInf % dmg != 0 && myInf % neDmg == 0) {
		initFight = Math.round(myInf / neDmg);
	} else {
		initFight = Math.round(myInf / dmg);
	}
	$j('#pvp_battle_area').find('table.damage_aligner').find('td').after(
		'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><div id="total_f" style="width:auto;height:25px;display:block;cursor:default;"><small style="font-size:11px;color:#fff;float:left;text-shadow:#333 0px 1px 1px;display:block;height:25px;opacity:0.7;-moz-opacity:0.7;-ms-fiter:' + "'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)'" + ';filter:alpha(opacity=70);line-height:25px;font-weight:bold;padding:0 5px;background-image:url(' + "'/images/modules/pvp/influence_left.png?1321873582'" + ');background-position:left;">' + battleId + '_' + zoneId + '_' + leftSide + '</small><strong style="color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(' + "'/images/modules/pvp/influence_right.png?1321873582'" + ');background-position:right;">' + initFight + '</strong></div></td>'
	);
	function localMain() {
		$j('#total_f').ajaxSuccess(function (e, xhr, settings) {
			if (settings.url != '/en/military/fight-shoot') {
				return;
			}
			var myInf = parseInt($j('#total_damage').find('strong').html(), 10),
				fight = parseInt($j(this).find('strong').html(), 10),
				key,
				response = JSON.parse(xhr.responseText),
				user = response.user;
			if (response.error) {
				return;
			}
			if (response.message === 'ENEMY_KILLED') {
				if (response.oldEnemy.isNatural === true) {
					localStorage.setItem('ne', location.href.substr(49));
					myInf += Math.floor(user.givenDamage * 0.1);
				}
				myInf += user.givenDamage;
				fight += user.earnedXp;
				$j(this).find('strong').html(fight);
				key = $j(this).find('small').text().trim().split('_', 2);
				key = '@_' + key[0] + '_' + key[1];
				if (localStorage.getItem(key) != null) {
					localStorage.setItem(key, fight + '_' + myInf);
					showStats();
					return;
				}
				key = '@' + key;
				if (localStorage.getItem(key) != null) {
					localStorage.setItem(key, fight + '_' + myInf);
					showStats();
				}
			}
		});
	}
	text.push('(function () {');
	text.push("var rank = {Recruit: 1, Private: 2, 'Private *': 3, 'Private **': 4, 'Private ***': 5, Corporal: 6, 'Corporal *': 7, 'Corporal **': 8, 'Corporal ***': 9, Sergeant: 10, 'Sergeant *': 11, 'Sergeant **': 12, 'Sergeant ***': 13, Lieutenant: 14, 'Lieutenant *': 15, 'Lieutenant **': 16, 'Lieutenant ***': 17, Captain: 18, 'Captain *': 19, 'Captain **': 20, 'Captain ***': 21, Major: 22, 'Major *': 23, 'Major **': 24, 'Major ***': 25, Commander: 26, 'Commander *': 27, 'Commander **': 28, 'Commander ***': 29, 'Lt Colonel': 30, 'Lt Colonel *': 31, 'Lt Colonel **': 32, 'Lt Colonel ***': 33, Colonel: 34, 'Colonel *': 35, 'Colonel **': 36, 'Colonel ***': 37, General: 38, 'General *': 39, 'General **': 40, 'General ***': 41, 'Field Marshal': 42, 'Field Marshal *': 43, 'Field Marshal **': 44, 'Field Marshal ***': 45, 'Supreme Marshal': 46, 'Supreme Marshal *': 47, 'Supreme Marshal **': 48, 'Supreme Marshal ***': 49, 'National Force': 50, 'National Force *': 51, 'National Force **': 52, 'National Force ***': 53, 'World Class Force': 54, 'World Class Force *': 55, 'World Class Force **': 56, 'World Class Force ***': 57, 'Legendary Force': 58, 'Legendary Force *': 59, 'Legendary Force **': 60, 'Legendary Force ***': 61, 'God of War': 62, 'God of War *': 63, 'God of War **': 64, 'God of War ***': 65};");
	text.push(sortStats.toString());
	text.push(getKey.toString());
	text.push(showStats.toString());
	text.push(localMain.toString());
	text.push('localMain();');
	text.push('})();');
	scriptNode.textContent = text.join('\n');
	document.head.appendChild(scriptNode);
}

function checkStatus(citizenId) {
	var go = false;
	$j.ajax({
		type: 'GET',
		url: 'http://api.erepublik.com/v2/feeds/citizens/' + citizenId + '.json',
		async: false,
		dataType: 'json',
		success: function (data) {
			go = (typeof data.name == 'string') ? true : false;
		}
	});
	return go;
}

function getTid() {
	var tid = -1;
	$j.ajax({
		type: 'GET',
		url: 'http://leileme.com/gettid.php',
		async: false,
		success: function (data) {
			tid = data;
		}
	});
	return tid;
}

function postData(msg, successHandler, errorHandler) {
	$j.ajax({
		type: 'POST',
		url: 'http://leileme.com/add.php',
		data: msg,
		success: successHandler,
		error: errorHandler
	});
}

function add_stats() {
	$j('#experienceTooltip').before(
		'<div style="float:left;width:153px;margin-bottom:7px;"><a href="javascript:;" id="stats_btn" style="margin-top:10px;float:left;"><strong>Stats</strong></a><a href="javascript:;" id="addstats_btn" style="margin-top:10px;float:right;"><strong>Add</strong></a><a href="http://battlepupil.diandian.com" target="_blank" id="help_btn" style="margin-top:10px;float:right;display:none;"><strong>Help</strong></a><br/><div id="my_stats"><table id="stats_table" style="width:100%;"></table><hr/><table id="tstats_table" style="width:100%;"></table><hr/><a href="javascript:;" id="submit_btn" style="float:left;"><strong>Submit</strong></a><a href="javascript:;" id="gen_btn" style="float:right;"><strong>Report</strong></a><br/><div id="stats_report" style="width:100%;"></div><textarea id="gen_txt" style="width:100%;display:none;"></textarea><a href="javascript:;" id="clear_btn" style="float:left;display:none;"><strong>Clear</strong></a></div></div>'
	);
	var key, myInf, fight;
	key = $j('#total_f').find('small').text().trim().split('_', 2);
	key = '@_' + key[0] + '_' + key[1];
	if (localStorage.getItem(key) != null) {
		myInf = $j('#total_damage').find('strong').text().trim();
		fight = $j('#total_f').find('strong').text().trim();
		localStorage.setItem(key, fight + '_' + myInf);
	}
	key = '@' + key;
	if (localStorage.getItem(key) != null) {
		myInf = $j('#total_damage').find('strong').text().trim();
		fight = $j('#total_f').find('strong').text().trim();
		localStorage.setItem(key, fight + '_' + myInf);
	}
	showStats();

	$j('#stats_btn').click(function () {
		$j('#my_stats').toggle();
		$j('#addstats_btn').toggle();
		$j('#help_btn').toggle();
		$j('#clear_btn').css('display', 'none');
		$j('#gen_txt').css('display', 'none');
		$j('#stats_report').html('');
		showStats();
	});
	$j('#addstats_btn').click(function () {
		var myInf = $j('#total_damage').find('strong').text().trim(),
			fight = $j('#total_f').find('strong').text().trim(),
			key;
		key = $j('#total_f').find('small').text().trim().split('_', 2);
		key = '@_' + key[0] + '_' + key[1];
		if (localStorage.getItem(key) != null) {
			localStorage.setItem(key, fight + '_' + myInf);
			showStats();
			return;
		}
		if (localStorage.getItem('@' + key) != null) {
			localStorage.setItem('@' + key, fight + '_' + myInf);
		} else { //add @_battleId_zondId
			localStorage.setItem(key, fight + '_' + myInf);
		}
		showStats();
	});
	$j('#gen_btn').click(function () {
		showStats();
		if ($j('#stats_report').html() != '') {
			$j('#clear_btn').css('display', 'none');
			$j('#gen_txt').css('display', 'none').val('');
			$j('#stats_report').html('');
			return;
		}
		var tmp, value, i, len, stats,
			cmcs = [],
			elites = [],
			key = getKey();
		for (i = 0, len = key.length; i < len; i++) {
			value = localStorage.getItem(key[i]).split('_');
			tmp = key[i].split('_');
			if (tmp[0].length == 1) {
				cmcs.push(tmp[1] + '_'  + tmp[2] + '_' + value[0]);
			} else {
				elites.push(tmp[1] + '_'  + tmp[2] + '_' + value[0]);
			}
		}
		if (cmcs.length == 0 && elites.length == 0) {
			$j('#stats_report').html('');
			$j('#gen_txt').css('display', 'none');
			return;
		}
		stats = '';
		if (cmcs.length > 0) {
			stats += 'CMC_TASK: [' + cmcs.join('] [') + ']<br/>';
		}
		if (elites.length > 0) {
			stats += 'ELITE_TASK: [' + elites.join('] [') + ']';
		}
		$j('#stats_report').html(stats);
		$j('#gen_txt').css('display', 'block');
	});
	$j('#clear_btn').click(function () {
		var r, key, i, len;
		r = confirm('Clear all the statistic?');
		if (r == true) {
			key = getKey();
			for (i = 0, len = key.length; i < len; i++) {
				localStorage.removeItem(key[i]);
			}
			$j('#clear_btn').css('display', 'none');
			$j('#stats_report').html('');
			showStats();
		}
	});
	$j('#submit_btn').click(function () {
		var r, cmcs, elites, cmcInf, cmcFight, eliteInf, tmp, value, key, i, len, tid, comment, msg, citizenId, others, go;
		r = confirm('Submit to leileme.com?');
		if (r == true) {
			showStats();
			cmcs = [];
			elites = [];
			cmcInf = 0;
			cmcFight = 0;
			eliteInf = 0;
			key = getKey();
			for (i = 0, len = key.length; i < len; i++) {
				value = localStorage.getItem(key[i]).split('_');
				tmp = key[i].split('_');
				if (tmp[0].length == 1) {
					cmcFight += parseInt(value[0], 10);
					cmcInf += parseInt(value[1], 10);
					cmcs.push(tmp[1] + '_'  + tmp[2] + '_' + value[0]);
				} else {
					eliteInf += parseInt(value[1], 10);
					elites.push(tmp[1] + '_'  + tmp[2] + '_' + value[0]);
				}
			}
			if (cmcs.length == 0 && elites.length == 0) {
				$j('#clear_btn').css('display', 'none');
				$j('#gen_txt').css('display', 'none');
				$j('#stats_report').html('');
				return;
			}
			$j('#stats_report').html('10% - Wait a mo...');
			citizenId = $j('#financier').attr('href').substr(20);
			go = checkStatus(citizenId);
			if (!go) {
				$j('#stats_report').html('<span style="color:red;">eRepublik citizen API is down.</span>');
				return;
			}
			$j('#stats_report').html('30% - Wait a mo...');
			tid = getTid();
			if (tid == -1) {
				if (cmcs.length > 0) {
					$j('#stats_report').html('<span style="color:red;">An error occurred while getting tid. Try to submit again or access: <br/></span><a href="http://leileme.com/form.php" target="_blank">leileme.com/form.php</a>');
				} else {
					$j('#stats_report').html('<span style="color:red;">An error occurred while getting tid. Try to submit again or access: <br/></span><a href="http://leileme.com/formElite.php" target="_blank">leileme.com/formElite.php</a>');
				}
				return;
			}
			$j('#stats_report').html('40% - Wait a mo...');
			others = '';
			if ($j('#gen_txt').val() != '') {
				others = ' ' + $j('#gen_txt').val();
			}
			$j('#clear_btn').css('display', 'block');
			$j('#gen_txt').css('display', 'none');
			if (cmcs.length > 0 && elites.length > 0) {
				comment = 'CMC_TASK: [' + cmcs.join('] [') + ']' + others;
				msg = 'battleid=9999&uid=' + citizenId + '&fight=' + cmcFight + '&damage=' + cmcInf + '&others=' + comment + '&form_id=212110&tid=' + tid + '&submit=Submit';
				postData(msg,
					function () {
						$j('#stats_report').html('70% - Wait a mo...');
						comment = 'ELITE_TASK: [' + elites.join('] [') + ']' + others;
						msg = 'battleid=9999&uid=' + citizenId + '&fight=' + dmgMilitary(1) + '&damage=' + eliteInf + '&others=' + comment + '&form_id=212110&tid=' + tid + '&elite=1&submit=Submit';
						postData(msg,
							function () {
								$j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://leileme.com/list.php" target="_blank">leileme.com/list.php</a>');
							},
							function () {
								$j('#stats_report').html('<span style="color:red;">An error occured while transferring ELITE_TASK data. Try to submit again or access: <br/></span><a href="http://leileme.com/formElite.php" target="_blank">leileme.com/formElite.php</a>');
							});
					},
					function () {
						$j('#stats_report').html('<span style="color:red;">An error occured while transferring CMC_TASK data. Try to submit again or access: <br/></span><a href="http://leileme.com/form.php" target="_blank">leileme.com/form.php</a>');
					});
				return;
			}
			if (cmcs.length > 0) {
				comment = 'CMC_TASK: [' + cmcs.join('] [') + ']' + others;
				msg = 'battleid=9999&uid=' + citizenId + '&fight=' + cmcFight + '&damage=' + cmcInf + '&others=' + comment + '&form_id=212110&tid=' + tid + '&submit=Submit';
				postData(msg,
					function () {
						$j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://leileme.com/list.php" target="_blank">leileme.com/list.php</a>');
					},
					function () {
						$j('#stats_report').html('<span style="color:red;">An error occured while transferring data. Try to submit again or access: <br/></span><a href="http://leileme.com/form.php" target="_blank">leileme.com/form.php</a>');
					});
			}
			if (elites.length > 0) {
				comment = 'ELITE_TASK: [' + elites.join('] [') + ']' + others;
				msg = 'battleid=9999&uid=' + citizenId + '&fight=' + dmgMilitary(1) + '&damage=' + eliteInf + '&others=' + comment + '&form_id=212110&tid=' + tid + '&elite=1&submit=Submit';
				postData(msg,
					function () {
						$j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://leileme.com/list.php" target="_blank">leileme.com/list.php</a>');
					},
					function () {
						$j('#stats_report').html('<span style="color:red;">An error occured while transferring data. Try to submit again or access: <br/></span><a href="http://leileme.com/formElite.php" target="_blank">leileme.com/formElite.php</a>');
					});
			}
		}
	});
}

function add_region() {
	var rh = $j('#pvp_header').find('h2'),
		region = rh.text(),
		regionurl;
	if (region == 'Federation of BiH') {
		regionurl = 'Federation+of+BiH';
	} else if (region == 'Lika and Gorski Kotar') {
		regionurl = 'Lika-Gorski-Kotar';
	} else if (region == 'Istria and Kvarner') {
		regionurl = 'Istria-Kvarner';
	} else if (region == 'Styria and Carinthia') {
		regionurl = 'Styria-Carinthia';
	} else if (region == 'Jammu and Kashmir') {
		regionurl = 'Jammu-Kashmir';
	} else if (region == 'Svalbard & Jan Mayen') {
		regionurl = 'Svalbard-Jan-Mayen';
	} else if (region == 'North-West Frontier Province') {
		regionurl = 'North-West-Frontier';
	} else if (region == 'Sistan and Baluchistan') {
		regionurl = 'Sistan-Baluchistan';
	} else if (region == 'Norrland and Sameland') {
		regionurl = 'Norrland-Sameland';
	} else if (region == 'Yorkshire & Humberside') {
		regionurl = 'Yorkshire-Humberside';
	} else if (region == 'Lika and Gorski Kotar') {
		regionurl = 'Lika-Gorski-Kotar';
	} else if (region == 'Castilla y Leon') {
		regionurl = 'Castilla-Leon';
	} else if (region == 'Newfoundland and Labrador') {
		regionurl = 'Newfoundland';
	} else if (region == 'Chungcheongnam-do') {
		regionurl = 'Chungcheongnam';
	} else if (region == 'Gyeongsangbuk-do') {
		regionurl = 'Gyeongsangbuk';
	} else if (region == 'Gyeongsangnam-do') {
		regionurl = 'Gyeongsangnam';
	} else if (region == 'Gyeonggi-do') {
		regionurl = 'Gyeonggi';
	} else if (region == 'Gangwon-do') {
		regionurl = 'Gangwon';
	} else if (region == 'Chungcheongbuk-do') {
		regionurl = 'Chungcheongbuk';
	} else if (region == 'Jeollabuk-do') {
		regionurl = 'Jeollabuk';
	} else if (region == 'Jeollanam-do') {
		regionurl = 'Jeollanam';
	} else if (region == 'Ha\'il') {
		regionurl = 'Ha-il';
	} else {
		regionurl = region.replace(/ /g, '-');
	}
	rh.html('<a target="_blank" href="http://www.erepublik.com/en/region/' + regionurl + '">' + region + '</a>');
}

function add_moveb() {
	var data = JSON.parse($j('#content').html().split('regionsInvolved = ')[1].split(';\n</script>')[0]),
		countryId = $j('#country_list').val();
	$j('#region_list').find('option:gt(0)').each(function () {
		$j(this).text('[' + data[countryId][$j(this).val()].distance + '] ' + $j(this).text());
	});
	$j('#country_list').change(function () {
		var countryId = $j('#country_list').val();
		$j('#region_list').find('option:gt(0)').each(function () {
			$j(this).text('[' + data[countryId][$j(this).val()].distance + '] ' + $j(this).text());
		});
	});
}

function add_movec() {
	var region, src, srcx, srcy;
	region = JSON.parse('{"111":13,"110":13,"113":13,"112":13,"114":13,"109":13,"108":13,"183":23,"146":32,"497":43,"500":43,"147":32,"148":32,"504":43,"686":31,"150":32,"653":32,"149":32,"505":43,"186":13,"198":13,"11":13,"39":13,"514":23,"36":13,"3":13,"515":23,"38":13,"37":13,"5":13,"9":13,"35":13,"246":13,"256":13,"258":13,"167":23,"168":23,"169":23,"184":23,"170":23,"171":23,"181":23,"173":23,"174":23,"175":23,"176":23,"179":23,"166":23,"177":23,"178":23,"180":23,"152":42,"678":32,"676":42,"685":31,"155":42,"688":31,"154":42,"151":42,"681":32,"675":42,"156":42,"679":32,"153":42,"41":11,"42":21,"43":21,"44":21,"45":21,"47":21,"50":21,"51":21,"52":21,"54":21,"61":21,"62":21,"65":21,"66":21,"67":21,"70":21,"72":21,"73":21,"76":21,"80":21,"82":21,"83":21,"86":21,"88":21,"89":21,"361":24,"395":24,"396":24,"522":25,"362":24,"520":25,"363":24,"364":24,"390":24,"384":24,"519":25,"525":25,"385":24,"368":24,"386":24,"370":24,"371":24,"670":25,"391":24,"372":24,"373":24,"387":24,"671":25,"375":24,"392":24,"459":24,"493":24,"494":24,"669":25,"389":24,"377":24,"378":24,"397":24,"379":24,"380":24,"495":24,"394":24,"393":24,"381":24,"382":24,"97":11,"103":11,"105":11,"98":12,"102":12,"106":11,"99":12,"107":12,"95":12,"96":12,"100":12,"101":11,"221":13,"104":11,"208":13,"222":13,"224":13,"216":13,"215":13,"212":13,"226":13,"227":13,"219":13,"217":13,"210":13,"220":13,"218":13,"223":13,"213":13,"225":13,"531":13,"529":13,"228":13,"229":13,"230":13,"341":13,"342":13,"344":13,"437":13,"346":13,"343":13,"347":13,"291":13,"295":13,"292":13,"562":13,"294":13,"185":13,"187":13,"243":13,"244":13,"188":13,"189":13,"191":13,"46":21,"530":13,"193":13,"426":13,"249":13,"53":21,"55":21,"195":13,"425":13,"190":13,"196":13,"197":13,"251":13,"58":21,"60":21,"424":13,"423":13,"250":13,"64":21,"68":21,"69":21,"71":21,"207":13,"252":13,"74":21,"75":21,"199":13,"200":13,"77":21,"201":13,"202":13,"306":13,"253":13,"78":21,"204":13,"254":13,"255":13,"257":13,"307":13,"205":13,"84":21,"85":21,"528":13,"323":13,"325":13,"549":13,"231":13,"322":13,"232":13,"321":13,"324":13,"235":13,"326":13,"320":13,"236":13,"293":13,"312":13,"340":13,"316":13,"319":13,"440":13,"442":13,"345":13,"315":13,"242":13,"241":13,"240":13,"237":13,"238":13,"140":13,"137":13,"349":23,"537":13,"353":23,"135":13,"358":23,"355":23,"132":13,"144":13,"356":23,"352":23,"512":23,"513":23,"516":23,"517":23,"518":23,"414":23,"533":13,"138":13,"143":13,"133":13,"136":13,"142":13,"134":13,"141":13,"534":14,"535":15,"543":13,"660":13,"538":13,"532":13,"536":13,"139":13,"540":13,"659":13,"544":13,"541":13,"542":14,"661":13,"487":25,"489":25,"484":25,"486":25,"488":25,"491":25,"490":25,"485":25,"526":25,"527":25,"461":35,"462":35,"463":35,"465":35,"646":25,"328":45,"334":35,"647":25,"466":35,"329":35,"641":35,"330":45,"464":35,"460":35,"332":45,"333":45,"450":24,"458":24,"455":24,"448":24,"561":24,"456":24,"451":24,"453":24,"447":24,"449":24,"443":24,"454":24,"446":24,"452":24,"445":24,"457":24,"498":43,"499":43,"501":43,"502":43,"503":43,"92":13,"91":13,"93":13,"94":13,"209":13,"233":13,"736":24,"739":24,"717":24,"725":24,"478":24,"479":24,"742":24,"723":24,"480":24,"472":24,"483":24,"719":24,"482":24,"740":24,"475":24,"477":24,"473":24,"474":24,"481":24,"726":23,"741":24,"476":24,"492":24,"471":23,"469":32,"467":23,"468":23,"470":23,"507":24,"509":24,"511":24,"508":24,"510":24,"260":23,"336":13,"265":23,"266":23,"339":13,"581":13,"268":23,"269":23,"611":13,"270":23,"272":23,"621":13,"337":13,"571":13,"601":13,"338":13,"275":23,"591":13,"278":23,"690":31,"116":21,"691":31,"120":21,"122":21,"117":21,"119":21,"118":21,"693":31,"121":21,"115":21,"160":23,"161":23,"162":23,"125":32,"126":32,"159":23,"127":32,"157":23,"129":32,"163":23,"158":23,"130":32,"123":32,"124":32,"131":32,"259":23,"40":21,"261":23,"262":23,"635":23,"263":23,"264":23,"623":23,"192":13,"90":21,"637":23,"48":21,"49":21,"626":23,"56":21,"743":23,"194":13,"267":23,"625":23,"57":21,"59":21,"63":21,"271":23,"627":23,"624":23,"203":13,"639":23,"273":23,"274":23,"622":23,"79":21,"628":23,"640":23,"636":23,"81":21,"276":23,"277":23,"634":23,"87":21,"638":23,"682":31,"684":31,"683":31,"630":42,"629":42,"687":31,"633":42,"631":42,"632":42,"644":25,"645":25,"643":34,"642":35,"648":34,"239":13,"656":13,"655":13,"657":13,"658":13,"654":13,"662":13,"651":23,"650":23,"652":23,"649":23,"707":13,"666":13,"708":13,"709":13,"663":13,"665":13,"711":13,"710":13,"664":13,"667":13,"712":13,"674":42,"668":25,"672":25,"673":25,"680":32,"677":32,"689":31,"694":31,"692":31,"699":23,"700":23,"698":23,"702":24,"521":25,"703":24,"523":25,"524":25,"701":24,"704":24,"420":23,"718":23,"721":23,"724":23,"418":23,"417":23,"422":23,"697":23,"416":23,"421":23,"731":23,"728":23,"727":24,"419":23,"695":23,"735":23,"415":23,"413":23,"696":23,"706":23,"705":23,"713":35,"715":35,"716":35,"331":45,"714":35,"733":23,"730":23,"734":23,"732":23,"737":24,"738":24,"745":23,"746":23,"744":23,"720":23,"722":24,"729":23}');
	src = $j('#content').find('div.zone:first').find('big').text();
	src = src.replace('A', '1');
	src = src.replace('B', '2');
	src = src.replace('C', '3');
	src = src.replace('D', '4');
	srcx = Math.floor(src / 10);
	srcy = src % 10;
	$j('#country_list').change(function () {
		$j('#region_list').one('click', function () {
			$j(this).find('option:gt(0)').each(function () {
				var ta, tb, dx, dy, move,
					dest = region[$j(this).val()],
					destx = Math.floor(dest / 10),
					desty = dest % 10;
				ta = srcx < destx ? srcx : destx;
				tb = srcx > destx ? srcx : destx;
				dx = tb - ta < ta + 4 - tb ? tb - ta : ta + 4 - tb;
				ta = srcy < desty ? srcy : desty;
				tb = srcy > desty ? srcy : desty;
				dy = tb - ta < ta + 5 - tb ? tb - ta : ta + 5 - tb;
				move = 1 + dx + dy;
				$j(this).text('[' + move + '] ' + $j(this).text());
			});
		});
	});
}

if (currURL == 'http://www.erepublik.com/en') {
	add_news();
} else if (currURL.charAt(36) == 'p') {
	add_inf();
} else if (currURL.charAt(28) == 'm') {
	add_moveb();
	add_region();
	add_fight();
	add_stats();
} else {
	add_movec();
}