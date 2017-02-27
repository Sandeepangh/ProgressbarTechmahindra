function loadJSON(callback) {
 
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'http://pb-api.herokuapp.com/bars', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
 
           
            callback(xobj.responseText);
 
        }
    }
    xobj.send(null);
 
}
                loadJSON(function(response) {
   
                    jsonresponse = JSON.parse(response);
                    bars = jsonresponse["bars"];
                    var maxRange = jsonresponse["limit"];
                   
                    var arr = [];
 
                for (var i = 0; i < jsonresponse["buttons"].length; i++) {
                    arr.push(jsonresponse["buttons"][i]);
                }
                    
                var myData = [];
                 for(i = 0; i < jsonresponse["bars"].length; i++) {
                     var obj = {
                    name: "progress#"+i,
                    value: jsonresponse["bars"][i]
                                            };
                myData.push(obj);
       
                }
    	//console.log("maxRange "+maxRange);
                var ractive=new Ractive({el:"#container",template:"#template",data:{progressbars:myData,amounts:arr,maxRange:maxRange},adjust:function(a){var b=this.get("selectedProgress");if(null!=b){var c="progressbars["+b+"].value",d=Math.max(0,this.get(c));d>0&&0>a&&0>d+a?this.add(c,~d+1):0==d&&0>a?this.add(c,0):this.add(c,a)}}});
    });
   