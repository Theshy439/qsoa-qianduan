var myapp = {};
myapp.getApi = function(url) {
	return "/api/" + url.replace(/^\/+/g, '');
}
myapp.openpage = function(url) {
	if ('string' != typeof url || '' == url) {
		return;
	}
	window.location.href = url;
};
myapp.myAjax = function(options) {
	if (typeof options['url'] == 'undefined') {
		throw "url为空";
	}
	var my_options = {
		async: true,
		dataType: "JSON",
		type: "POST",
		success: function(result) {
			console.log(result);
		},
		error: function(error) {
			console.log(error);
		}
	}
	if (typeof options != 'undefined') {
		for (var k in options) {
			my_options[k] = options[k];
		}
	}
	$.ajax(my_options);
}

myapp.sendVC = function(id,time,callback){
	$(id).click(function(){
		if($(this).hasClass('disabled')){
			return;
		}
		$(this).addClass('disabled');
		if(callback){
			callback();
		}
		$(this).text(time+"s后发送");
		var timeour = setInterval(function(){
			time --;
			$(id).text(time+"s后发送");
		},1000);
		setTimeout(function(){
			clearInterval(timeour);
			$(id).text("发送验证码");
			$(id).removeClass('disabled');
		},time*1000);
	});
}