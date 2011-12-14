// ==UserScript==
// @name           eRepublik battle pupil
// @version        v1.1.9
// @author         SDF_R98
// @namespace      SDF_R98
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==
//---------------------------------------------------------------------------
// reference http://userscripts.org/scripts/show/100931

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
		tstats = '<tr><td style="text-align:center;font-weight:bold;"><a href="http://userscripts.org/scripts/show/112129" target="_blank">battle pupil v1.1.9</a></td></tr>';
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
	var battleId = location.href.substr(49),
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

function checkStatus(citizenId, handler) {
	var i, goTimer,
		go = false;
	setTimeout(function () {
		GM_xmlhttpRequest({
			method:	'GET',
			url: 'http://api.erepublik.com/v2/feeds/citizens/' + citizenId + '.json',
			onload:	function (response) {
				var data = JSON.parse(response.responseText);
				go = (typeof data.name == 'string') ? true : false;
			}
		});
	}, 0);
	i = 0;
	goTimer = setInterval(function () {
		i++;
		if (go || i == 10) {
			clearInterval(goTimer);
			handler(go);
		}
	}, 500);
}

function getTid(handler) {
	var i, tidTimer,
		tid = -1;
	setTimeout(function () {
		GM_xmlhttpRequest({
			method:	'GET',
			url: 'http://leileme.com/gettid.php',
			onload:	function (response) {
				tid = response.responseText;
			}
		});
	}, 0);
	i = 0;
	// wait 5 seconds for tid
	tidTimer = setInterval(function () {
		i++;
		if (tid != -1 || i == 10) {
			clearInterval(tidTimer);
			handler(tid);
		}
	}, 500);
}

function add_stats() {
	$j('#experienceTooltip').before(
		'<div style="float:left;width:153px;margin-bottom:7px;"><a href="javascript:;" id="stats_btn" style="margin-top:10px;float:left;"><strong>Stats</strong></a><a href="javascript:;" id="addstats_btn" style="margin-top:10px;float:right;"><strong>Add</strong></a><a href="http://battlepupil.diandian.com" target="_blank" id="help_btn" style="margin-top:10px;float:right;display:none;"><strong>Help</strong></a><br/><br/><div id="my_stats"><table id="stats_table" style="width:100%;"></table><hr/><table id="tstats_table" style="width:100%;"></table><hr/><a href="javascript:;" id="submit_btn" style="float:left;"><strong>Submit</strong></a><a href="javascript:;" id="gen_btn" style="float:right;"><strong>Report</strong></a><br/><div id="stats_report" style="width:100%;"></div><textarea id="gen_txt" style="width:100%;display:none;"></textarea><a href="javascript:;" id="clear_btn" style="float:left;display:none;"><strong>Clear</strong></a></div></div>'
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
		key = $j('#total_f').find('small').text().trim().split("_", 2);
		key = '@_' + key[0] + '_' + key[1];
		if (localStorage.getItem(key) != null) {
			localStorage.setItem(key, fight + "_" + myInf);
			showStats();
			return;
		}
		if (localStorage.getItem('@' + key) != null) {
			localStorage.setItem('@' + key, fight + "_" + myInf);
		} else { //add @_battleId_zondId
			localStorage.setItem(key, fight + "_" + myInf);
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
		var r, cmcs, elites, cmcInf, cmcFight, eliteInf, tmp, value, key, i, len, citizenId;
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
			checkStatus(citizenId, function (go) {
				if (!go) {
					$j('#stats_report').html('<span style="color:red;">eRepublik citizen API is down.</span>');
					return;
				}
				$j('#stats_report').html('30% - Wait a mo...');
				getTid(function (tid) {
					var comment, others, msg;
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
						msg = 'battleid=9999&uid=' + citizenId + '&fight=' + cmcFight + '&damage=' + cmcInf + '&others=' + comment + '&form_id=212110&submit=Submit&tid=' + tid;
						setTimeout(function () {
							GM_xmlhttpRequest({
								method:	'POST',
								url: 'http://leileme.com/add.php',
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								data: msg,
								onload:	function () {
									$j('#stats_report').html('70% - Wait a mo...');
									comment = 'ELITE_TASK: [' + elites.join('] [') + ']' + others;
									msg = 'battleid=9999&uid=' + citizenId + '&fight=' + dmgMilitary(1) + '&damage=' + eliteInf + '&others=' + comment + '&form_id=212110&elite=1&submit=Submit&tid=' + tid;
									setTimeout(function () {
										GM_xmlhttpRequest({
											method:	'POST',
											url: 'http://leileme.com/add.php',
											headers: {
												'Content-Type': 'application/x-www-form-urlencoded'
											},
											data: msg,
											onload: function () {
												$j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://leileme.com/list.php" target="_blank">leileme.com/list.php</a>');
											},
											onerror: function () {
												$j('#stats_report').html('<span style="color:red;">An error occured while transferring ELITE_TASK data. Try to submit again or access: <br/></span><a href="http://leileme.com/formElite.php" target="_blank">leileme.com/formElite.php</a>');
											}
										});
									}, 0);
								},
								onerror: function () {
									$j('#stats_report').html('<span style="color:red;">An error occured while transferring CMC_TASK data. Try to submit again or access: <br/></span><a href="http://leileme.com/form.php" target="_blank">leileme.com/form.php</a>');
								}
							});
						}, 0);
						return;
					}
					if (cmcs.length > 0) {
						comment = 'CMC_TASK: [' + cmcs.join('] [') + ']' + others;
						msg = 'battleid=9999&uid=' + citizenId + '&fight=' + cmcFight + '&damage=' + cmcInf + '&others=' + comment + '&form_id=212110&submit=Submit&tid=' + tid;
						setTimeout(function () {
							GM_xmlhttpRequest({
								method:	'POST',
								url: 'http://leileme.com/add.php',
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								data: msg,
								onload:	function () {
									$j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://leileme.com/list.php" target="_blank">leileme.com/list.php</a>');
								},
								onerror: function () {
									$j('#stats_report').html('<span style="color:red;">An error occured while transferring data. Try to submit again or access: <br/></span><a href="http://leileme.com/form.php" target="_blank">leileme.com/form.php</a>');
								}
							});
						}, 0);
					}
					if (elites.length > 0) {
						comment = 'ELITE_TASK: [' + elites.join('] [') + ']' + others;
						msg = 'battleid=9999&uid=' + citizenId + '&fight=' + dmgMilitary(1) + '&damage=' + eliteInf + '&others=' + comment + '&form_id=212110&elite=1&submit=Submit&tid=' + tid;
						setTimeout(function () {
							GM_xmlhttpRequest({
								method:	'POST',
								url: 'http://leileme.com/add.php',
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								data: msg,
								onload:	function () {
									$j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://leileme.com/list.php" target="_blank">leileme.com/list.php</a>');
								},
								onerror: function () {
									$j('#stats_report').html('<span style="color:red;">An error occured while transferring data. Try to submit again or access: <br/></span><a href="http://leileme.com/formElite.php" target="_blank">leileme.com/formElite.php</a>');
								}
							});
						}, 0);
					}
				});
			});
		}
	});
}

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$j = unsafeWindow.jQuery;
		if (typeof unsafeWindow == 'undefined') {
			unsafeWindow = window;
		}
		add_fight();
		add_stats();
	}
}

GM_wait();