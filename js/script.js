
document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('rouletteCanvas');
    var ctx = canvas.getContext('2d');

    const colors = ["#000000", "#e6471d", "#009630"];
    let num_cnt = 36;

    let num_range = range_number(num_cnt);
    num_range.push("0");
    num_range.push("00");
    let sections = set_color();

    var startAngle = -Math.PI / 2; // 시작 각도를 12시 방향으로 변경
    var arc = Math.PI * 2 / sections.length;

    function set_color() {
        let empty_array=[]
        for (let i = 0; i < num_range.length; i++) {
            let num = num_range[i];
            let c_i
            if (typeof num == "string") {
                c_i = 2
            } else if (num % 2 == 0) {
                c_i = 0
            } else {
                c_i = 1
            }
            empty_array.push({ "num": num, "color": colors[c_i] })
        }
        return empty_array
    }

    function range_number(set_num) {
        let num_range = []
        for (let i = 1; i < set_num + 1; i++) {
            num_range.push(i)
        }
        return num_range;

    }

    $(document).ready(function () {
        make_opt_num();
    });
    function make_opt_num(){
        for (let i = 0;i<sections.length;i++){
            let section = sections[i]
            let num = section.num
            let temp_html = `<option value="${i+1}">${num}</option>`
            $("#select_number").append(temp_html)
        }
    }

 

    // }

    // 룰렛 그리기
    function drawRouletteWheel() {
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        

        // 룰렛 그리기
        for (let i = 0; i < sections.length; i++) {
            let num = sections[i].num;
            let color = sections[i].color;
            var angle = startAngle + i * arc;

            ctx.fillStyle = color;

            // ctx.fillStyle = section.color;

            ctx.beginPath();
            ctx.arc(centerX, centerY, centerX*0.9, angle, angle + arc, false);
            ctx.lineTo(centerX, centerY);
            ctx.fill();
            ctx.stroke();
            ctx.save();

            ctx.fillStyle = "#fff";
            ctx.font = "18px Pretendard";
            ctx.textAlign = "center";

            ctx.translate(centerX + Math.cos(angle + arc / 2) * 150,
                centerY + Math.sin(angle + arc / 2) * 150);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            for (let j = 0; j < sections.length; j++) {
                ctx.fillText(sections[i].num, 0, 40);
            }
            // ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        };
    }

    drawRouletteWheel();

    // 룰렛 돌리기 버튼 클릭 이벤트
    var spinBtn = document.getElementById('spinBtn');
    spinBtn.addEventListener('click', spinRoulette);

    // 룰렛 회전 애니메이션
    function spinRoulette() {
        var spins = 10; // 회전 횟수
        var degrees = Math.floor(Math.random() * 360) + 360 * spins;
        var spinAngle = degrees * (Math.PI / 180);
        var spinTime = 5000; // 회전 시간 (5초)
        var spinInterval = 50; // 각도 변화 간격

        var start = Date.now();
        var spinTimer = setInterval(function () {
            var elapsedTime = Date.now() - start;
            if (elapsedTime >= spinTime) {
                clearInterval(spinTimer);
                return;
            }

            var deltaTime = elapsedTime / spinTime;
            var angle = spinAngle * (1 - Math.pow(deltaTime - 1, 4));
            angle %= Math.PI * 2;
            drawRouletteWheel();
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            drawRouletteWheel();
            ctx.restore();
        }, spinInterval);

        // 회전이 멈춘 뒤에 선택된 결과 텍스트 출력
        setTimeout(function () {
            var index = Math.floor(((360 - degrees % 360) % 360) / (360 / sections.length));
            var num = sections[index].num;
            var color = sections[index].color;
            let r_color;
            if (color == colors[1]){
                r_color = "Red";
            }
            else if (color == colors[0]){
                r_color = "Black";
            }
            else{
                r_color = "Green";
            }
            $("#hidden_answer_1").val(num)
            $("#hidden_answer_2").val(r_color)
            alert('선택된 아이템: ' + num + " / "+r_color);
            start_fn();
        }, spinTime);
    }
});

