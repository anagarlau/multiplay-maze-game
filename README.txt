==========[USAGE]==========
#operation key
p1: arrow, /(eat item)
p2: W, A, S, D, e(eat item)

#cheat
1: p1 move to Dir loc
2: p2 move to Dir loc
0: reset game
m: draw path


==========[Description]==========
-2020.05.01 부터 시작
(https://editor.p5js.org/worldbiomusic/full/MkIoHW-fQ)
-maze game
-maze생성방식은 recursive DFS backtracking algorithm 사용
-기본은 javascript, 그래픽은 p5.js lib 사용
-The Coding Train의 Coding Challenge 에서 추가해서 만든것
-player 사각형에 써있는 A,B는 현재 player가 가야할 방향을 나타내줌


==========[Rule]==========
-각 Dir(A, B)도달시 Score 1점 추가
-각 Dir(A, B)도달시 maze size 작아짐
-Item먹으면 랜덤아이템 능력이 발동됨


==========[Version]==========
#0501
-https://editor.p5js.org/worldbiomusic/full/MkIoHW-fQ
-기본적인 Cell class와 DFS 사용해서 미로생생을 단계적으로 보여줌


#0503
-https://editor.p5js.org/worldbiomusic/full/whdLWLbNw
-기반 class 들 모두 추가(Maze, MazePathGenerator,  MazePathFinder, Cell, Player)
-2 player 추가
-path를 Cell색깔로 표시
-구조 많이 변경


#0521
-https://editor.p5js.org/worldbiomusic/full/pNiJNLmGK
-path를 Cell 중심을 서로 Line으로 이어 표시(보기편해짐)
-MazeManager class 추가


#0528
-https://editor.p5js.org/worldbiomusic/full/XL1M2S3qC
-Score 추가
-오른쪽 아래 골인지점들어갔을때 맵 축소시 원래 골인지점으로 이동
-골인지점 A, B 추가
-플레이어에 A, B 방향 표시 추가
-resetGame버튼 추가(0)
-Item 추가


#0612
-https://editor.p5js.org/worldbiomusic/full/E1OBAgklF
-html color 추가
-Item 기능추가 (player1, 2가 먹을시 Maze reload)


#0619
-https://editor.p5js.org/worldbiomusic/full/xOGARvizR
-Item 능력 추가, 랜덤선택
-GameManager class 제거
-모든 class를 Maze중점으로 동작하게 구조 변경(Maze가 interface역할)


#0628
-모든 class에 attribute, method 목록 작성
-item 랜덤색상으로 스폰됨


#0704
-DEBUG 변수 추가
-승리조건 추가: 점수
-승리 화면 추가


#0711
-maze 기초 기능을 관련 유틸 함수를 Maze class에 만드는중
-Item 능력 3개 추가


#0808
-MazePathGenerator을 DFS말고 BFS로도 만들어 보기
-MazePathFinder algorithm을 Dijkstra랑 A*로 바꿔보기



==========[Plan]==========
※매주 새로운 버전만들때 최신버전 파일 복사해서 만들기!
-game 시작시 player 수 정하고, 키보드 최초입력으로 동작키 설정
-web multy game
-html로 설정 추가할 예정
-github으로 관리예정
-MazePathFinder A* algorithm으로 바꿔보기
-item아이템 종류 알 수 있게 하는 구별법 만들기