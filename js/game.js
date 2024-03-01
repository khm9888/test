// 금액을 입력하고 확정을 누르면 
// input 태그 비활성화가 된다.
// 0원이면 더 높은 금액을 넣어주세요 라고 하고 alert
// 완성
let num_cnt = 36;

function setup_play() {
    let coin = $("#insert_coin").val()
    // disabled 여부
    if ($("#insert_coin").is(":disabled")) {
        let sentence = "이미 베팅하셨습니다. 다음 스텝으로 넘어가세요!"
        alert(sentence)
        return
    }
    if (coin == 0) {
        let sentence = "더 높은 금액을 입력해주세요!"
        alert(sentence)
    } else {
        $("#insert_coin").attr("disabled", true);
        console.log(coin)
        let sentence = "금액을 확정하셨습니다. 베팅을 해주세요!"
        alert(sentence)
    }
}

// 추후 수정
function end_play() {
    let coin = $("#insert_coin").val()
    if (coin == 0) {
        $("#insert_coin").removeAttr("disabled");
        alert("다시 시도해보세요!")
    }
}
// 금액확정을 했는지 체크,
// 이미 베팅했는지도 체크

// 베팅 금액을 입력을 하고
// 가진 금액보다 많이 입력하면, 취소 후 안내창
// 이하로 배팅하면 입력 창 비활성화, 금액 확정도 비활성화(가능한지 확인)
function prepare_play() {
    let remind_coin = Number($("#insert_coin").val())
    let playing_coin = Number($("#gamble_coin").val())

    if (playing_coin == 0){
        let sentence = "아무것도 걸지 않고, 베팅할 순 없습니다."
        alert(sentence)
        return 
    }

    if ($("#insert_coin").is(":disabled")) {
        if ($("#gamble_coin").is(":disabled")) {
            let sentence = "이미 베팅하셨습니다. 옵션을 선택해주세요."
            alert(sentence)
            return
        }
        if (playing_coin > remind_coin) {
            console.log(playing_coin > remind_coin)
            let sentence = "남은 금액이 얼마없습니다."
            alert(sentence)
        } else {
            $("#insert_coin").val(remind_coin - playing_coin);
            $("#gamble_coin").attr("disabled", true);
            let sentence = "베팅됐습니다. 옵션을 선택해주세요."
            alert(sentence)
            check_playing = true;
        }
    }
}

// 선택 옵션 중 하나를 선택하게끔 하고, 둘 중 하나라도 선택한다면
// 모두 비활성화

// 베팅 금액 간이 비활성화 상태이고, 옵션도 비활성화라면,
// 게임을 진행한다.
// color 쪽이 선택됐다면, 2배
// number 쪽이 선택됐다면, 36배가 되도록 한다.
// 당첨? 되지 않았다면 모든 값은 적용 x
// 당첨됐다면, 가진 코인에 추가한다.

function option_fn_1(){
    $("#select_color").attr("disabled", true);
    $("#select_number").attr("disabled", true);
    $("#select_grade").attr("disabled", true);

    return $("#select_color").val();
}
function option_fn_2(){
    $("#select_color").attr("disabled", true);
    $("#select_number").attr("disabled", true);
    $("#select_grade").attr("disabled", true);

    return $("#select_number").val();

}
function option_fn_3(){

    $("#select_color").attr("disabled", true);
    $("#select_number").attr("disabled", true);
    $("#select_grade").attr("disabled", true);

    return $("#select_grade").val();

}

function disable_fn(){
    if ($("#gamble_coin").is(":disabled")) {
        
    }else{
        let sentence = `베팅을 하지 않으셨습니다. 
 <금액 확정> 버튼을 눌러주세요`
        alert(sentence)
    }
    option_fn_1();
    option_fn_2();
    option_fn_3();
}

// 위에 값 disable 체크
// 

function able_fn(){
    $("#select_color").removeAttr("disabled");
    $("#select_number").removeAttr("disabled");
    $("#select_grade").removeAttr("disabled");
    $("#select_color").val("Red/Black")
    $("#select_number").val("Number")
    $("#select_grade").val("1st(1~12)/2nd(13~24)/3rd(25~36)")

    $("#gamble_coin").removeAttr("disabled");

}

function start_fn(){
    if ($("#insert_coin").is(":disabled") &&
     $("#gamble_coin").is(":disabled") &&
     $("#select_color").is(":disabled")) {
    let val_1 = option_fn_1()
    let val_2 = option_fn_2()
    let val_3 = option_fn_3()

    let ans_num = $("#hidden_answer_1").val()
    let trans_num;
    if (ans_num =="0"){
        trans_num=num_cnt+1
    }else if (ans_num =="00"){
        trans_num=num_cnt+2
    } 
    let ans_color = $("#hidden_answer_2").val() 
    let trans_color;
    if (ans_color=="Red"){
        trans_color=1
    }else if (ans_color=="Black"){
        trans_color=2
    }else{
        trans_color=3
    }
    
    let result = 0
    let coin = Number($("#gamble_coin").val())
    console.log("trans_color", trans_color)
    console.log("val_1 ", val_1)
    console.log("ans_num", ans_num)
    console.log("trans_num", trans_num)
    console.log("val_2", val_2)
    if (val_1 !="Red/Black" && trans_color == val_1){
        console.log("case1")
        result += coin*2
    } 
    if (val_2 !="Number" && trans_num == val_2){
        console.log("case2")
        result += coin*num_cnt
    }
    let bofore = Number($("#insert_coin").val())
    // 숫자로 변경해야함.

    console.log(bofore, result)
    bofore+=result
    $("#insert_coin").val(bofore)
    }else{
        let sentence = "이전 단계를 확인해주세요."
        alert(sentence)
    }
    
    able_fn();


}


