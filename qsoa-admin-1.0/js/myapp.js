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

//升级版Ajax方法
myapp.myAjax1= function(options,success_callback){
	layui.use('layer', function() {
		var $ = layui.jquery,
			layer = layui.layer;
		
		if(typeof options != 'undefined'){
			if(typeof options['success'] != 'undefined'){
				options['success'] = function(result){
					if(result.status != 200){
						if(result.code == 505){
							layer.msg(result.message,function(){
								myapp.openpage("login.html");
							});
							return;
						}
						layer.msg("服务器开小差了，请稍后再试");
					}
					if(success_callback){
						success_callback(result);
					}
				}
			}
			options['error'] = function(error){
				layer.msg("服务异常");
			}
		}
		
		myapp.myAjax(options);
	});
}

myapp.sendVC = function(obj,time){
		$(obj).text(time+"s后发送");
		var timeour = setInterval(function(){
			time --;
			$(obj).text(time+"s后发送");
		},1000);
		setTimeout(function(){
			clearInterval(timeour);
			$(obj).text("发送验证码");
			$(obj).removeClass('disabled');
		},time*1000);
}
//校验手机号码格式是否正确
myapp.checkPhone = function(phone) {
	var zzbds = /^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/;
	if (!zzbds.test(phone)) {
		return false;
	}
	return true;
}