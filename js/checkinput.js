function checkinputname(arg){
    var value = arg.value;
    var bla = value.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, ' ').replace(/[0-9]/g, '');
    arg.value=bla;
 }

function checkinputphone(arg){
    var value = arg.value;
    var bla = value.replace(/[^0-9.+()]/g,'');
    arg.value=bla;
 }

function checkrequired(arg){
	console.log(arg);
	if (arg.value.length==0) {
		$('#'+arg.id).parent().find(".toasterHolder").css({"display": "block"});
	    setTimeout(function() {
	        $('#'+arg.id).parent().find(".toasterHolder").fadeOut(1500);
	    },3000);
	    // $('#'+arg.id).focus();
	}
}

function checkrequiredinput(arg){
	if (arg.val().length==0) {
		arg.parent().find(".toasterHolder").css({"display": "block"});
	    setTimeout(function() {
	        arg.parent().find(".toasterHolder").fadeOut(1500);
	    },3000);
	    arg.focus();
	    return false;
	}else
		return true;
}

function changefromto(arg){
	var idform = '#'+ arg.closest("form").id;
	var valinputfrom = $(idform + ' input[name=from]').val();
	var valinputto = $(idform + ' input[name=to]').val();

	var inputto = $(idform + ' input[name=to]');
	var inputfrom = $(idform + ' input[name=from]');

	$(idform + ' input[name=from]').val(valinputto);
	$(idform + ' input[name=to]').val(valinputfrom);

	if (inputto.attr("readonly")) {
		inputto.removeAttr("readonly");
		inputfrom.attr('readonly', 'readonly');
	}else{
		inputfrom.removeAttr("readonly");
		inputto.attr('readonly', 'readonly');
	}
}

$(document).ready(function(){
  $("#taxiform").submit(function(e){
    e.preventDefault();
    if (checkrequiredinput($('#taxiform input[name=name]')) && checkrequiredinput($('#taxiform input[name=mobile]')) && checkrequiredinput($('#taxiform input[name=from]')) && checkrequiredinput($('#taxiform input[name=to]'))) {
    	var div = document.createElement('div');
	    var img = document.createElement('img');
	    img.src = 'img/loading.gif';
	    var martop = 'margin-top: ' + parseInt($('.ripple-parent').offset().top + 80) + 'px;';
	    img.style.cssText = 'width: 45px;' + martop;
	    div.style.cssText = 'position: fixed;top: 0px;left: 0px;z-index: 5000;width: 100%;height: 100%;text-align: center;background: rgba(0,0,0,.5);';
	    div.appendChild(img);
	    document.body.appendChild(div);

    	$.ajax({type: "POST",
            url: "/taxi_order",
            data: $("#taxiform").serialize(),
            success:function(result){
	      		$("#taxi_result").html(result);
	      		document.body.removeChild(div);
	      		$('#myModal').modal('show');
	      	},
			error: function(xhr, status, error) {
                $("#taxi_result").html('<h3>Quí khách đã đặt xe không thành công!</h3><i>Vui lòng liên hệ theo thông tin:</i><br/><span>NVTV    : Nguyễn Viết Huỳnh</span><br/><span>Hotline : 0922 33 3636</span><br/>');
			  	document.body.removeChild(div);
			  	$('#myModal').modal('show');
			}
	    });
    }
  });
});