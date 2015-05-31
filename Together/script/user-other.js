function openchatDetail(){
	fromuser = api.pageParam.username;
    api.openWin({
        name: 'chat',
        url: 'chat.html',

        pageParam:{fromuser:fromuser}
    });
}

function act_details(id){
		api.openWin({
		name: 'act-details',
		url: './act-details.html',
		pageParam: {id: id }
	});
}

function getdata(){

	//var uid = $api.getStorage('uid');
	var uid = api.pageParam.username;
	
	
	var URL = "/getPersonalData/";

	api.ajax({
				url : serverAddr + URL + uid,
				method : 'get',
				cache : false,
				timeout : 30,
				dataType : 'json',
				returnAll : false,
			}, function(ret, err) {
			
			
			initPersional(ret);
			
			});
			



}

function initPersional(ret1)
{
	//alert(ret.NickName);

    
    var personalCenter = api.require('personalCenter');

personalCenter.open({
    imgPath:'widget://image/jack.jpg',
    placeholderImg: 'widget://image/jack.jpg',
    showLeftBtn:false,
    showRightBtn:false,
    y:45,
    h:200,
    userName:ret1.NickName+"("+ret1.Gender+")",
    count: ret1.Credit,
  
  	fixedOn:api.frameName,
    btnArray:[
        {
        	title:"他的活动",
        	titleColor:'#FFFFFF',
        	count:ret1.myActivity.count,
            bgImg:'widget://image/userbg.png',
            
    		
    },
	        {
        	title:"他的收藏",
        	titleColor:'#FFFFFF',
        	count:'100',
            bgImg:'widget://image/userbg.png',
    		
    },
    	        {
        	title:"他参加的",
        	titleColor:'#FFFFFF',
        	count:'100',
            bgImg:'widget://image/userbg.png',
    		
    },
    ]
    },function(ret,err){
	
		display(ret.click,ret1);
});


}

function display(id,ret1){
	
			if(id ==0)
	{	

		var evalText = doT.template($("#act-template").text());
		$("#act-content").html(evalText(ret1.myActivity));
		
	}
		if(id ==1)
	{	alert('他的收藏');	}
		if(id ==2)
	{	alert('正在进行');	}
	
		
}
apiready = function () {
	
	getdata();
	api.setRefreshHeaderInfo({
	visible: true,
        // loadingImgae: 'wgt://image/refresh-white.png',
        bgColor: '#f2f2f2',
        textColor: '#4d4d4d',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    },function(ret,err){
    	//coding...
    	getdata();
    	api.refreshHeaderLoadDone();
    });
	

	
};
