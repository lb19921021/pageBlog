var user = 'lb19921021';
var configURL = 'https://raw.githubusercontent.com/' + user + '/blogio/master/config.json'
var blogListURL = 'https://api.github.com/repos/' + user + '/blogio/contents/blogs';
var issuesList = 'https://api.github.com/repos/' + user + '/blogio/issues';
var issuesHTML = 'https://github.com/' + user + '/blogio/issues'
var token = "?access_token"+"=909fab5a3f8e19"+"faf89f636a630d2d7eba70ce9b";
$(document).ready(function() {
	load();
	// 生成类型菜单
	$.getJSON(configURL+token, function(json) {
		var $ul = $("#leixing");
		var lis = "";
		for (var i = 0; i < json.length; i++) {
			var j = json[i]
			var name = j.title;
			var li = $('<li >' + name + '</li>');
			li.attr("onclick", "getul(this)");
			li.attr("path", j.path);
			$ul.append(li);
		}
		closeload();
		$ul.find("li:first-child").click();
	});
})
var loadindex;

function load() {
	loadindex = layer.load(1, {
		shade: [0.1, '#fff']
		// 0.1透明度的白色背景
	});
}

function closeload() {
	layer.close(loadindex);
}

var ulsdata = {};

function getul(obj) {
	load();
	obj = $(obj);
	var path = obj.attr("path");
	var data = ulsdata[path];
	if (data == undefined) {
		$.getJSON(
		blogListURL + "/" + path + token, function(json) {
			showul(json);
			ulsdata[path] = json;
		});
	} else {
		showul(data);
	}


}

function showul(json) {
	var uls = new Array();
	for (var i = 0; i < json.length; i++) {
		var name = json[i].name; // Blog title
		var blogURL = json[i].download_url; // Blog Raw Url
		// add blog list elements
		var new_a = $("<li></li>")
		var type = "markdown";
		// delete '.md'
		if (name.substr(-3, 3) == ".md") {
			name = name.substr(0, name.length - 3);
		} else if (name.substr(-5, 5) == ".html") {
			name = name.substr(0, name.length - 5);
			type = "html";
		}
		new_a.text(name);
		// update content
		new_a.attr("data_blogURL", blogURL);
		new_a.attr("data_name", name);
		new_a.attr("href", "#");
		new_a.attr("data_type", type);
		new_a.attr("code", blogURL.split("/blogs/")[1]);
		new_a.attr("onclick", "setBlogTxt(this)");
		uls.push(new_a);
	}

	var mainw = $("#wenzhang0");
	mainw.html("");
	for (var i = 0; i < uls.length && i <= 8; i++) {
		mainw.append(uls[i]);
	}

	if (uls.length > 8) {
		var $div = $('<div class="inner columns aligned timu"><div class="span-1-25"><ul class="alt"></ul></div></div>');

	}
	closeload();

}

function openiframe(url, name) {
	layer.open({
		type: 2,
		title: name,
		shadeClose: true,
		shade: false,
		maxmin: true,
		// 开启最大化最小化按钮
		area: ['95%', '95%'],
		content: url
	});
}
var iframeobjdata;

function setBlogTxt(obj) {
	iframeobjdata = obj;
	openiframe("data.html", $(obj).attr("data_name"));
}