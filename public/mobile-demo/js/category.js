$(function () {
    // 初始化mui的区域滚动 传入父容器的选择器
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    //调用 获取左侧分类的菜单数据
    getCategoryLeftData();
    // //调用左侧分类的点击
    categoryLeftClick();
    // //调用获取右侧分类商品数据的
    getCategoryRightData(1);

});

function getCategoryLeftData() {
    $.ajax({
        url: '/category/queryTopCategory',
        success: function (backData) {
            // console.log(backData);
            var data = template('categoryLeftTmp', backData);
            // console.log(data);
            $('.category-left ul').html(data);
            $('.category-left ul li:eq(0)').addClass('active');
        }
    })
};

function categoryLeftClick() {
    $('.category-left').on('click','ul li a',function(e){
        $('.category-left ul li').removeClass('active');
        $(e.target.parentNode).addClass('active');
        var id = $(e.target).data('id');
        getCategoryRightData(id);
    })
}

function getCategoryRightData(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        data: {
            'id': id
        },
        success: function (backData) {
            // console.log(backData);
            var data = template('categoryRightTmp', backData);
            // console.log(data);
            if (backData.rows.length) {
                $('.category-right .mui-scroll').html(data);
            } else {
                $('.category-right .mui-scroll').html("没有您要搜索商品数据哦!");
            }
        }
    })

}