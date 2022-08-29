import sqlite3
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from wordcloud import WordCloud
import matplotlib.pyplot as plt
import matplotlib
from pytrends.request import TrendReq
import pandas as pd
from bs4 import BeautifulSoup
from datetime import datetime, date, timedelta
from regex import F
import requests
import pandas as pd
import re

# Create your views here.
def index(request):
    return render(request, 'ioneu/index.html') 

# 2. views 함수 생성

# 메인페이지 - (1) 복지 해시태그 선택시 해당 회사 목록 보여주기
@api_view(['GET'])
def WelfareCompany(request, hashtag):
    # 회사 리스트 생성
    company = []

    # SQLite DB 연결
    # conn = sqlite3.connect("../../Data/Data_Processing/Data/IONEJOB.db")
    conn = sqlite3.connect("C:/Users/ameth/OneDrive/바탕 화면/ibkintern/ioneU/Data/Data_Processing/Data/IONEJOB.db")

    # Connection 으로부터 Cursor 생성
    cur = conn.cursor()

    # SQL 쿼리 실행
    cur.execute(f"""
    select replace(replace(replace(기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명, 주요사업, 산업1, 산업2, 성과보상, 열린문화, 건강한삶, 역량성장
    from Company
    where {hashtag} = 1;
    """)

    # 데이타 Fetch
    rows = cur.fetchall()
    for row in rows:
        company.append(row)
    
    # Connection 닫기
    conn.close()

    return Response(company)


# 메인페이지 - (2) 기업정책 탭 클릭시 금융 태그 관련 3개 정책 제공
@api_view(['GET'])
def FinancePolicy(request):
    # 기업 정책(금융) 리스트 생성
    finance_policy = []

    # SQLite DB 연결
    # conn = sqlite3.connect("../../Data/Data_Processing/Data/IONEJOB.db")
    conn = sqlite3.connect("C:/Users/ameth/OneDrive/바탕 화면/ibkintern/ioneU/Data/Data_Processing/Data/IONEJOB.db")


    # Connection 으로부터 Cursor 생성
    cur = conn.cursor()

    # SQL 쿼리 실행
    cur.execute(f"""
    select b.해시태그, a.pblancNm as 정책명
    from 기업정책 as a
    join Company as b
    on b.해시태그 = a.pldirSportRealmLclasCodeNm
    where b.해시태그 = '금융'
    group by a.pblancNm
    limit 3
    ;
    """)

    # 데이타 Fetch
    rows = cur.fetchall()
    for row in rows:
        finance_policy.append(row)
    
    # Connection 닫기
    conn.close()

    return Response(finance_policy)


# 메인페이지 - (2) 기업정책 내 해시태그(내수, 수출, 인력, 창업...) 별 기업정책 3개 제공 
@api_view(['GET'])
def CompanyPolicy(request, hashtag):
    # 기업정책(내수, 수출, 인력, 창업...) 리스트 생성
    policy = []

    # SQLite DB 연결
    # conn = sqlite3.connect("../../Data/Data_Processing/Data/IONEJOB.db")
    conn = sqlite3.connect("C:/Users/ameth/OneDrive/바탕 화면/ibkintern/ioneU/Data/Data_Processing/Data/IONEJOB.db")

    # Connection 으로부터 Cursor 생성
    cur = conn.cursor()

    # SQL 쿼리 실행
    cur.execute(f"""
    select b.해시태그, a.pblancNm as 정책명
    from 기업정책 as a
    join Company as b
    on b.해시태그 = a.pldirSportRealmLclasCodeNm
    where b.해시태그 = "{hashtag}"
    group by a.pblancNm
    limit 3
    ;
    """)

    # 데이타 Fetch
    rows = cur.fetchall()
    for row in rows:
        policy.append(row)
    
    # Connection 닫기
    conn.close()

    return Response(policy)


# 메인페이지 - (3) 청년정책 내 해시태그(서울) 별 기업정책 3개 제공 
@api_view(['GET'])
def SeoulPolicy(request):
    # 청년정책(서울) 리스트 생성
    policy = []

    # SQLite DB 연결
    # conn = sqlite3.connect("../../Data/Data_Processing/Data/IONEJOB.db")
    conn = sqlite3.connect("C:/Users/ameth/OneDrive/바탕 화면/ibkintern/ioneU/Data/Data_Processing/Data/IONEJOB.db")

    # Connection 으로부터 Cursor 생성
    cur = conn.cursor()

    # SQL 쿼리 실행
    cur.execute(f"""
    select polyBizSjnm, polyBizSecd, polyItcnCn
    from 청년정책_v3
    where polyBizSecd = '서울'
    limit 3
    ;
    """)

    # 데이타 Fetch
    rows = cur.fetchall()
    for row in rows:
        policy.append(row)
    
    # Connection 닫기
    conn.close()

    return Response(policy)



