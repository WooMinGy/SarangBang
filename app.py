from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.cafes


## HTML 화면
@app.route('/')
def homework():
    return render_template('signUp.html')




#중복확인

@app.route('/check_dup', methods=['POST'])
def check_dup():
    check_id = request.form['check_id']
    if db.userdb.find_one({'id':check_id}) is None:
        return jsonify({'msg' : "사용 가능한 아이디 입니다."})
    else:
        return jsonify({'exists':"이미 존재하는 아이디 입니다."})

##1

# POST
@app.route('/signup', methods=['POST'])
def signUp():
    user_id = request.form['user_id']
    user_password = request.form['user_password']
    print(user_id, user_password)
    # db에 저장

    doc = {
        'id': user_id,
        'pw': user_password
    }
    db.userdb.insert_one(doc)
    return jsonify({'msg': '회원가입이 완료되었습니다.'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)