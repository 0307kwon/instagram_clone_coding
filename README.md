# instagram_clone_coding


# 1. 개요

<img src="/readme_images/2020.11.05.gif" width=500px >

인스타그램과 외관과 기능이 똑같은 웹페이지를 만드는 것이 목표입니다.

# 2. 사용된 기술

NodeJS(express)

ES6

MongoDB

pbkdf2(password)

session

multer

# 3. 이론

<details>
<summary>패스워드 보안</summary>
       
       
- 기본 원리 
       
    단방향 암호화 : 암호화는 가능하지만 반대로 복호화는 불가능한 암호화방법을 사용하여

    비밀번호를 해싱하고, db에 비밀번호 원본을 저장하는 것이 아닌 해싱값을 저장한다.

    ⇒ 로그인 시 비밀번호 일치여부를 확인 할 때에는 입력된 비밀번호를 암호화하여

    db에 저장된 해싱값과 비교한다. 

    단방향 암호화의 예시 : hd5 (이제 더이상 쓰지 않음, 취약점이 발견됨),

    sha256 (이걸 요즘 쓴다는데 또 취약점이 발견되었을 수 있음)
    
    
    
</details>


# 프로젝트 진행 상황

<details>
<summary>[2020.11.05]</summary>
<p>1. 로그인 기능 구현</p>
<p>2. 비밀번호 암호화 ( pbkdf2 사용 )</p>
<p>3. 세션기능 완성</p>
<img src="/readme_images/2020.11.05.gif" width=500px >
</details>

