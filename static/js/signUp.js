window.addEventListener('load', function () {
    let sign_page = '/newsign';
    let now_href = location.pathname;
    let hide_gnb = document.querySelector('.gnb_list');
    let logo_center = document.querySelector('.nav');
    if (now_href === sign_page) {
        hide_gnb.style.display = 'none';
        logo_center.style.justifyContent = 'center';
    }
});

function check_pw() {
    var pw = document.getElementById('pw').value;

    if (pw.length < 8 || pw.length > 16) {
        alert('비밀번호는 8글자 이상, 16글자 이하만 이용 가능합니다.');
        document.getElementById('pw').value = '';
    }
    if (document.getElementById('pw').value != '' && document.getElementById('pw2').value != '') {
        if (document.getElementById('pw').value == document.getElementById('pw2').value) {
            document.getElementById('check').innerHTML = '비밀번호가 일치합니다.' //옆에 메세지를 띄우기 위해 inner를 썼다.
            document.getElementById('check').style.color = 'blue';
            document.getElementById('check').style.fontSize = '10px';

        } else {
            document.getElementById('check').innerHTML = '비밀번호가 일치하지 않습니다.';
            document.getElementById('check').style.color = 'red';
            document.getElementById('check').style.fontSize = '10px';
        }
    }
    var chk_num = pw.search(/[0-9]/g);
    var chk_eng = pw.search(/[a-zA-Z]/ig);
    if (chk_num < 0 || chk_eng < 0) {
        alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
        return false;
    }
}

function check_id_format(result) {
    var regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{4,10}$/;
    return regExp.test(result);
}

function check_id() {
    const inputID = $('#id').val();

    if (inputID == "") {
        document.getElementById('idCheck').innerHTML = '아이디를 입력해주세요.'
        document.getElementById('icCheck').style.color = 'red';
        document.getElementById('idCheck').style.fontSize = '5px';
    } else if (!check_id_format(inputID)) {
        document.getElementById('idCheck').innerHTML = '아이디의 형식을 확인해주세요. 영문과 숫자, 일부 특수문자(._-) 사용 가능. 4-10자 길이'
        document.getElementById('icCheck').style.color = 'red';
        document.getElementById('idCheck').style.fontSize = '5px';
    } else {
        $.ajax({
            type: "POST",
            url: "/check_dup",
            data: {
                check_id: inputID
            },
            success: function (response) {
                if (response["msg"]) {
                    document.getElementById('idCheck').innerHTML = response["msg"]
                    document.getElementById('idCheck').style.color = 'blue'
                    document.getElementById('idCheck').style.fontSize = '5px';
                    inputID.focus();
                } else {
                    document.getElementById('idCheck').innerHTML = response["exists"]
                    document.getElementById('idCheck').style.color = 'red'
                    document.getElementById('idCheck').style.fontSize = '5px';
                    inputID.focus();
                }
            }
        });

    }
}


function signup() {
    let user_id = $('#id').value;
    let user_password = $('#pw').value;
    console.log(user_id);
    $.ajax({
        type: "POST",
        url: "/signup",
        data: {
            user_id: user_id,
            user_password: user_password
        },
        success: function (response) {
            alert(response['msg']);
            window.location.replace('/');
        }
    });
}