# 메인페이지 - (3) 청년정책 내 해시태그(서울, 대구, 부산, ...) 별 기업정책 3개 제공 
@api_view(['GET'])
def YouthPolicy(request, hashtag):
    # 청년정책(서울, 대구, 부산, ...) 리스트 생성
    policy = []

    # SQLite DB 연결
    # conn = sqlite3.connect("../../Data/Data_Processing/Data/IONEJOB.db")
    conn = sqlite3.connect("C:/Users/ameth/OneDrive/바탕 화면/ibkintern/ioneU/Data/Data_Processing/Data/IONEJOB.db")

    # Connection 으로부터 Cursor 생성
    cur = conn.cursor()

    # SQL 쿼리 실행
    cur.execute(f"""
    select polyBizSjnm, polyBizSecd, polyItcnCn
    from 청년정책_v3
    where polyBizSecd = '{hashtag}'
    limit 3
    ;
    """)

    # 데이타 Fetch
    rows = cur.fetchall()
    for row in rows:
        policy.append(row)
    
    # Connection 닫기
    conn.close()

    return Response(policy)

# 상세페이지 - (1) 복지 해시태그(성과보상, 열린문화, 건강한삶, 역량성장) 회사목록 내 특정 회사 선택시 회사명 제공
@api_view(['GET'])
def CompanyName(request, company_name):
    # 회사 리스트 생성
    company = []

    # SQLite DB 연결
    # conn = sqlite3.connect("../../Data/Data_Processing/Data/IONEJOB.db")
    conn = sqlite3.connect("C:/Users/ameth/OneDrive/바탕 화면/ibkintern/ioneU/Data/Data_Processing/Data/IONEJOB.db")

    # Connection 으로부터 Cursor 생성
    cur = conn.cursor()

    # SQL 쿼리 실행
    cur.execute(f"""
    select replace(replace(replace(기업명, " ", ""), "(주)", ""), "주식회사", "") as 기업명
    from Company
    where 기업명 like '%{company_name}%';
    """)

    # 데이타 Fetch
    company = cur.fetchall()
    
    # Connection 닫기
    conn.close()

    return Response(company[0][0])

