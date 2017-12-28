$(function() {
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
});

function addHistory() {
    $('.btn-search').on('click', function () {
        var value = $('.search-form input').val();
        // console.log(value);
        if (!value) {
            alert('请输入要搜索的商品');
            return;
        };
        var historyData = localStorage.getItem('historyData');
        if (historyData) {
            historyData = JSON.parse(historyData);
        } else {
            historyData = [];
        }
        // console.log(historyData);
        if (historyData.indexOf(value) == -1) {
            historyData.push(value);
            localStorage.setItem('historyData', JSON.stringify(historyData));
            queryHistory();
        }
        $('.search-form input').val('');
    })
}

function queryHistory() {
    var historyData = localStorage.getItem('historyData');
    if (historyData) {
        historyData = JSON.parse(historyData);
    } else {
        historyData = [];
    };
    historyData = historyData.reverse();
    console.log(historyData);
    var data = template('search-list-item',{'rows':historyData});
    $('.search-history-list ul').html(data);
}

function deleteHistory() {
    $('.search-history-list').on('click','ul li a i ',function(e){
        var historyData = localStorage.getItem('historyData');
        historyData = JSON.parse(historyData);
        // console.log(historyData);
        var value = $(e.target).parent().data('history');
        // console.log(value);
        var index = historyData.indexOf(value + '');
        // console.log(index);
        historyData.splice(index,1);
        // console.log(historyData);
        localStorage.setItem('historyData',JSON.stringify(historyData));
        queryHistory();
    });
}

function clearHistory() {
    $('.btn-clear').on('click',function(){
        localStorage.setItem('historyData','');
        queryHistory();
    })
}