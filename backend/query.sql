/*
해시태그(내수, 수출, 인력...) 기반 정책 및 기업명 제공
*/
select a.pblancNm as 정책명, replace(replace(replace(b.기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명, b.해시태그
from 기업정책 as a
join Company as b
on b.정책 = a.pblancNm
;

/*
성과보상
*/
select replace(replace(replace(기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명, 성과보상, 해시태그
from Company
where 성과보상 = 1
;

/*
열린문화
*/
select replace(replace(replace(기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명, 열린문화, 해시태그
from Company
where 열린문화 = 1
;

/*
건강한삶
*/
select replace(replace(replace(기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명, 건강한삶, 해시태그
from Company
where 건강한삶 = 1
;

/*
역량성장
*/
select replace(replace(replace(기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명, 역량성장, 해시태그
from Company
where 역량성장 = 1
;