# 상세페이지 - (2) 특정 기업(에스티엠테크놀로지) 시각화 자료 제공
@api_view(['GET'])
def CompanyInfo(request, company):

    # # 기업의 산업을 Company Table에서 산업1,2,3,4 로 받아와야함
    # industries = []

    # conn = sqlite3.connect("../../Data/Data_Processing/Data/IONEJOB.db")
    # # conn = sqlite3.connect("C:/Users/ameth/OneDrive/바탕 화면/ibkintern/ioneU/Data/Data_Processing/Data/IONEJOB.db")

    # cur = conn.cursor()

    # cur.execute(f"""
    # select 산업1, 산업2, 산업3, 산업4
    # from Company
    # where 기업명 like '%{company}%'
    # ;
    # """)

    # rows = cur.fetchall()
    # for i in range(len(rows[0])):
    #     if type(rows[0][i]) == type(None):
    #         pass
    #     else:
    #         industries.append(rows[0][i])

    # conn.close()

    # pytrends = TrendReq(hl='ko', tz=540)

    # pytrends.build_payload(kw_list = industries, cat=0, timeframe="today 5-y", geo="KR", gprop="")

    # # GoogleTrends(RelatedQueries) 워드클라우드
    # data_queries = pytrends.related_queries()
    # data_queries = data_queries[industries[0]]['top']

    # for i in range(len(data_queries)):
    #     data_queries['query'][i] = data_queries['query'][i].replace(" ", "")

    # freq = dict(zip(data_queries["query"], data_queries["value"]))
    # wordcloud = WordCloud(font_path = "../../Data/Data_Processing/Fonts/NotoSansKR-Regular.otf", background_color="white")

    # word = plt.figure(figsize=(15,10))
    # word = plt.imshow(wordcloud.generate_from_frequencies(freq))
    # word = plt.axis("off")
    # word = plt.savefig('../Data/wordcloud_%s.png' % industries[0])

    # wordcloud = open('../Data/wordcloud_%s.png' % industries[0])


    # # GoogleTrends(InterestOverTime) 산업 추이 그래프()
    # matplotlib.rcParams['font.family'] = 'Malgun Gothic'
    # matplotlib.rcParams['axes.unicode_minus'] = False

    # data = pytrends.interest_over_time()

    # image = data.plot(title = '관심도%s' % industries)
    # fig = image.get_figure()
    # fig.savefig('../Data/graph_%s.png' % industries)

    # graph = open('../Data/graph_%s.png' % industries)

    # # 네이버 뉴스 제공

    # def day(week):
    #     now = datetime.now()
    #     e_date = now - timedelta(weeks=week)
    #     #s_date = s_date.strftime("%Y.%m.%d")
    #     e_date = e_date.strftime("%Y.%m.%d")

    #     return e_date

    # def NaverNews(maxpage, query, sort, s_date, e_date, osc, nos):
    #     title_text=[]
    #     link_text=[]
    #     source_text=[]
    #     date_text=[]
    #     contents_text=[]
    #     result={}

    #     s_from = s_date.replace(".","")
    #     e_to = e_date.replace(".","")
    #     page = 1
    #     maxpage_t =(int(maxpage)-1)*10+1   # 11= 2페이지 21=3페이지 31=4페이지  ...81=9페이지 , 91=10페이지, 101=11페이지

    #     def date_cleansing(test):
    #         try:
    #             #지난 뉴스
    #             #머니투데이  10면1단  2018.11.05.  네이버뉴스   보내기
    #             pattern = '\d+.(\d+).(\d+).'  #정규표현식
            
    #             r = re.compile(pattern)
    #             match = r.search(test).group(0)  # 2018.11.05.
    #             date_text.append(match)
    #             #return match
                
    #         except AttributeError:
    #             #최근 뉴스
    #             #이데일리  1시간 전  네이버뉴스   보내기  
    #             pattern = '\w* (\d\w*)'     #정규표현식 
                
    #             r = re.compile(pattern)
    #             match = r.search(test).group(1)
    #             date_text.append(match)
    #             #return match

    #     def contents_cleansing(contents):
    #         first_cleansing_contents = re.sub('<dl>.*?</a> </div> </dd> <dd>', '', 
    #                                         str(contents)).strip()  #앞에 필요없는 부분 제거
    #         second_cleansing_contents = re.sub('<ul class="relation_lst">.*?</dd>', '', 
    #                                         first_cleansing_contents).strip()#뒤에 필요없는 부분 제거 (새끼 기사)
    #         third_cleansing_contents = re.sub('<.+?>', '', second_cleansing_contents).strip()
    #         contents_text.append(third_cleansing_contents)
    #         #return contents_text

    #     while page <= maxpage_t:
    #         url = "https://search.naver.com/search.naver?where=news&query=" + query +"&sm=tab_opt&sort="+ sort + "&photo=0&field=0&pd=3" +"&ds=" + s_date + "&de=" + e_date + "&docid=&related=0&mynews=0&office_type=" + '&office_section_code='+ osc + '&news_office_checked='+ nos + "&nso=so%3Ar%2Cp%3Afrom" + s_from + "to" + e_to + "&is_sug_officeid=0" + "%2Ca%3A&start=" + str(page)
    #         # office_section_code=11&news_office_checked=1143
            
    #         response = requests.get(url)
    #         html = response.text

    #         #뷰티풀소프의 인자값 지정
    #         soup = BeautifulSoup(html, 'html.parser')

    #         #<a>태그에서 제목과 링크주소 추출
    #         atags = soup.select('.news_tit')
    #         for atag in atags:
    #             title_text.append(atag.text)     #제목
    #             link_text.append(atag['href'])   #링크주소
                
    #         #신문사 추출
    #         source_lists = soup.select('.info_group > .press')
    #         for source_list in source_lists:
    #             source_text.append(source_list.text)    #신문사
            
    #         #날짜 추출 
    #         date_lists = soup.select('.info_group > span.info')
    #         for date_list in date_lists:
    #             # 1면 3단 같은 위치 제거
    #             if date_list.text.find("면") == -1:
    #                 date_text.append(date_list.text)
            
    #         #본문요약본
    #         contents_lists = soup.select('.news_dsc')
    #         for contents_list in contents_lists:
    #             contents_cleansing(contents_list) #본문요약 정제화
            

    #         #모든 리스트 딕셔너리형태로 저장
    #         result= {"date" : date_text , "title":title_text , "source" : source_text , "contents": contents_text ,"link":link_text }
    #         #print(page)
            
    #         df = pd.DataFrame(result)  #df로 변환
    #         page += 10

    #     return df

    # keyword = NaverNews(maxpage = '300', query = company, sort = '0', s_date = day(0), e_date= day(52), osc = '', nos = '')
    # keyword = keyword.drop_duplicates(['title'], keep=False, ignore_index=True)

    # now = datetime.now()

    # outputFileName = 'News_%s.csv' % (company)
    # RESULT_PATH = '../Data/'

    # keyword.to_csv(RESULT_PATH + outputFileName, encoding='utf-8-sig', index=False)
    # news = open(RESULT_PATH + outputFileName)

    wordcloud = open('../Data/wordcloud_제조업.png')
    graph = open('../Data/graph_제조업,전자,반도체.png')
    news = open('../Data/News_에스티엠테크놀로지.csv')


    return Response(wordcloud, graph, news)
