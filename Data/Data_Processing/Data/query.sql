/*
메인페이지 - (1) 복지 해시태그(성과보상, 열린문화, 건강한삶, 역량성장) 선택시 해당 회사 목록 보여주기
*/
select replace(replace(replace(기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명, 주요사업, 산업1, 산업2, 성과보상, 열린문화, 건강한삶, 역량성장
from Company
where 성과보상 = 1;

/*
메인페이지 - (2) 기업정책 내 해시태그(내수, 수출, 인력, 창업...) 별 기업정책 3개 제공
*/
select b.해시태그, a.pblancNm as 정책명
from 기업정책 as a
join Company as b
on b.해시태그 = a.pldirSportRealmLclasCodeNm
where b.해시태그 = "내수"
group by a.pblancNm
limit 3
;

/*
메인페이지 - (3) 청년정책 내 해시태그(서울, 대구, 부산, ...) 별 기업정책 3개 제공 
*/
select polyBizSjnm, polyBizSecd, polyItcnCn
from 청년정책_v3
where polyBizSecd = '서울'
limit 3
;

/*
상세페이지 - (1) 복지 해시태그(성과보상, 열린문화, 건강한삶, 역량성장) 회사목록 내 특정 회사 선택시 회사명 제공
*/
select replace(replace(replace(기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명
from Company
where 기업명 like '%선일금고제작%'
;

/*
상세페이지 - (2) 특정 기업 시각화 자료 제공
*/
select 산업1, 산업2, 산업3, 산업4
from Company
where 기업명 like '%선일금고제작%'
;