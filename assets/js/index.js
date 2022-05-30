function getUserInfo(){
    $.ajax({
        type:'GET',
        url:"/my/userinfo",
        data:null,
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) return layer.msg("获取用户信息失败！");
            layer.msg("获取用户信息成功！");
            renderAvatar(res.data)
        },
    })
    // 渲染用户信息
    const renderAvatar = (user) => {
        console.log(user);
        let uname = user.nickname || user.username;
        // 渲染欢迎语
        $('#welcome').html(`欢迎 ${uname}`);
        // 按需求渲染头像
        if(user.user_pic !== null){
            // 渲染图片头像
            $(".layui-nav-img").attr("src",user.user_pic).show();
            $(".text-avatar").hide();
        }else{
            $(".layui-nav-img").hide();
            $(".text-avatar").html(uname[0].toUpperCase())
        }
    }
    $(".btnLogout").click(() => {
        layui.layer.confirm(
            "确定退出登录？",
            { icon: 3, title: "" },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = "/login.html";
            }
        );
    });
}
getUserInfo()