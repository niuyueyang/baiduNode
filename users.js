<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title>ORC����ʶ��</title>
		<link rel="stylesheet" href="css/style.css" media="screen" type="text/css">
	</head>
	<body>
		<input style="display: none;" id="photoItem" name="img" type="file">
    	<button style="display: none;">submit</button>
    	<div class="uploadBtn" id="showDiv">upload</div>
    	<div class="realBtn">submit</div>
    	<div class="showResult"></div>
	</body>
	<script type="text/javascript" src="js/jquery-2.1.0.js"></script>
	<script type="text/javascript">
		$("button").on("click", function (e) {
	    	e.preventDefault()
	    	var obj = new FormData();
	        obj.append("img",$("input").get(0).files[0]);
		    $.ajax({
		        url:"http://localhost:3000/users/uploadPhoto",
		        type:"post",
		        data:obj,
		        processData:false, // ����������
		        contentType : false, // ����������ͷ
		        cache:false,
		        success:function(data){
		            var data = data.words_result;
		            var content = "";
		            for(var i=0;i<data.length;i++){
		            	$(".showResult").append('<p>'+data[i].words+'</p>');
		            }
		        }
		    })
		});
		//���upload
		$("#showDiv").click(function(){
			$("#photoItem").trigger("click");
		});
		//���submit
		$(".realBtn").click(function(){
			$("button").trigger("click");
		});
        // ץȡ�ϴ�ͼƬ��ת������������ʾͼƬ��dom
        var img_upload=document.getElementById("photoItem");
        var img_area=document.getElementById("showDiv");
        // ��ӹ��ܳ��������¼�
        img_upload.addEventListener('change',readFile,false);
        function readFile(){
            var file=this.files[0];
            if(!/image\/\w+/.test(file.type)){ 
                alert("��ȷ���ļ�Ϊͼ������"); 
                return false; 
            }
            var reader=new FileReader();
            reader.readAsDataURL(file);
            reader.onload=function(){
                img_area.innerHTML = '<img style="width: 100%; vertical-align: middle;" src="'+this.result+'" alt=""/>'; 
            }
        }
	</script>
</html>